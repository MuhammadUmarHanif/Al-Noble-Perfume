/**
 * CanvasEngine — Fixed fullscreen canvas rendering 720 sequential frames
 * High-performance 60-120fps engine with ZERO React re-renders on scroll.
 * Features:
 * - Device-pixel crisp 2D canvas rendering with cover-fit math
 * - Non-blocking frame lookahead & nearest-cached frame fallback
 * - Silky smooth lerp scrubbing within sections
 * - Instant section snaps to prevent cross-section lerp glitches:
 *   - Section 1 (Hero & Act I): Frames 0 – 239
 *   - Section 2 (Imperial Seal & Olfactory): Frames 480 – 719
 *   - Section 3 (Atelier Monolith & Trilogy): Frames 240 – 479
 */

import { useEffect, useRef } from 'react';
import {
  getFrame,
  subscribeToFrames,
  mapProgressToFrameIndex,
  getFrameSection,
  requestLookahead,
  TOTAL_FRAMES,
} from '../utils/frameSequence';
import ThreeAtmosphere from './ThreeAtmosphere';

export default function CanvasEngine() {
  const canvasRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      width = Math.round(w * dpr);
      height = Math.round(h * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      draw(Math.round(currentFrameRef.current), true);
    };

    const draw = (frameIndex, force = false) => {
      if (!force && lastDrawnFrameRef.current === frameIndex) return;

      const img = getFrame(frameIndex);
      if (!img || !img.complete || !img.naturalWidth) {
        return;
      }

      lastDrawnFrameRef.current = frameIndex;

      // Clear background with deep obsidian
      ctx.fillStyle = '#080706';
      ctx.fillRect(0, 0, width, height);

      // Full cover-fit: image fills the entire viewport
      const nw = img.naturalWidth || 1280;
      const nh = img.naturalHeight || 720;
      
      const scale = Math.max(width / nw, height / nh);
      const dw = nw * scale;
      const dh = nh * scale;
      const dx = (width - dw) / 2;
      const dy = (height - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Calculate current scroll progress and target frame index
    const computeTargetFrame = () => {
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalScrollable));
      return mapProgressToFrameIndex(progress);
    };

    // Initial sync
    resize();
    const initialTarget = computeTargetFrame();
    targetFrameRef.current = initialTarget;
    currentFrameRef.current = initialTarget;
    draw(initialTarget, true);
    requestLookahead(initialTarget);

    window.addEventListener('resize', resize, { passive: true });

    // Scroll listener: updates target frame & triggers lookahead with zero latency
    const onScroll = () => {
      const nextTarget = computeTargetFrame();
      const currentTarget = targetFrameRef.current;
      targetFrameRef.current = nextTarget;
      
      // If user jumped across sections (e.g. fast scroll or anchor click), snap immediately
      if (getFrameSection(nextTarget) !== getFrameSection(currentTarget)) {
        currentFrameRef.current = nextTarget;
        draw(nextTarget, true);
      }
      
      requestLookahead(nextTarget);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Smooth Lerp Animation Loop (runs at native screen refresh rate: 60/120Hz)
    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // CRITICAL: Prevent cross-section lerp stutter (e.g. jumping between frame 239 -> 480)
      if (getFrameSection(Math.round(target)) !== getFrameSection(Math.round(current))) {
        currentFrameRef.current = target;
        draw(target);
      } else if (Math.abs(diff) > 25) {
        // High-velocity scroll catch-up
        currentFrameRef.current = target;
        draw(target);
      } else if (Math.abs(diff) > 0.1) {
        // Butter-smooth fluid damping
        currentFrameRef.current += diff * 0.45;
        draw(Math.round(currentFrameRef.current));
      } else if (lastDrawnFrameRef.current !== target) {
        currentFrameRef.current = target;
        draw(target);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // Repaint whenever a priority frame completes
    const unsubscribe = subscribeToFrames(() => {
      draw(Math.round(currentFrameRef.current), true);
    });

    return () => {
      isRunning = false;
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      unsubscribe();
    };
  }, []);

  return (
    <>
      {/* Fixed Fullscreen Canvas — zIndex 1 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Atmospheric Gold Particles Layer — zIndex 2 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <ThreeAtmosphere />
      </div>
    </>
  );
}
