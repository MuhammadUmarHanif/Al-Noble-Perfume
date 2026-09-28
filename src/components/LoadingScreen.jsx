import { useState } from 'react';

/**
 * Starting Screen (matches exact specification in ss3):
 * - 4 Luxury corner brackets ┌ ┐ └ ┘
 * - Centered LATTAFA typography with gold accent line
 * - AL NOBLE · LIMITED EDITION
 * - Majestic Arabic Calligraphy: النبل
 * - Luxury ENTER ◉ button
 */
export default function LoadingScreen({ progress, isReady, onEnter, hasEntered }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleEnterClick = () => {
    setIsClicked(true);
    if (onEnter) {
      onEnter();
    }
  };

  const isFadedOut = hasEntered || isClicked;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#080706] flex items-center justify-center p-6 md:p-12 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadedOut
          ? 'opacity-0 pointer-events-none scale-105'
          : 'opacity-100 pointer-events-auto scale-100'
      }`}
    >
      {/* 4 Luxury Corner Brackets matching ss3 */}
      {/* Top-Left ┌ */}
      <div 
        className="absolute top-8 left-8 sm:top-12 sm:left-12 w-6 sm:w-8 h-6 sm:h-8 border-t border-l border-[#d4af37]/35 pointer-events-none" 
        aria-hidden="true" 
      />
      {/* Top-Right ┐ */}
      <div 
        className="absolute top-8 right-8 sm:top-12 sm:right-12 w-6 sm:w-8 h-6 sm:h-8 border-t border-r border-[#d4af37]/35 pointer-events-none" 
        aria-hidden="true" 
      />
      {/* Bottom-Left └ */}
      <div 
        className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 w-6 sm:w-8 h-6 sm:h-8 border-b border-l border-[#d4af37]/35 pointer-events-none" 
        aria-hidden="true" 
      />
      {/* Bottom-Right ┘ */}
      <div 
        className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 w-6 sm:w-8 h-6 sm:h-8 border-b border-r border-[#d4af37]/35 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Subtle Radial Ambient Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" 
        aria-hidden="true" 
      />

      {/* Centerpiece Minimalist Stack (ss3) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto select-none">
        
        {/* Brand: LATTAFA */}
        <div className="flex flex-col items-center mb-1">
          <span className="font-serif text-sm sm:text-base md:text-lg tracking-[0.55em] text-[#f7ecd5] font-semibold uppercase">
            LATTAFA
          </span>
          <div className="w-14 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mt-2.5 mb-3" />
        </div>

        {/* Edition Subtitle */}
        <div className="text-[9.5px] sm:text-[11px] tracking-[0.38em] text-[#bdae9c] uppercase font-sans font-medium mb-6">
          AL NOBLE &nbsp;•&nbsp; LIMITED EDITION
        </div>

        {/* Majestic Arabic Calligraphy: النبل */}
        <div className="my-4 sm:my-6 transition-all duration-700">
          <span 
            className="font-arabic text-6xl sm:text-7xl md:text-8xl text-[#65533f] hover:text-[#846f56] transition-colors leading-none tracking-widest inline-block select-none"
            dir="rtl"
          >
            الـنـبـل
          </span>
        </div>

        {/* Interactive ENTER CTA Button matching ss3 */}
        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative flex items-center gap-3 px-8 py-3 rounded-full border border-[#d4af37]/30 hover:border-[#d4af37] bg-[#0c0a08]/80 hover:bg-[#1a150e]/90 text-[#d4af37] transition-all duration-500 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            aria-label="Enter Al Noble Experience"
          >
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.42em] font-medium text-[#f7ecd5] group-hover:text-white transition-colors pl-1">
              ENTER
            </span>
            {/* Glowing Golden Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
            </span>
          </button>

          {/* Discreet progress indicator while loading frames in background */}
          {!isReady && (
            <div className="mt-4 flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#8e816e] uppercase font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span>PREPARING FLACON EXPOSURES {progress}%</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
