import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleScrollTo = (percent) => {
    const totalScrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: totalScrollable * percent, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060504] border-t border-[#d4af37]/12 pt-20 pb-12 px-6 sm:px-12 lg:px-20 z-20">
      {/* Top Gold Ray */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Main Grid: Brand + Newsletter | Navigation | Salons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#d4af37]/10">

          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <span className="label-eyebrow text-[10px] block mb-3">MAISON DE HAUTE PARFUMERIE</span>
            <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wider uppercase mb-3">
              AL NOBLE
            </h3>
            <p className="text-[13px] text-[#a89a87] font-sans font-light leading-relaxed max-w-sm mb-8">
              A convergence of oriental heritage and rare Cambodian agarwood.
              Crafted in limited annual harvests.
            </p>

            {/* Newsletter */}
            <div className="glass-panel p-5 max-w-md">
              <span className="label-eyebrow text-[10px] block mb-1">PRIVATE DISPATCH</span>
              <p className="text-[11px] text-[#8e816e] font-sans font-light mb-4">
                Notifications for limited drops and private extractions.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-[12px] text-[#d4af37] font-sans">
                  <Check className="w-4 h-4" />
                  <span>You're on the list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#14110d] border border-[#d4af37]/20 px-4 py-2.5 text-[12px] text-[#f7ecd5] placeholder-[#6d6253] focus:outline-none focus:border-[#d4af37] flex-1 font-sans transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 btn-gold-couture text-[10px]"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-7">
            <span className="label-eyebrow text-[10px] block mb-5">THE HOUSE</span>
            <ul className="space-y-3 text-[13px] font-sans text-[#a89a87]">
              {[
                { label: 'The Cinematic Flacon', pct: 0 },
                { label: 'Olfactory Pyramid', pct: 0.50 },
                { label: 'Craftsmanship Atelier', pct: 0.68 },
                { label: 'The Trilogy Dynasty', pct: 0.84 },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleScrollTo(item.pct)}
                    className="hover:text-[#d4af37] transition-colors focus:outline-none"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Flagship */}
          <div className="lg:col-span-3">
            <span className="label-eyebrow text-[10px] block mb-5">FLAGSHIP</span>
            <div className="space-y-4">
              <div className="border-l border-[#d4af37]/25 pl-4">
                <strong className="text-[13px] text-white font-serif block">Dubai</strong>
                <span className="text-[11px] text-[#8e816e] font-sans">Fashion Avenue, The Dubai Mall</span>
              </div>
              <div className="border-l border-[#d4af37]/25 pl-4">
                <strong className="text-[13px] text-white font-serif block">Paris</strong>
                <span className="text-[11px] text-[#8e816e] font-sans">18 Place Vendôme</span>
              </div>
              <div className="border-l border-[#d4af37]/25 pl-4">
                <strong className="text-[13px] text-white font-serif block">London</strong>
                <span className="text-[11px] text-[#8e816e] font-sans">42 Mount Street, Mayfair</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.2em] text-[#6d6253] uppercase font-sans gap-3">
          <span>© {new Date().getFullYear()} AL NOBLE HAUTE PARFUMERIE</span>
          <div className="flex gap-5">
            <span className="hover:text-[#d4af37] transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-[#d4af37] transition-colors cursor-pointer">Authenticity</span>
            <span className="hover:text-[#d4af37] transition-colors cursor-pointer">Concierge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
