import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const clickable = target.closest('button, a, [role="button"], input, select, [data-cursor]');
      if (clickable) {
        setIsHovered(true);
        if (clickable.getAttribute('data-cursor')) {
          setHoverText(clickable.getAttribute('data-cursor'));
        } else if (clickable.tagName.toLowerCase() === 'button' || clickable.tagName.toLowerCase() === 'a') {
          setHoverText('DISCOVER');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth Lerp loop for silky spring physics
    const loop = () => {
      // Dot follows briskly
      dotPos.current.x += (targetPos.current.x - dotPos.current.x) * 0.45;
      dotPos.current.y += (targetPos.current.y - dotPos.current.y) * 0.45;

      // Ring glides with luxurious fluid ease
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Center Pin */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-90'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
      </div>

      {/* Silky Trailing Haute Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99] flex items-center justify-center transition-[width,height,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-500 ${
            isHovered
              ? 'w-20 h-20 bg-[#d4af37]/10 backdrop-blur-[2px] border border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)]'
              : 'w-7 h-7 border border-[#d4af37]/35 bg-transparent'
          }`}
        >
          {isHovered && hoverText && (
            <span className="text-[7.5px] font-sans tracking-[0.25em] font-semibold text-[#f7ecd5] uppercase select-none drop-shadow">
              {hoverText}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
