import { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export default function CollectionShowcase({ onSelectProduct }) {
  const [selectedFragrance, setSelectedFragrance] = useState('ameer');

  const trilogy = [
    {
      id: 'ameer',
      name: 'Al Noble Ameer',
      subtitle: 'The Sovereign Black Stag',
      role: 'Hero Monolith',
      flaconColor: 'Obsidian Velvet & Gold',
      aura: 'Warm Spicy, Cambodian Oud, Dark Amber, Clove',
      concentration: '30% Extrait De Parfum',
      price: '$185',
      badge: 'Current Experience',
      character:
        'A dark, magnetic monarch. Commanding, warm, and enveloping. The signature scent of royalty and evening galas.',
      notes: {
        top: 'Apple, Pink Pepper, Rosemary',
        heart: 'Clove, Orris Root, Night Lily',
        base: 'Oud, Haitian Vetiver, Amber, Cypress',
      },
    },
    {
      id: 'wazeer',
      name: 'Al Noble Wazeer',
      subtitle: 'The Gilded White Stag',
      role: 'The Minister of Grace',
      flaconColor: 'Alabaster Ivory & Gold',
      aura: 'Fresh Mint, Bergamot, Juniper, Iris, Amberwood',
      concentration: '25% Eau De Parfum Intense',
      price: '$185',
      badge: 'Luminous Sibling',
      character:
        'A refined, intellectual freshness. Bright herbal mint meets velvety powdery orris and radiant blonde amber.',
      notes: {
        top: 'Frosted Mint, Bitter Orange, Juniper Berry',
        heart: 'Iris Butter, Raspberry, Dark Chocolate',
        base: 'Cedarwood, Amberwood, Vanilla Bean, Musk',
      },
    },
    {
      id: 'safeer',
      name: 'Al Noble Safeer',
      subtitle: 'The Emerald Stag',
      role: 'The Ambassador of Woods',
      flaconColor: 'Emerald Velvet & Gold',
      aura: 'Aromatic Artemisia, Moroccan Rose, Blonde Patchouli',
      concentration: '25% Eau De Parfum Intense',
      price: '$185',
      badge: 'Herbal Majesty',
      character:
        'A mysterious botanical green depth. Aromatic Mediterranean herbs draped over dew-kissed rose petals and vetiver.',
      notes: {
        top: 'Artemisia, Bergamot, Green Herbal Notes',
        heart: 'Taif Rose, Spicy Nutmeg, White Jasmine',
        base: 'Blonde Patchouli, Earthy Moss, Amber Resins',
      },
    },
  ];

  const current = trilogy.find((t) => t.id === selectedFragrance);

  return (
    <section
      id="collection"
      className="relative bg-[#0a0807] py-28 px-6 md:px-12 lg:px-24 border-t border-[#d4af37]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-[#d4af37] uppercase font-sans mb-3">
            ROYAL DYNASTY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#f7ecd5] font-normal uppercase tracking-tight mb-4">
            The Al Noble Trilogy
          </h2>
          <p className="text-xs md:text-sm text-[#ab9b86] max-w-lg font-sans font-light leading-relaxed">
            Three sovereign expressions of the golden stag crest. Discover the contrasting facets of the royal house.
          </p>
        </div>

        {/* Trilogy Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {trilogy.map((item) => {
            const isSelected = item.id === selectedFragrance;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFragrance(item.id)}
                className={`cursor-pointer border p-8 transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#14100c] border-[#d4af37] shadow-[0_10px_40px_rgba(212,175,55,0.15)] scale-[1.02]'
                    : 'bg-[#0e0c09] border-[#d4af37]/20 hover:border-[#d4af37]/60'
                }`}
              >
                {/* Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span
                    className={`text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 font-sans ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#080706] font-semibold'
                        : 'bg-[#1e1913] text-[#a39480]'
                    }`}
                  >
                    {item.badge}
                  </span>
                  <span className="font-mono text-sm text-[#d4af37]">
                    {item.price}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#f7ecd5] mb-1">
                    {item.name}
                  </h3>
                  <span className="text-xs tracking-wider text-[#d4af37] font-serif italic block mb-4">
                    {item.subtitle}
                  </span>

                  <p className="text-xs text-[#a39480] font-sans leading-relaxed mb-6 font-light">
                    {item.character}
                  </p>
                </div>

                <div className="border-t border-[#d4af37]/15 pt-4 flex items-center justify-between">
                  <span className="text-[10px] tracking-wider text-[#8e816e] uppercase font-sans">
                    {item.flaconColor}
                  </span>
                  <span
                    className={`text-xs font-sans tracking-widest uppercase transition-colors ${
                      isSelected ? 'text-[#d4af37]' : 'text-[#6a5e4f]'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select Flacon'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Fragrance Detailed Banner */}
        <div className="bg-[#0f0d09] border border-[#d4af37]/30 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase font-sans block mb-2">
              ACQUISITION SUMMARY • {current.concentration}
            </span>
            <h3 className="font-serif text-3xl text-[#f7ecd5] mb-4">
              {current.name} — 100ml Flacon
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans mb-6">
              <div className="bg-[#16120d] p-3 border-l-2 border-[#d4af37]">
                <span className="block text-[9px] text-[#7d7160] uppercase">TOP</span>
                <span className="text-[#f5ebd7]">{current.notes.top}</span>
              </div>
              <div className="bg-[#16120d] p-3 border-l-2 border-[#d4af37]">
                <span className="block text-[9px] text-[#7d7160] uppercase">HEART</span>
                <span className="text-[#f5ebd7]">{current.notes.heart}</span>
              </div>
              <div className="bg-[#16120d] p-3 border-l-2 border-[#d4af37]">
                <span className="block text-[9px] text-[#7d7160] uppercase">BASE</span>
                <span className="text-[#f5ebd7]">{current.notes.base}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => onSelectProduct(current)}
              className="px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#f3dfa2] to-[#b88c28] text-[#080706] text-xs uppercase tracking-[0.3em] font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all text-center whitespace-nowrap"
            >
              Order {current.name} • {current.price}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
