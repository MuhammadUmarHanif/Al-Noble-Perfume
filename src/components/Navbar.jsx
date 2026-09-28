import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Volume2, VolumeX } from 'lucide-react';
import { luxuryAudio } from '../utils/audioAmbience';

export default function Navbar({ onOpenBag, cartCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = luxuryAudio.toggle();
    setIsAudioActive(active);
  };

  const navItems = [
    { label: 'The Flacon', targetPercent: 0 },
    { label: 'Olfactory Notes', targetPercent: 0.50 },
    { label: 'Craftsmanship', targetPercent: 0.68 },
    { label: 'The Trilogy', targetPercent: 0.84 },
  ];

  const handleNavigate = (targetPercent) => {
    setMobileMenuOpen(false);
    const totalScrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalScrollable * targetPercent,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080706]/90 backdrop-blur-xl border-b border-[#d4af37]/15 py-3'
            : 'bg-gradient-to-b from-[#060504]/90 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavigate(0)}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Return to top"
          >
            {/* Monogram */}
            <div className="relative w-7 h-7 border border-[#d4af37]/35 flex items-center justify-center bg-[#0a0908] transition-all duration-400 group-hover:border-[#d4af37] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.2)]">
              <span className="font-serif italic font-bold text-[11px] text-[#d4af37]">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[11px] sm:text-xs tracking-[0.28em] text-[#f7ecd5] uppercase group-hover:text-[#d4af37] transition-colors">
                AL NOBLE
              </span>
              <span className="text-[8px] tracking-[0.35em] text-[#8e816e] uppercase font-sans hidden sm:block">
                PARFUMS ROYAUX
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.targetPercent)}
                className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#a89a87] hover:text-[#f7ecd5] transition-colors relative py-1 group focus:outline-none"
              >
                <span className="group-hover:text-[#d4af37] transition-colors">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Audio */}
            <button
              type="button"
              onClick={handleAudioToggle}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#d4af37]/20 hover:border-[#d4af37]/50 bg-transparent transition-all text-[#8e816e] hover:text-[#f7ecd5] focus:outline-none"
              aria-label="Toggle ambient audio"
            >
              {isAudioActive ? (
                <Volume2 className="w-3 h-3 text-[#d4af37]" />
              ) : (
                <VolumeX className="w-3 h-3 opacity-50" />
              )}
              <span className="text-[9px] tracking-[0.15em] uppercase font-sans">
                {isAudioActive ? 'On' : 'Off'}
              </span>
            </button>

            {/* Bag */}
            <button
              type="button"
              onClick={onOpenBag}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/25 hover:border-[#d4af37] bg-[#0a0908] hover:bg-[#14110d] transition-all group focus:outline-none"
              aria-label="View bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans text-[#c4b5a0] hidden sm:inline">
                Bag
              </span>
              <span className="w-4 h-4 rounded-full bg-[#d4af37] text-[#080706] text-[9px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#c4b5a0] hover:text-[#d4af37] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#080706]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="border-b border-[#d4af37]/15 pb-3 mb-2">
            <span className="label-eyebrow text-[10px]">NAVIGATION</span>
          </div>

          {navItems.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigate(item.targetPercent)}
              className="flex items-center justify-between text-left text-xl font-serif text-[#f7ecd5] hover:text-[#d4af37] transition-colors py-1.5 group focus:outline-none"
            >
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                {item.label}
              </span>
              <span className="text-[11px] font-mono text-[#6d6253]">0{idx + 1}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[#d4af37]/15 pt-5 space-y-3">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBag();
            }}
            className="w-full py-3.5 btn-gold-couture text-[11px]"
          >
            Acquire Ameer · $185
          </button>
          <div className="flex justify-between text-[10px] text-[#6d6253] font-sans tracking-wider uppercase">
            <span>Dubai · Paris · London</span>
            <button
              type="button"
              onClick={handleAudioToggle}
              className="text-[#d4af37] focus:outline-none"
            >
              Audio: {isAudioActive ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
