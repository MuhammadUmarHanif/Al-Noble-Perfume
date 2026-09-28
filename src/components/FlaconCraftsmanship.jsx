import { Shield, Sparkles, Gem, Layers, Award } from 'lucide-react';

export default function FlaconCraftsmanship() {
  const craftsmanshipPillars = [
    {
      num: '01',
      title: 'Sculpted Golden Stag Cap',
      subtitle: 'Cast Alloy & 24K Mirror Polish',
      description:
        'The iconic stag head is sculpted with anatomical precision. Hand-buffed by master metallurgists, its golden antlers rise as a crown of majesty, balancing heavy tactile luxury with flawless closure geometry.',
      specs: 'Weight: 210g • Zamak Alloy • High-Gloss Finish',
    },
    {
      num: '02',
      title: 'The Greek Meander Crest',
      subtitle: 'Imperial Medallion & Calligraphy',
      description:
        'A micro-engraved circular coin embedded into the flacon’s breast. Encircled by a classical Greek key border, it proudly honors Arabesque calligraphy ("النبيل") and the noble stag emblem.',
      specs: 'Relief Height: 1.2mm • Anti-Tarnish Coating',
    },
    {
      num: '03',
      title: 'Velvet Midnight Monolith',
      subtitle: 'Tactile Matte Polymer Armor',
      description:
        'The outer casing provides a sensual matte touch that resists fingerprints while shielding the precious Extrait oil from UV photodegradation, preserving the integrity of raw resins for decades.',
      specs: 'UV-Resistant • Matte Obsidian Touch',
    },
    {
      num: '04',
      title: 'Precision Micro-Diffuser',
      subtitle: 'French Cloud Vaporization',
      description:
        'Engineered with an ultra-fine internal nozzle that atomizes the thick 30% Extrait oil into a micro-dispersed plume, coating the skin with uniform sensory coverage without alcohol dripping.',
      specs: 'Spray Volume: 0.12ml/puff • Golden Collar',
    },
  ];

  return (
    <section
      id="craftsmanship"
      className="relative bg-[#080706] py-28 px-6 md:px-12 lg:px-24 border-t border-[#d4af37]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-[#d4af37]/15 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-5 h-[1px] bg-[#d4af37]" />
              <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase font-sans">
                ATELIER ARTISANSHIP
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f7ecd5] font-normal tracking-tight uppercase">
              The Architecture of the Flacon
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#ab9b86] max-w-md font-sans font-light leading-relaxed">
            Every element of Al Noble Ameer was engineered to be a collectible sculpture. From the weighted stag head to the internal suspension rings revealed in deconstruction.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftsmanshipPillars.map((pillar) => (
            <div
              key={pillar.num}
              className="bg-[#0e0c09] border border-[#d4af37]/20 p-8 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-mono text-2xl text-[#d4af37]/60 group-hover:text-[#d4af37] transition-colors">
                    {pillar.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#7d7160]">
                    SPECIFICATION
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#f5ebd7] mb-1 group-hover:text-[#d4af37] transition-colors">
                  {pillar.title}
                </h3>
                <span className="text-[10px] tracking-[0.2em] text-[#c5a059] uppercase font-sans block mb-4">
                  {pillar.subtitle}
                </span>

                <p className="text-xs text-[#a39480] font-sans font-light leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              <div className="border-t border-[#d4af37]/15 pt-4 text-[10px] tracking-wider text-[#d4af37]/80 font-mono">
                {pillar.specs}
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Quote Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#120f0b] via-[#1a150e] to-[#120f0b] border border-[#d4af37]/30 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-sans block mb-3">
              CREATIVE DIRECTION
            </span>
            <blockquote className="font-serif text-xl md:text-3xl text-[#f7ecd5] italic font-light leading-relaxed mb-4">
              "We did not merely design a bottle; we erected a sovereign totem. When your hand grasps the golden stag, you awaken centuries of Arabian nobility."
            </blockquote>
            <cite className="text-xs tracking-[0.25em] text-[#ab9b86] uppercase font-sans not-italic">
              — Master Perfumer & Flacon Designer, Dubai
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
