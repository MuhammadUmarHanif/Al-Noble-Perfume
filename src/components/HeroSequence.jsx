import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFrame, TOTAL_FRAMES } from '../utils/frameSequence';
import ThreeAtmosphere from './ThreeAtmosphere';
import { Compass, Sparkles, Volume2, VolumeX, ArrowDown, ChevronRight } from 'lucide-react';
import { luxuryAudio } from '../utils/audioAmbience';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence({ onAcquireClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const animationFrameIdRef = useRef(null);
  const lastRenderedIndexRef = useRef(-1);

  // Toggle ambient luxury sound
  const handleToggleAudio = () => {
    const active = luxuryAudio.toggle();
    setIsAudioActive(active);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Handle high DPI Retina displays gracefully
    let canvasW = 0;
    let canvasH = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvasW = rect.width;
      canvasH = rect.height;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-render current frame immediately after resize
      if (lastRenderedIndexRef.current >= 0) {
        renderFrame(lastRenderedIndexRef.current);
      } else {
        renderFrame(0);
      }
    };

    const renderFrame = (frameIndex) => {
      const img = getFrame(frameIndex);
      if (!img) return;

      lastRenderedIndexRef.current = frameIndex;

      // Deep luxury obsidian background matching the 3D render tone
      ctx.fillStyle = '#080706';
      ctx.fillRect(0, 0, canvasW, canvasH);

      const naturalW = img.naturalWidth || 1920;
      const naturalH = img.naturalHeight || 1080;

      // Responsive sizing:
      // On desktop, keep bottle at ~65-75% of viewport height.
      // On mobile/portrait, scale so the bottle remains centered without horn clipping.
      const isMobile = canvasW < 768;
      const isTablet = canvasW >= 768 && canvasW < 1024;

      let targetScale;
      if (isMobile) {
        // Fit bottle height nicely into mobile screen with top breathing room
        targetScale = (canvasH / naturalH) * 0.92;
      } else if (isTablet) {
        targetScale = (canvasH / naturalH) * 0.95;
      } else {
        targetScale = (canvasH / naturalH) * 0.96;
      }

      const drawW = naturalW * targetScale;
      const drawH = naturalH * targetScale;

      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    // Initial resize and render frame 0
    resizeCanvas();
    renderFrame(0);

    window.addEventListener('resize', resizeCanvas);

    // Virtual frame tracker for GSAP ScrollTrigger
    const frameObj = { frame: 0 };

    const ctxGsap = gsap.context(() => {
      // Main ScrollTrigger pinned animation
      gsap.to(frameObj, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35, // Smooth scrubbing in both directions
          onUpdate: (self) => {
            const progress = self.progress;
            const targetFrame = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.round(frameObj.frame))
            );

            // Throttle rendering to requestAnimationFrame for 60fps
            if (animationFrameIdRef.current) {
              cancelAnimationFrame(animationFrameIdRef.current);
            }

            animationFrameIdRef.current = requestAnimationFrame(() => {
              renderFrame(targetFrame);
              setCurrentFrameNum(targetFrame + 1);
              setScrollProgress(progress);
            });
          },
        },
      });
    }, container);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      ctxGsap.revert();
    };
  }, []);

  // Compute story narrative active phase based on scroll progress (0.0 to 1.0)
  // Phase 1: 0% - 18% (Intro)
  // Phase 2: 20% - 38% (Golden Stag Crown)
  // Phase 3: 40% - 58% (Meander Seal)
  // Phase 4: 60% - 82% (Deconstruction / Olfactory Notes)
  // Phase 5: 84% - 100% (The Reassembly & Final Reveal)
  const getActiveScene = () => {
    if (scrollProgress < 0.19) return 1;
    if (scrollProgress < 0.39) return 2;
    if (scrollProgress < 0.59) return 3;
    if (scrollProgress < 0.83) return 4;
    return 5;
  };

  const activeScene = getActiveScene();

  const scrollToNextSection = () => {
    const el = document.getElementById('fragrance-notes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#080706]"
      style={{ height: '520vh' }}
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Subtle Atmospheric Vignette and Radial Backlight */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 52%, rgba(200, 155, 60, 0.08) 0%, rgba(8, 7, 6, 0.4) 60%, #080706 100%)',
          }}
        />

        {/* Three.js Celestial Gold Dust Particles */}
        <ThreeAtmosphere scrollProgress={scrollProgress} />

        {/* HTML5 High-Performance Canvas for 720-frame sequence */}
        <canvas
          ref={canvasRef}
          className="relative z-1 w-full h-full object-contain cursor-default"
          style={{ width: '100%', height: '100%' }}
        />

        {/* ========================================================
            CINEMATIC EDITORIAL TEXT OVERLAYS (Scroll-Triggered)
           ======================================================== */}

        {/* SCENE 1: THE ROYAL PROLOGUE (0% - 19%) */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-14 lg:p-20 transition-all duration-1000 ${
            activeScene === 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          {/* Top Brand Tagline */}
          <div className="flex flex-col items-center text-center mt-12 md:mt-8">
            <span className="text-[10px] md:text-xs tracking-[0.45em] text-[#d4af37] uppercase font-sans font-medium mb-3">
              HAUTE PARFUMERIE • ÉDITION ROYALE
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
          </div>

          {/* Large Hero Title */}
          <div className="flex flex-col items-center text-center my-auto pointer-events-auto">
            <h2 className="text-xs md:text-sm tracking-[0.6em] text-[#e8d5b5]/80 uppercase font-sans font-light mb-2">
              LA MAISON NOIRÉ
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7ecd5] to-[#c5a059] tracking-tight font-medium uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
              AL NOBLE
            </h1>
            <div className="flex items-center gap-4 my-2">
              <span className="h-[1px] w-8 md:w-16 bg-[#d4af37]/40" />
              <span className="font-serif italic text-2xl md:text-4xl text-[#d4af37] tracking-wider">
                Ameer
              </span>
              <span className="h-[1px] w-8 md:w-16 bg-[#d4af37]/40" />
            </div>
            <p className="text-xs md:text-sm text-[#b8a892] tracking-[0.3em] font-sans uppercase max-w-md mt-2">
              EAU DE PARFUM • 100ML
            </p>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.3em] text-[#d4af37]/80 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span>Scroll down to control the flacon</span>
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#d4af37]/60 to-transparent mt-3 animate-bounce" />
          </div>
        </div>

        {/* SCENE 2: THE GOLDEN STAG CROWN (20% - 39%) */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 flex items-center justify-between p-6 md:p-14 lg:p-24 transition-all duration-1000 ${
            activeScene === 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Left Narrative Card */}
          <div className="max-w-md pointer-events-auto bg-[#0d0b09]/80 backdrop-blur-md border border-[#d4af37]/25 p-6 md:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-sans">
                ACT I / 04
              </span>
              <span className="h-[1px] w-6 bg-[#d4af37]/40" />
              <span className="text-[10px] tracking-[0.3em] text-[#8e8271] uppercase font-sans">
                THE ICON
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f5ebd7] font-normal leading-tight mb-4">
              The Sovereign <br />
              <span className="italic text-[#d4af37]">Golden Stag</span>
            </h2>
            <p className="text-xs md:text-sm text-[#b5a794] leading-relaxed font-sans font-light mb-6">
              Forged in sculpted golden alloy, the royal antlered stag is an
              ancient emblem of regal poise and untamed sovereignty. Each contour
              is hand-buffed to capture atmospheric light with liquid brilliance.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#d4af37]/20 pt-4">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#8e8271]">
                  CROWN MATERIAL
                </span>
                <span className="font-serif text-sm text-[#e8d5b5]">
                  24K Gold Tone Alloy
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#8e8271]">
                  SCULPTURAL WEIGHT
                </span>
                <span className="font-serif text-sm text-[#e8d5b5]">
                  210 Grams Solid Cap
                </span>
              </div>
            </div>
          </div>

          {/* Right Floating Badge */}
          <div className="hidden lg:flex flex-col items-end gap-3 text-right">
            <div className="bg-[#0d0b09]/60 backdrop-blur-sm border-r-2 border-[#d4af37] pr-4 py-2">
              <span className="block text-[10px] tracking-[0.3em] text-[#d4af37] uppercase">
                ATMOSPHERE
              </span>
              <span className="font-serif text-lg text-[#f5ebd7]">
                Incense & Smoked Woods
              </span>
            </div>
          </div>
        </div>

        {/* SCENE 3: THE IMPERIAL MEDALLION (40% - 59%) */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 flex items-center justify-end p-6 md:p-14 lg:p-24 transition-all duration-1000 ${
            activeScene === 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Right Narrative Card */}
          <div className="max-w-md pointer-events-auto bg-[#0d0b09]/85 backdrop-blur-md border border-[#d4af37]/25 p-6 md:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-sans">
                ACT II / 04
              </span>
              <span className="h-[1px] w-6 bg-[#d4af37]/40" />
              <span className="text-[10px] tracking-[0.3em] text-[#8e8271] uppercase font-sans">
                INSIGNIA
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f5ebd7] font-normal leading-tight mb-4">
              Sacred Meander <br />
              <span className="italic text-[#d4af37]">Greek Border Seal</span>
            </h2>
            <p className="text-xs md:text-sm text-[#b5a794] leading-relaxed font-sans font-light mb-6">
              The flacon’s heart bears an imperial medallion surrounded by classical
              geometric meander borders, enshrining the noble stag monogram and
              gilded Arabic calligraphy celebrating Arabesque opulence.
            </p>
            <div className="border-t border-[#d4af37]/20 pt-4 flex items-center justify-between">
              <span className="text-xs tracking-[0.2em] text-[#d4af37] uppercase font-sans">
                النبيل • AL NOBLE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#8e8271] uppercase font-sans">
                EST. DUBAI
              </span>
            </div>
          </div>
        </div>

        {/* SCENE 4: ZERO-GRAVITY DECONSTRUCTION (60% - 83%) */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-14 lg:p-20 transition-all duration-1000 ${
            activeScene === 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Top Headline */}
          <div className="flex flex-col items-center text-center mt-6">
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase font-sans mb-1">
              ACT III • OLFACTORY ARCHITECTURE
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-[#f5ebd7] font-normal">
              Anatomy of the Liquid Jewel
            </h2>
          </div>

          {/* Interactive Floating Notes Array */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full my-auto pointer-events-auto">
            {/* Top Accord */}
            <div className="bg-[#0d0b09]/80 backdrop-blur-md border border-[#d4af37]/20 p-5 hover:border-[#d4af37]/60 transition-colors">
              <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase font-sans block mb-1">
                TOP ACCORD
              </span>
              <h3 className="font-serif text-lg text-[#f7ecd5] mb-2">
                Crisp Apple & Pepper
              </h3>
              <p className="text-[11px] text-[#a89a87] font-sans leading-relaxed">
                Crisp Orchard Apple, Pink Peppercorns, and Sun-drenched Moroccan Rosemary.
              </p>
            </div>

            {/* Heart Accord */}
            <div className="bg-[#0d0b09]/80 backdrop-blur-md border border-[#d4af37]/35 p-5 hover:border-[#d4af37] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#d4af37]/10 -rotate-45 transform translate-x-4 -translate-y-4" />
              <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase font-sans block mb-1">
                HEART ACCORD
              </span>
              <h3 className="font-serif text-lg text-[#f7ecd5] mb-2">
                Clove & Orris Nectar
              </h3>
              <p className="text-[11px] text-[#a89a87] font-sans leading-relaxed">
                Spiced Clove Buds, Powdery Tuscan Orris Root, and Velvet Night Lily.
              </p>
            </div>

            {/* Base Accord */}
            <div className="bg-[#0d0b09]/80 backdrop-blur-md border border-[#d4af37]/20 p-5 hover:border-[#d4af37]/60 transition-colors">
              <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase font-sans block mb-1">
                BASE ACCORD
              </span>
              <h3 className="font-serif text-lg text-[#f7ecd5] mb-2">
                Imperial Oud & Amber
              </h3>
              <p className="text-[11px] text-[#a89a87] font-sans leading-relaxed">
                Dark Cambodian Oud, Haitian Vetiver, Rich Ambergris, and Earthy Patchouli.
              </p>
            </div>
          </div>

          <div className="text-center text-[10px] tracking-[0.3em] text-[#8e8271] uppercase font-sans mb-4">
            30% EXTRAIT DE PARFUM CONCENTRATION • 16-HOUR RESIDUAL PROJECTION
          </div>
        </div>

        {/* SCENE 5: THE REVELATION & ACQUISITION (84% - 100%) */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-14 lg:p-20 transition-all duration-1000 ${
            activeScene === 5
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="text-center mt-6">
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase font-sans mb-1 block">
              FINAL ACT • THE MONOLITH
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f5ebd7] font-normal uppercase">
              Crafted To Linger
            </h2>
          </div>

          {/* Bottom Action Center */}
          <div className="flex flex-col items-center text-center my-auto pointer-events-auto max-w-lg mx-auto">
            <p className="text-xs md:text-sm text-[#b8a892] font-sans font-light leading-relaxed mb-6">
              A fragrance of indisputable presence. Al Noble Ameer settles into a warm,
              magnetic trail that envelopes the senses in golden smoke and royal nobility.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button
                type="button"
                onClick={onAcquireClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#f3dfa2] to-[#b88c28] text-[#080706] font-sans text-xs tracking-[0.3em] uppercase font-semibold hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Acquire The Flacon • $185
              </button>
              <button
                type="button"
                onClick={scrollToNextSection}
                className="w-full sm:w-auto px-8 py-4 border border-[#d4af37]/40 text-[#f5ebd7] font-sans text-xs tracking-[0.3em] uppercase hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Scent Notes</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-[#8e8271] uppercase font-sans mb-4 border-t border-[#d4af37]/15 pt-4">
            <span>COMPLIMENTARY VELVET COFFRET</span>
            <span>SHIPS GLOBALLY</span>
          </div>
        </div>

        {/* ========================================================
            BOTTOM STATUS BAR: FRAME COUNTER & AUDIO CONTROLLER
           ======================================================== */}
        <div className="absolute bottom-6 left-6 right-6 md:left-14 md:right-14 z-30 pointer-events-none flex items-center justify-between">
          {/* Audio Ambience Synthesizer Toggle */}
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label="Toggle luxury ambient audio"
            className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 bg-[#0d0b09]/70 backdrop-blur-md border border-[#d4af37]/25 text-[#d4af37] hover:border-[#d4af37] transition-all text-[10px] tracking-[0.2em] uppercase font-sans"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Ambience On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline opacity-70">Sound Experience</span>
              </>
            )}
          </button>

          {/* Frame & Progress Counter */}
          <div className="pointer-events-auto flex items-center gap-4 bg-[#0d0b09]/70 backdrop-blur-md border border-[#d4af37]/25 px-4 py-1.5">
            <div className="text-[10px] tracking-[0.25em] text-[#8e8271] uppercase font-sans">
              <span className="text-[#d4af37] font-medium font-mono">
                {String(currentFrameNum).padStart(4, '0')}
              </span>
              <span className="mx-1 text-[#4a4237]">/</span>
              <span className="font-mono">0720</span>
            </div>
            {/* Visual mini progress bar */}
            <div className="w-16 md:w-24 h-[2px] bg-[#221c16] relative overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#b88c28] to-[#f3dfa2] transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
