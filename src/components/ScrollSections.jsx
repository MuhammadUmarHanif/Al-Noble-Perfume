/**
 * ScrollSections — Redesigned Cinematic Editorial Overlay
 *
 * Design Principles:
 * - Restraint over abundance — each scene says ONE thing powerfully
 * - Cinematic pacing — every scene feels like a new editorial spread
 * - 3 font roles: Display (Italiana), Serif (Cormorant), Sans (Plus Jakarta)
 * - Dark space IS the luxury — let the bottle breathe
 */

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const TOTAL_SCROLL_VH = 800;

export default function ScrollSections({ onAcquireClick }) {
  const [activeScene, setActiveScene] = useState(1);
  const [selectedTrilogyId, setSelectedTrilogyId] = useState('ameer');

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const totalScrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollable <= 0) return;
        const p = Math.min(1, Math.max(0, window.scrollY / totalScrollable));
        const nextScene =
          p < 0.13 ? 1 :
          p < 0.28 ? 2 :
          p < 0.43 ? 3 :
          p < 0.61 ? 4 :
          p < 0.77 ? 5 :
          p < 0.94 ? 6 : 0;

        setActiveScene((prev) => (prev !== nextScene ? nextScene : prev));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ─── Content Data ────────────────────────────────────────────────────────────

  const notesTiers = [
    {
      stage: 'TOP',
      timeframe: '0 – 30 min',
      title: 'The Imperial Greeting',
      desc: 'Crisp green orchard apple sparked with crushed pink peppercorn and Atlas mountain rosemary.',
      notes: ['Crisp Green Apple', 'Pink Peppercorn', 'Atlas Rosemary'],
    },
    {
      stage: 'HEART',
      timeframe: '2 – 6 hrs',
      title: 'The Noble Soul',
      desc: 'Sun-cured clove buds melt into powdery Tuscan orris and midnight-blooming white florals.',
      notes: ['Zanzibar Clove', 'Tuscan Orris', 'White Lily'],
    },
    {
      stage: 'BASE',
      timeframe: '8 – 24+ hrs',
      title: 'The Eternal Sillage',
      desc: 'Distilled Cambodian agarwood oud harmonizes with ambergris, smoked vetiver, and cypress resins.',
      notes: ['Cambodian Oud', 'Ambergris', 'Smoked Vetiver', 'Cypress'],
    },
  ];

  const specs = [
    { num: '01', label: 'Stag Cap', value: '210g Zamak Alloy', detail: '24K gold-tone, hand-polished' },
    { num: '02', label: 'Imperial Seal', value: '1.2mm Raised Foil', detail: 'Greek key meander & Arabic calligraphy' },
    { num: '03', label: 'Monolith Body', value: 'UV-Shield Glass', detail: 'Matte obsidian, photoprotective' },
    { num: '04', label: 'Micro-Diffuser', value: '0.12ml / Actuation', detail: 'French cloud dispersion pump' },
  ];

  const trilogy = [
    {
      id: 'ameer',
      name: 'Ameer',
      fullName: 'Al Noble Ameer',
      badge: 'HERO EXTRAIT',
      subtitle: 'The Sovereign Black Stag',
      personality: 'Dark, commanding — smoked agarwood & clove warmth.',
      accords: 'Oud · Clove · Ambergris',
      borderColor: '#d4af37',
    },
    {
      id: 'wazeer',
      name: 'Wazeer',
      fullName: 'Al Noble Wazeer',
      badge: 'LUMINOUS',
      subtitle: 'The Gilded White Stag',
      personality: 'Crisp, aristocratic — chilled mint & Florentine iris.',
      accords: 'Mint · Iris · Cashmeran',
      borderColor: '#c0d0e0',
    },
    {
      id: 'safeer',
      name: 'Safeer',
      fullName: 'Al Noble Safeer',
      badge: 'BOTANICAL',
      subtitle: 'The Emerald Forest Stag',
      personality: 'Wild, earthen — French artemisia & Damascus rose.',
      accords: 'Artemisia · Rose · Moss',
      borderColor: '#4fa368',
    },
  ];

  const currentItem = trilogy.find((t) => t.id === selectedTrilogyId);

  const scene = activeScene;

  // Cinematic scene transition with vertical drift
  const getSceneStyle = (isActive) => ({
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
    pointerEvents: isActive ? 'auto' : 'none',
    transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  return (
    <>
      {/* Fixed Editorial Overlay */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        aria-live="polite"
        style={{
          transition: 'opacity 0.5s ease',
          opacity: scene === 0 ? 0 : 1,
        }}
      >

        {/* ════════════════════════════════════════════════════════════════
            SCENE 1 — HERO
            Minimal. Brand mark top, Arabic watermark center, scroll cue bottom.
            The bottle IS the hero — text stays out of its way.
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex flex-col justify-between items-center pt-20 pb-10 pointer-events-none select-none"
          style={getSceneStyle(scene === 1)}
        >
          {/* Top: Restrained brand eyebrow */}
          <div className="w-full max-w-lg mx-auto flex items-center justify-center gap-4 pointer-events-auto px-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <span className="label-eyebrow text-[10px] whitespace-nowrap">
              LATTAFA &nbsp;·&nbsp; LIMITED EDITION
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>

          {/* Center: Giant Arabic watermark behind bottle */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            style={{
              maskImage: 'radial-gradient(ellipse 280px 500px at 50% 48%, transparent 35%, black 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse 280px 500px at 50% 48%, transparent 35%, black 78%)',
            }}
          >
            <span
              className="font-arabic text-[140px] sm:text-[220px] md:text-[320px] lg:text-[400px] leading-none text-[#3d3529] opacity-90 select-none"
              dir="rtl"
            >
              الـنـبـل
            </span>
          </div>

          {/* Bottom: Scroll indicator */}
          <div className="flex items-center gap-2 pointer-events-auto cursor-pointer group">
            <span className="text-[10px] tracking-[0.4em] text-[#8e816e] uppercase font-sans group-hover:text-[#d4af37] transition-colors">
              SCROLL
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#d4af37] animate-bounce" />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SCENE 2 — THE GOLDEN STAG
            Minimal left panel. Large serif headline. No card — just text.
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center p-8 sm:p-14 md:p-20 lg:p-28"
          style={getSceneStyle(scene === 2)}
        >
          <div className="max-w-lg pointer-events-auto">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-arabic text-2xl text-[#d4af37] leading-none" dir="rtl">النبل</span>
              <div className="w-8 h-px bg-[#d4af37]/30" />
              <span className="label-eyebrow text-[10px]">ACT I</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-4">
              The Sovereign<br />
              <span className="text-[#d4af37]">Golden Stag</span>
            </h2>

            {/* Body */}
            <p className="text-sm sm:text-base text-[#a89a87] font-sans font-light leading-relaxed max-w-md mb-8">
              Hand-buffed to a mirror finish, the sculpted antlered stag is cast from 210 grams of solid luxury alloy. Each tine catches ambient light, transforming it into liquid gold.
            </p>

            {/* Inline Specs — not cards, just clean lines */}
            <div className="space-y-3 border-t border-[#d4af37]/15 pt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-[#8e816e] font-sans tracking-wider uppercase">Composition</span>
                <span className="text-sm text-[#f7ecd5] font-serif">24K Gold-Tone Zamak Alloy</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-[#8e816e] font-sans tracking-wider uppercase">Cap Weight</span>
                <span className="text-sm text-[#f7ecd5] font-serif">210 Grams Solid</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-[#8e816e] font-sans tracking-wider uppercase">Sealing</span>
                <span className="text-sm text-[#d4af37] font-serif italic">Tension-Snap Volatile Preserve</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SCENE 3 — IMPERIAL MEDALLION
            Right-aligned editorial pullquote with vertical gold rule.
            Asymmetric contrast to Scene 2.
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center justify-end p-8 sm:p-14 md:p-20 lg:p-28"
          style={getSceneStyle(scene === 3)}
        >
          <div className="max-w-lg pointer-events-auto text-right">
            {/* Eyebrow */}
            <div className="flex items-center justify-end gap-3 mb-6">
              <span className="label-eyebrow text-[10px]">ACT II</span>
              <div className="w-8 h-px bg-[#d4af37]/30" />
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-4">
              Sacred<br />
              <span className="text-[#d4af37]">Meander</span>
            </h2>

            {/* Pullquote — the centerpiece of this scene */}
            <div className="border-r-2 border-[#d4af37]/40 pr-6 mb-8">
              <p className="font-serif italic text-lg sm:text-xl text-[#c4b5a0] leading-relaxed">
                "The Greek key meander motif encircles the hand-lettered
                <span className="text-[#d4af37] font-arabic not-italic text-xl" dir="rtl"> النبيل </span>
                calligraphy — symbolizing infinity and unbroken royal lineage."
              </p>
            </div>

            {/* Specs */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-end gap-4">
                <span className="text-sm text-[#f7ecd5] font-serif">1.2mm Raised Gold Foil</span>
                <span className="text-[11px] text-[#8e816e] font-sans tracking-wider uppercase">Relief</span>
              </div>
              <div className="flex items-baseline justify-end gap-4">
                <span className="text-sm text-[#f7ecd5] font-serif">Lattafa Private Reserve</span>
                <span className="text-[11px] text-[#8e816e] font-sans tracking-wider uppercase">Origin</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SCENE 4 — OLFACTORY ARCHITECTURE (REDESIGNED)
            Left-side compact vertical strip. Horizontal note capsules.
            Bottle stays fully visible. Ultra-lightweight transparent panels.
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center p-6 sm:p-10 md:p-14 lg:p-20"
          style={getSceneStyle(scene === 4)}
        >
          {/* Left-side editorial column — narrow, doesn't cover bottle */}
          <div className="max-w-[420px] w-full pointer-events-auto">
            {/* Header */}
            <div className="mb-6">
              <span className="label-eyebrow text-[10px] block mb-2">ACT III · OLFACTORY FORMULARY</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-[42px] text-white uppercase tracking-tight leading-[0.92]">
                Anatomy of a<br />
                <span className="text-[#d4af37]">Liquid Jewel</span>
              </h2>
            </div>

            {/* Three Tiers — compact capsule cards */}
            <div className="space-y-3 mb-6">
              {notesTiers.map((tier, idx) => (
                <div
                  key={tier.stage}
                  className="relative p-4 border-l-2 border-[#d4af37]/40 bg-gradient-to-r from-[#0a0908]/80 to-transparent hover:from-[#0e0c09]/90 transition-all duration-300 group"
                >
                  {/* Tier Header */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-[10px] font-sans font-bold text-[#d4af37] tracking-[0.2em]">
                      {tier.stage}
                    </span>
                    <div className="h-px flex-1 bg-[#d4af37]/15" />
                    <span className="text-[10px] text-[#6d6253] font-sans">{tier.timeframe}</span>
                  </div>

                  {/* Title + Description */}
                  <h3 className="font-serif text-lg text-white font-medium mb-1">{tier.title}</h3>
                  <p className="text-[11px] text-[#a89a87] font-sans font-light leading-relaxed mb-2.5">
                    {tier.desc}
                  </p>

                  {/* Note Tags — inline */}
                  <div className="flex flex-wrap gap-1.5">
                    {tier.notes.map((n) => (
                      <span
                        key={n}
                        className="text-[9px] px-2 py-0.5 border border-[#d4af37]/20 text-[#d4af37]/80 font-sans tracking-wider uppercase group-hover:border-[#d4af37]/40 transition-colors"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Accord Bars — compact inline version */}
            <div className="border-t border-[#d4af37]/15 pt-4">
              <span className="text-[10px] text-[#6d6253] font-sans tracking-[0.2em] uppercase block mb-3">
                DOMINANT ACCORDS
              </span>
              <div className="space-y-2.5">
                {[
                  { name: 'Warm Spicy & Clove', value: 94 },
                  { name: 'Cambodian Agarwood', value: 91 },
                  { name: 'Golden Ambergris', value: 86 },
                  { name: 'Atlas Rosemary', value: 78 },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <span className="text-[11px] text-[#c4b5a0] font-sans w-[140px] shrink-0 truncate">{a.name}</span>
                    <div className="flex-1 h-[2px] bg-[#1a1612]/80 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${a.value}%`,
                          background: 'linear-gradient(90deg, #997b2b, #d4af37)',
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#d4af37] w-[32px] text-right">{a.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SCENE 5 — CRAFTSMANSHIP ATELIER (REDESIGNED)
            Header top-left. Bottom: transparent horizontal strip with
            numbered specs separated by vertical gold hairlines.
            Architectural blueprint aesthetic.
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20"
          style={getSceneStyle(scene === 5)}
        >
          {/* Header */}
          <div className="pt-14 sm:pt-16">
            <span className="label-eyebrow text-[10px] block mb-2">ACT IV · ATELIER</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[42px] text-white uppercase tracking-tight leading-[0.92]">
              Architecture of<br />
              <span className="text-[#d4af37]">the Monolith</span>
            </h2>
          </div>

          {/* Bottom Specs Strip — transparent, horizontal */}
          <div className="w-full pb-4 pointer-events-auto">
            <div className="max-w-6xl mx-auto">
              {/* Single transparent strip with 4 specs */}
              <div
                className="flex flex-col sm:flex-row items-stretch"
                style={{
                  background: 'linear-gradient(180deg, rgba(8,7,6,0.3) 0%, rgba(8,7,6,0.75) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {specs.map((item, idx) => (
                  <div
                    key={item.num}
                    className={`flex-1 p-5 sm:p-6 group relative ${
                      idx < specs.length - 1 ? 'sm:border-r border-b sm:border-b-0 border-[#d4af37]/10' : ''
                    }`}
                  >
                    {/* Hover glow accent */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                    
                    {/* Number — large, ghosted */}
                    <span className="block font-display text-4xl sm:text-5xl text-[#d4af37]/15 group-hover:text-[#d4af37]/35 transition-colors duration-500 leading-none mb-2 relative">
                      {item.num}
                    </span>
                    {/* Content */}
                    <h3 className="font-serif text-[15px] text-white font-medium mb-0.5 relative">{item.label}</h3>
                    <span className="block text-[11px] text-[#d4af37] font-sans font-medium mb-1.5 relative">{item.value}</span>
                    <p className="text-[10px] text-[#8e816e] font-sans font-light leading-relaxed relative">{item.detail}</p>
                  </div>
                ))}
              </div>

              {/* Blueprint footer line */}
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-[9px] text-[#6d6253] font-sans tracking-[0.3em] uppercase">
                  LATTAFA DESIGN BUREAU
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-px bg-[#d4af37]/30" />
                  <span className="text-[9px] text-[#d4af37] font-mono">EDP-30%</span>
                  <div className="w-3 h-px bg-[#d4af37]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            SCENE 6 — THE TRILOGY DYNASTY (REDESIGNED)
            Center-focused. Header top-center. Compact horizontal 
            selector row with glassmorphic active state. Floating CTA.
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16"
          style={getSceneStyle(scene === 6)}
        >
          {/* Header */}
          <div className="pt-14 sm:pt-16 text-center">
            <span className="label-eyebrow text-[10px] block mb-2">ACT V · THE ROYAL DYNASTY</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[42px] text-white uppercase tracking-tight">
              The Al Noble <span className="text-[#d4af37]">Trilogy</span>
            </h2>
          </div>

          {/* Bottom: Trilogy Selector + CTA */}
          <div className="max-w-5xl mx-auto w-full pb-4 pointer-events-auto">
            {/* Three Selector Cards — glassmorphic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {trilogy.map((item) => {
                const isSel = item.id === selectedTrilogyId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedTrilogyId(item.id)}
                    className="text-left relative overflow-hidden cursor-pointer focus:outline-none transition-all duration-500 group"
                    style={{
                      background: isSel
                        ? 'linear-gradient(160deg, rgba(14,12,9,0.85) 0%, rgba(20,17,13,0.92) 100%)'
                        : 'linear-gradient(160deg, rgba(8,7,6,0.5) 0%, rgba(8,7,6,0.7) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: isSel ? '1px solid rgba(212,175,55,0.5)' : '1px solid rgba(212,175,55,0.08)',
                      boxShadow: isSel ? '0 0 40px -8px rgba(212,175,55,0.15), inset 0 1px 0 rgba(212,175,55,0.1)' : 'none',
                    }}
                  >
                    {/* Active gold edge accent */}
                    {isSel && (
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                    )}

                    <div className="p-5 sm:p-6">
                      {/* Badge + Price Row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[9px] tracking-[0.2em] uppercase font-sans font-semibold px-2.5 py-1 ${
                          isSel
                            ? 'bg-[#d4af37] text-[#080706]'
                            : 'text-[#6d6253] border border-[#d4af37]/15'
                        }`}>
                          {item.badge}
                        </span>
                        <span className={`font-serif text-lg ${isSel ? 'text-[#d4af37]' : 'text-[#6d6253]'}`}>
                          $185
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium leading-tight mb-0.5">
                        {item.fullName}
                      </h3>
                      <span className="text-[12px] italic text-[#d4af37]/70 font-serif block mb-2">
                        {item.subtitle}
                      </span>

                      <p className="text-[11px] text-[#a89a87] font-sans font-light leading-relaxed mb-3">
                        {item.personality}
                      </p>

                      {/* Accords + Selection State */}
                      <div className="flex justify-between items-center text-[10px] font-sans pt-2 border-t border-[#d4af37]/8">
                        <span className="text-[#8e816e] tracking-wide">{item.accords}</span>
                        {isSel ? (
                          <span className="flex items-center gap-1 text-[#d4af37] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[#6d6253] group-hover:text-[#d4af37]/60 transition-colors">Select →</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA Bar — floating, glassmorphic */}
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6"
              style={{
                background: 'linear-gradient(160deg, rgba(12,10,8,0.7) 0%, rgba(8,7,6,0.85) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.12)',
              }}
            >
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-white font-medium">
                  {currentItem?.fullName}
                  <span className="text-[#d4af37] ml-2 font-display text-2xl">$185</span>
                </h4>
                <p className="text-[11px] text-[#8e816e] font-sans mt-0.5">
                  100ml Extrait De Parfum · Velvet Coffret · Discovery Vials
                </p>
              </div>

              <button
                type="button"
                onClick={() => onAcquireClick(currentItem)}
                className="w-full sm:w-auto px-10 py-4 btn-gold-couture text-[11px] flex items-center justify-center gap-2"
              >
                <span>Acquire Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Tall scroll spacer for 720 frames */}
      <div
        style={{ height: `${TOTAL_SCROLL_VH}vh` }}
        aria-hidden="true"
      />
    </>
  );
}
