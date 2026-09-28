import { useState } from 'react';
import { Sparkles, Feather, Wind, Flame, Shield, Droplets } from 'lucide-react';

export default function FragranceNotes() {
  const [activeTab, setActiveTab] = useState('all');

  const notesPyramid = [
    {
      stage: 'TOP NOTES',
      timeframe: 'First 30 Minutes',
      subtitle: 'The Regal Opening',
      description:
        'A crisp, invigorating burst that commands immediate attention with energetic spices and orchard crispness.',
      ingredients: [
        { name: 'Green Apple', origin: 'Granny Smith Orchards', profile: 'Crisp, Juicy, Luminous' },
        { name: 'Pink Pepper', origin: 'Madagascar Highlands', profile: 'Effervescent, Rosy, Spicy' },
        { name: 'Moroccan Rosemary', origin: 'Atlas Slopes', profile: 'Aromatic, Herbal, Pine Fresh' },
      ],
      icon: Wind,
      color: 'from-amber-200/20 to-transparent',
    },
    {
      stage: 'HEART NOTES',
      timeframe: '2 to 6 Hours',
      subtitle: 'The Noble Soul',
      description:
        'The deep, resonant core where intoxicating spice intertwines with noble powdery floral elegance.',
      ingredients: [
        { name: 'Spiced Clove Buds', origin: 'Zanzibar Spice Coast', profile: 'Piquant, Warm, Sensual' },
        { name: 'Tuscan Orris Root', origin: 'Florence Valley', profile: 'Powdery, Velvety, Aristocratic' },
        { name: 'Night-Blooming Lily', origin: 'Mediterranean Oasis', profile: 'Creamy, Enigmatic Floral' },
      ],
      icon: Feather,
      color: 'from-amber-400/25 to-transparent',
    },
    {
      stage: 'BASE NOTES',
      timeframe: '8 to 16+ Hours',
      subtitle: 'The Eternal Trail',
      description:
        'The dark, monolithic anchor that settles into the skin and fabric, leaving an indelible aura of majesty.',
      ingredients: [
        { name: 'Smoky Cambodian Oud', origin: 'Koh Kong Wild Agarwood', profile: 'Smoky, Balsamic, Regal' },
        { name: 'Golden Ambergris', origin: 'Arabian Gulf Resins', profile: 'Honeyed Warmth, Mineral Glow' },
        { name: 'Haitian Vetiver', origin: 'Les Cayes Highlands', profile: 'Smoky Earth, Damp Wood' },
        { name: 'Smoked Cypress', origin: 'Mediterranean Terraces', profile: 'Dark Green, Resinous, Deep' },
      ],
      icon: Flame,
      color: 'from-amber-600/30 to-transparent',
    },
  ];

  const accords = [
    { name: 'Warm Spicy & Clove', value: 94 },
    { name: 'Dark Cambodian Oud', value: 90 },
    { name: 'Golden Ambergris', value: 86 },
    { name: 'Aromatic Herbs & Rosemary', value: 78 },
    { name: 'Powdery Orris Root', value: 72 },
  ];

  return (
    <section
      id="fragrance-notes"
      className="relative bg-[#0a0807] py-28 px-6 md:px-12 lg:px-24 border-t border-[#d4af37]/15 overflow-hidden"
    >
      {/* Background Radial Amber Ambiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-15 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(138,98,30,0.1) 70%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#d4af37]" />
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase font-sans">
              OLFACTORY PYRAMID
            </span>
            <span className="w-6 h-[1px] bg-[#d4af37]" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#f7ecd5] font-normal tracking-tight uppercase mb-4">
            The Symphony of Notes
          </h2>
          <p className="text-xs md:text-sm text-[#ab9b86] max-w-xl font-sans font-light leading-relaxed">
            Formulated at 30% pure perfume oil concentration. Every tier of Al Noble Ameer unfolds in timed sequence, commanding curiosity before settling into an unforgettable signature.
          </p>
        </div>

        {/* 3-Column Notes Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {notesPyramid.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.stage}
                className="bg-[#0f0d0a]/90 border border-[#d4af37]/25 hover:border-[#d4af37] transition-all duration-500 p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.color}`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-sans font-medium">
                      {tier.stage}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-[#7d7160] font-sans">
                      {tier.timeframe}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#f7ecd5] mb-2 group-hover:text-[#d4af37] transition-colors">
                    {tier.subtitle}
                  </h3>

                  <p className="text-xs text-[#a39480] font-sans leading-relaxed mb-6 font-light">
                    {tier.description}
                  </p>

                  {/* Ingredients List */}
                  <div className="space-y-4 border-t border-[#d4af37]/15 pt-5">
                    {tier.ingredients.map((ing) => (
                      <div
                        key={ing.name}
                        className="flex flex-col bg-[#14110d] p-3 border-l-2 border-[#d4af37]/40 group-hover:border-[#d4af37] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm text-[#f5ebd7]">
                            {ing.name}
                          </span>
                          <span className="text-[9px] tracking-[0.15em] text-[#d4af37] uppercase font-sans">
                            {ing.origin}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#8e816e] font-sans italic mt-1">
                          {ing.profile}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#d4af37]/15 flex items-center justify-between text-[10px] text-[#7d7160] font-sans">
                  <span>TIER 0{idx + 1}</span>
                  <Icon className="w-4 h-4 text-[#d4af37]/60" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Accords & Performance Meters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#0d0b08] border border-[#d4af37]/20 p-8 md:p-12">
          {/* Left: Accord Breakdown Meters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-sans">
                MAIN ACCORDS
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#f7ecd5] mb-6">
              Sensory Dominance
            </h3>

            <div className="space-y-5">
              {accords.map((accord) => (
                <div key={accord.name}>
                  <div className="flex justify-between text-xs font-sans mb-1.5">
                    <span className="text-[#e8d5b5] tracking-wider">{accord.name}</span>
                    <span className="font-mono text-[#d4af37]">{accord.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1a1612] relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#b88c28] to-[#f3dfa2]"
                      style={{ width: `${accord.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Technical Specifications & Wear Guide */}
          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#d4af37]/15 pt-8 lg:pt-0 lg:pl-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-sans block mb-2">
                PERFORMANCE SPECIFICATIONS
              </span>
              <h3 className="font-serif text-2xl text-[#f7ecd5] mb-6">
                Longevity & Sillage
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-[#14110d] p-4 border border-[#d4af37]/15">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#8e8271] block mb-1">
                    CONCENTRATION
                  </span>
                  <span className="font-serif text-lg text-[#f5ebd7] block">
                    30% Extrait
                  </span>
                  <span className="text-[10px] text-[#a39480]">Haute concentration</span>
                </div>

                <div className="bg-[#14110d] p-4 border border-[#d4af37]/15">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#8e8271] block mb-1">
                    LONGEVITY
                  </span>
                  <span className="font-serif text-lg text-[#f5ebd7] block">
                    16+ Hours
                  </span>
                  <span className="text-[10px] text-[#a39480]">Residual skin trail</span>
                </div>

                <div className="bg-[#14110d] p-4 border border-[#d4af37]/15">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#8e8271] block mb-1">
                    SILLAGE & PROJECTION
                  </span>
                  <span className="font-serif text-lg text-[#f5ebd7] block">
                    Heavy / Royal
                  </span>
                  <span className="text-[10px] text-[#a39480]">Rooms acknowledge presence</span>
                </div>

                <div className="bg-[#14110d] p-4 border border-[#d4af37]/15">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#8e8271] block mb-1">
                    BEST SEASON
                  </span>
                  <span className="font-serif text-lg text-[#f5ebd7] block">
                    Autumn / Winter
                  </span>
                  <span className="text-[10px] text-[#a39480]">Gala & Black Tie</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#8e816e] italic border-t border-[#d4af37]/15 pt-4">
              "To apply: Vaporize across pulse points — throat, nape of neck, and wrists. The warmth of the body awakens the sleeping Cambodian oud."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
