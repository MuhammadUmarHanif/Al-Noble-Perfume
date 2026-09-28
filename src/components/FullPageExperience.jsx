import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFrame, TOTAL_FRAMES } from '../utils/frameSequence';
import ThreeAtmosphere from './ThreeAtmosphere';
import {
  Volume2,
  VolumeX,
  Wind,
  Feather,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { luxuryAudio } from '../utils/audioAmbience';

gsap.registerPlugin(ScrollTrigger);

export default function FullPageExperience({ onAcquireClick, onSelectTrilogyItem }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [selectedTrilogyId, setSelectedTrilogyId] = useState('ameer');
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

      const isMobile = canvasW < 768;
      const isTablet = canvasW >= 768 && canvasW < 1024;

      let targetScale;
      if (isMobile) {
        targetScale = (canvasH / naturalH) * 0.90;
      } else if (isTablet) {
        targetScale = (canvasH / naturalH) * 0.94;
      } else {
        targetScale = (canvasH / naturalH) * 0.96;
      }

      const drawW = naturalW * targetScale;
      const drawH = naturalH * targetScale;

      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    resizeCanvas();
    renderFrame(0);

    window.addEventListener('resize', resizeCanvas);

    // Frame object scrubbed by GSAP ScrollTrigger spanning the entire website
    const frameObj = { frame: 0 };

    const ctxGsap = gsap.context(() => {
      gsap.to(frameObj, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35, // Butter-smooth bi-directional scrubbing
          onUpdate: (self) => {
            const progress = self.progress;
            const targetFrame = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.round(frameObj.frame))
            );

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

  // Data for sections
  const notesPyramid = [
    {
      stage: 'TOP NOTES',
      timeframe: '0 – 30 MIN',
      subtitle: 'The Imperial Greeting',
      description: 'Crisp green orchard apple sparked with crushed pink peppercorn and Atlas mountain rosemary.',
      ingredients: ['Green Apple', 'Pink Peppercorn', 'Atlas Rosemary'],
      icon: Wind,
    },
    {
      stage: 'HEART NOTES',
      timeframe: '2 – 6 HOURS',
      subtitle: 'The Noble Soul',
      description: 'Spiced clove buds intertwine with powdery Tuscan orris and velvety night-blooming white flora.',
      ingredients: ['Clove Buds', 'Tuscan Orris Root', 'Night Lily'],
      icon: Feather,
    },
    {
      stage: 'BASE NOTES',
      timeframe: '8 – 16+ HOURS',
      subtitle: 'The Sovereign Trail',
      description: 'Smoky Cambodian agarwood oud melds with golden ambergris, dark vetiver, and smoked cypress.',
      ingredients: ['Cambodian Oud', 'Golden Ambergris', 'Smoked Cypress'],
      icon: Flame,
    },
  ];

  const accords = [
    { name: 'Warm Spicy & Clove', value: 94 },
    { name: 'Cambodian Oud Agarwood', value: 90 },
    { name: 'Golden Ambergris Nectar', value: 86 },
    { name: 'Aromatic Atlas Rosemary', value: 78 },
    { name: 'Powdery Tuscan Orris', value: 72 },
  ];

  const craftsmanshipPillars = [
    {
      num: '01',
      title: 'Sculpted Stag Cap',
      subtitle: '24K Mirror-Polished Alloy',
      description: 'Hand-buffed by master artisans, balancing 210 grams of solid metallic weight.',
      specs: '210g • Solid Alloy',
    },
    {
      num: '02',
      title: 'Meander Crest',
      subtitle: 'Imperial Medallion & Relief',
      description: 'Classical Greek key relief border enshrining Arabesque calligraphy ("النبيل").',
      specs: '1.2mm Raised Relief',
    },
    {
      num: '03',
      title: 'Obsidian Armor',
      subtitle: 'Tactile Matte Finish',
      description: 'Fingerprint-proof matte black monolith shielding 30% Extrait nectar from light.',
      specs: 'UV Photoprotective',
    },
    {
      num: '04',
      title: 'Micro-Diffuser',
      subtitle: 'French Cloud Atomizer',
      description: 'Disperses a velvety wide mist cloud with zero heavy droplets.',
      specs: '0.12ml Micro-Plume',
    },
  ];

  const trilogy = [
    {
      id: 'ameer',
      name: 'Al Noble Ameer',
      subtitle: 'The Sovereign Black Stag',
      badge: 'Hero Extrait',
      price: '$185',
      aura: 'Oud • Clove • Ambergris',
      desc: 'Dark, commanding — smoked agarwood & clove warmth.',
    },
    {
      id: 'wazeer',
      name: 'Al Noble Wazeer',
      subtitle: 'The Gilded White Stag',
      badge: 'Luminous',
      price: '$185',
      aura: 'Mint • Iris • Cashmeran',
      desc: 'Crisp, aristocratic — chilled mint & Florentine iris.',
    },
    {
      id: 'safeer',
      name: 'Al Noble Safeer',
      subtitle: 'The Emerald Forest Stag',
      badge: 'Botanical',
      price: '$185',
      aura: 'Artemisia • Rose • Moss',
      desc: 'Wild, earthen — French artemisia & Damascus rose.',
    },
  ];

  const currentTrilogyItem = trilogy.find((t) => t.id === selectedTrilogyId) || trilogy[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#080706]"
      style={{ height: '950vh' }}
    >
      {/* ========================================================
          STICKY FULLSCREEN CANVAS VIEWPORT (SPANS ENTIRE WEBSITE)
         ======================================================== */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">
        {/* Subtle Atmospheric Vignette & Radial Backlight */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 52%, rgba(200, 155, 60, 0.08) 0%, rgba(8, 7, 6, 0.45) 60%, #080706 100%)',
          }}
        />

        {/* Three.js Celestial Gold Dust Particles */}
        <ThreeAtmosphere scrollProgress={scrollProgress} />

        {/* The 720-Frame HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-1 w-full h-full object-contain cursor-default"
          style={{ width: '100%', height: '100%' }}
        />

        {/* ========================================================
            FIXED CORNER CONTROLLERS (AUDIO & FRAME PROGRESS)
           ======================================================== */}
        <div className="absolute bottom-6 left-6 right-6 md:left-14 md:right-14 z-30 pointer-events-none flex items-center justify-between">
          {/* Audio Ambience Synthesizer Toggle */}
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label="Toggle luxury ambient audio"
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 bg-[#080706]/70 backdrop-blur-md border border-[#d4af37]/25 hover:border-[#d4af37] text-[#d4af37] transition-all text-[10px] tracking-[0.25em] uppercase font-sans rounded-full shadow-2xl"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Ambience Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline opacity-70">Sound Experience</span>
              </>
            )}
          </button>

          {/* Frame & Progress Counter */}
          <div className="pointer-events-auto flex items-center gap-4 bg-[#080706]/70 backdrop-blur-md border border-[#d4af37]/25 px-4 py-2 rounded-full shadow-2xl">
            <div className="text-[10px] tracking-[0.25em] text-[#8e816e] uppercase font-sans">
              <span className="text-[#d4af37] font-semibold font-mono">
                {String(currentFrameNum).padStart(4, '0')}
              </span>
              <span className="mx-1 text-[#4a4237]">/</span>
              <span className="font-mono text-[#6d6253]">0720</span>
            </div>
            {/* Visual mini progress bar */}
            <div className="w-16 md:w-28 h-[2px] bg-[#1e1a15] relative overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#b88c28] to-[#f3dfa2] transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          EDITORIAL SECTIONS SCROLL STREAM (OVERLAID ON 720-FRAME ANIMATION)
         ======================================================== */}
      <div className="relative z-10 w-full pointer-events-none -mt-[100vh]">

        {/* ========================================================
            STAGE 1: THE ROYAL PROLOGUE (0vh - 120vh)
           ======================================================== */}
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-between p-6 md:p-14 lg:p-20 relative pointer-events-none"
        >
          {/* Top Brand Tagline */}
          <div className="flex flex-col items-center text-center mt-12 md:mt-8">
            <span className="text-[9px] md:text-[11px] tracking-[0.5em] text-[#d4af37] uppercase font-sans font-medium mb-3">
              HAUTE PARFUMERIE ROYALE
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          </div>

          {/* Large Hero Title */}
          <div className="flex flex-col items-center text-center my-auto pointer-events-auto">
            <span className="font-arabic text-2xl md:text-3xl text-[#d4af37]/80 mb-3 tracking-widest">
              أَمِير • النَّبِيل
            </span>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7ecd5] to-[#c5a059] tracking-tight uppercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
              AL NOBLE
            </h1>
            <div className="flex items-center gap-4 my-3">
              <span className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
              <span className="font-serif italic text-2xl md:text-4xl text-[#d4af37] tracking-wider">
                Ameer
              </span>
              <span className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
            </div>
            <p className="text-[10px] md:text-xs text-[#c4b5a0] tracking-[0.4em] font-sans uppercase mt-2">
              EXTRAIT DE PARFUM • 30% CONCENTRATION • 100ML
            </p>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#d4af37]/80 uppercase font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
              <span>Scroll to reveal the fragrance film</span>
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#d4af37]/60 to-transparent mt-3 animate-bounce" />
          </div>
        </section>

        {/* Breathing Spacer */}
        <div className="h-[25vh]" />

        {/* ========================================================
            STAGE 2: THE SOVEREIGN STAG & SMOKE (130vh - 250vh)
           ======================================================== */}
        <section className="min-h-screen flex items-center justify-between p-6 md:p-14 lg:p-24 relative pointer-events-none">
          <div className="max-w-md pointer-events-auto bg-[#0a0907]/60 backdrop-blur-xl border border-[#d4af37]/20 border-l-2 border-l-[#d4af37] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-sans font-medium">
                ACT I / 05
              </span>
              <span className="h-[1px] w-6 bg-[#d4af37]/40" />
              <span className="text-[9px] tracking-[0.35em] text-[#8e816e] uppercase font-sans">
                THE ICONIC STAG
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f7ecd5] font-normal leading-tight mb-4">
              The Sovereign <br />
              <span className="italic text-[#d4af37]">Golden Stag</span>
            </h2>
            <p className="text-xs md:text-sm text-[#c4b5a0] leading-relaxed font-sans font-light mb-6">
              Forged in sculpted golden alloy, the royal antlered stag is an ancient emblem of regal poise and untamed sovereignty. Each contour is hand-buffed to capture atmospheric light with liquid brilliance.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-[#d4af37]/15 pt-4">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8e816e] font-sans">
                  CROWN MATERIAL
                </span>
                <span className="font-serif text-sm text-[#f7ecd5]">
                  24K Gold Tone Alloy
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8e816e] font-sans">
                  SCULPTURAL WEIGHT
                </span>
                <span className="font-serif text-sm text-[#f7ecd5]">
                  210g Solid Crown
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-3 text-right">
            <div className="bg-[#0a0907]/60 backdrop-blur-xl border-r-2 border-[#d4af37] border-y border-l border-[#d4af37]/20 pr-6 py-4 pl-8 pointer-events-auto">
              <span className="block text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-sans mb-1">
                ATMOSPHERIC AURA
              </span>
              <span className="font-serif text-xl text-[#f7ecd5]">
                Incense & Smoked Woods
              </span>
            </div>
          </div>
        </section>

        {/* Breathing Spacer */}
        <div className="h-[30vh]" />

        {/* ========================================================
            STAGE 3: THE IMPERIAL MEANDER SEAL (260vh - 380vh)
           ======================================================== */}
        <section className="min-h-screen flex items-center justify-end p-6 md:p-14 lg:p-24 relative pointer-events-none">
          <div className="max-w-md pointer-events-auto bg-[#0a0907]/60 backdrop-blur-xl border border-[#d4af37]/20 border-r-2 border-r-[#d4af37] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-sans font-medium">
                ACT II / 05
              </span>
              <span className="h-[1px] w-6 bg-[#d4af37]/40" />
              <span className="text-[9px] tracking-[0.35em] text-[#8e816e] uppercase font-sans">
                INSIGNIA
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f7ecd5] font-normal leading-tight mb-4">
              Sacred Meander <br />
              <span className="italic text-[#d4af37]">Greek Border Seal</span>
            </h2>
            <p className="text-xs md:text-sm text-[#c4b5a0] leading-relaxed font-sans font-light mb-6">
              The flacon’s breast bears an imperial medallion surrounded by classical geometric meander borders, enshrining the noble stag monogram and gilded Arabic calligraphy celebrating Arabesque opulence.
            </p>
            <div className="border-t border-[#d4af37]/15 pt-4 flex items-center justify-between">
              <span className="text-xs tracking-[0.2em] text-[#d4af37] uppercase font-sans font-arabic font-semibold">
                النبيل • AL NOBLE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#8e816e] uppercase font-sans">
                HAUTE PARFUMERIE
              </span>
            </div>
          </div>
        </section>

        {/* Breathing Spacer */}
        <div className="h-[30vh]" />

        {/* ========================================================
            STAGE 4: ZERO-GRAVITY DECONSTRUCTION & OLFACTORY PYRAMID (390vh - 550vh)
           ======================================================== */}
        <section
          id="fragrance-notes"
          className="min-h-screen flex flex-col justify-center p-6 md:p-14 lg:p-20 relative pointer-events-none"
        >
          <div className="max-w-6xl mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-10 pointer-events-auto">
              <span className="text-[9px] md:text-[11px] tracking-[0.45em] text-[#d4af37] uppercase font-sans mb-1 block">
                ACT III / 05 • OLFACTORY ARCHITECTURE
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#f7ecd5] font-normal uppercase tracking-tight">
                Anatomy of a Liquid Jewel
              </h2>
              <p className="text-xs text-[#c4b5a0] font-sans font-light max-w-lg mx-auto mt-2">
                As the flacon deconstructs in zero gravity, the pure Extrait nectar is revealed in suspended harmony.
              </p>
            </div>

            {/* Split Layout: Floating Notes Pyramid on Left, Sensory Accords on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">

              {/* Left Column: 3 Notes Pyramid Cards (Vertical Timeline) */}
              <div className="lg:col-span-7 space-y-4">
                {notesPyramid.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={tier.stage}
                      className="bg-[#0a0907]/60 backdrop-blur-xl border border-[#d4af37]/20 border-l-2 border-l-[#d4af37] p-5 hover:border-[#d4af37]/50 transition-all shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase font-sans font-medium">
                            {tier.stage}
                          </span>
                          <span className="text-[9px] tracking-[0.2em] text-[#8e816e] font-sans">
                            • {tier.timeframe}
                          </span>
                        </div>
                        <Icon className="w-4 h-4 text-[#d4af37]/70" />
                      </div>

                      <h3 className="font-serif text-xl text-[#f7ecd5] mb-1">
                        {tier.subtitle}
                      </h3>

                      <p className="text-xs text-[#c4b5a0] font-sans leading-relaxed font-light mb-3">
                        {tier.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#d4af37]/15">
                        {tier.ingredients.map((ing) => (
                          <span
                            key={ing}
                            className="text-[10px] uppercase tracking-[0.15em] text-[#e8d5b5] bg-[#14110d]/80 px-2.5 py-1 border border-[#d4af37]/25 font-sans"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Sensory Accords Meters */}
              <div className="lg:col-span-5 bg-[#0a0907]/60 backdrop-blur-xl border border-[#d4af37]/20 border-r-2 border-r-[#d4af37] p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#d4af37]/15">
                  <span className="text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-sans font-medium">
                    SENSORY ACCORDS
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-[#8e816e] uppercase font-sans">
                    30% EXTRAIT
                  </span>
                </div>
                <div className="space-y-4">
                  {accords.map((accord) => (
                    <div key={accord.name}>
                      <div className="flex justify-between text-xs font-sans mb-1.5">
                        <span className="text-[#f7ecd5] font-light">{accord.name}</span>
                        <span className="font-mono text-[#d4af37] text-[11px]">{accord.value}%</span>
                      </div>
                      <div className="w-full h-1 bg-[#1a1612] relative overflow-hidden rounded-full">
                        <div
                          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#b88c28] via-[#d4af37] to-[#f3dfa2]"
                          style={{ width: `${accord.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Breathing Spacer */}
        <div className="h-[30vh]" />

        {/* ========================================================
            STAGE 5: REASSEMBLY & FLACON CRAFTSMANSHIP (560vh - 700vh)
           ======================================================== */}
        <section
          id="craftsmanship"
          className="min-h-screen flex flex-col justify-center p-6 md:p-14 lg:p-20 relative pointer-events-none"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12 pointer-events-auto">
              <span className="text-[9px] md:text-[11px] tracking-[0.45em] text-[#d4af37] uppercase font-sans mb-1 block">
                ACT IV / 05 • ATELIER ARTISANSHIP
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#f7ecd5] font-normal uppercase tracking-tight">
                Architecture of the Monolith
              </h2>
              <p className="text-xs text-[#c4b5a0] font-sans font-light max-w-lg mx-auto mt-2">
                As the pieces magnetically unite, witness the 4 architectural pillars of the Al Noble flacon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pointer-events-auto">
              {craftsmanshipPillars.map((p) => (
                <div
                  key={p.num}
                  className="bg-[#0a0907]/60 backdrop-blur-xl border border-[#d4af37]/20 border-t-2 border-t-[#d4af37] p-6 hover:border-[#d4af37]/60 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="font-mono text-xl text-[#d4af37]">{p.num}</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8e816e] font-sans">SPEC</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#f7ecd5] mb-1">{p.title}</h3>
                    <span className="text-[9px] uppercase tracking-widest text-[#d4af37]/80 block mb-3 font-sans">
                      {p.subtitle}
                    </span>
                    <p className="text-xs text-[#c4b5a0] font-sans leading-relaxed font-light mb-4">
                      {p.description}
                    </p>
                  </div>
                  <div className="border-t border-[#d4af37]/15 pt-3 text-[10px] text-[#d4af37] font-mono tracking-wider">
                    {p.specs}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Breathing Spacer */}
        <div className="h-[30vh]" />

        {/* ========================================================
            STAGE 6: THE TRILOGY DYNASTY & LIGHT BEAM SWEEP (710vh - 840vh)
           ======================================================== */}
        <section
          id="collection"
          className="min-h-screen flex flex-col justify-center p-6 md:p-14 lg:p-20 relative pointer-events-none"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-10 pointer-events-auto">
              <span className="text-[9px] md:text-[11px] tracking-[0.45em] text-[#d4af37] uppercase font-sans mb-1 block">
                ACT V / 05 • ROYAL DYNASTY
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#f7ecd5] font-normal uppercase tracking-tight">
                The Al Noble Trilogy
              </h2>
              <p className="text-xs text-[#c4b5a0] font-sans font-light max-w-lg mx-auto mt-2">
                A golden light sweep caresses the reassembled flacon. Explore the three sovereign stag expressions.
              </p>
            </div>

            {/* Trilogy Selector Cards - Highly transparent so the stag coin is visible! */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto mb-8">
              {trilogy.map((item) => {
                const isSelected = item.id === selectedTrilogyId;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedTrilogyId(item.id);
                      if (onSelectTrilogyItem) onSelectTrilogyItem(item);
                    }}
                    className={`cursor-pointer p-6 border transition-all duration-300 flex flex-col justify-between shadow-2xl backdrop-blur-xl ${
                      isSelected
                        ? 'bg-[#0e0c09]/75 border-[#d4af37] border-t-2 border-t-[#d4af37] shadow-[0_10px_30px_rgba(212,175,55,0.15)] scale-[1.02]'
                        : 'bg-[#080706]/50 border-[#d4af37]/20 hover:border-[#d4af37]/50'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className={`text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 font-sans ${
                            isSelected
                              ? 'bg-[#d4af37] text-[#080706] font-semibold'
                              : 'bg-[#1e1913] text-[#a39480]'
                          }`}
                        >
                          {item.badge}
                        </span>
                        <span className="font-serif text-base text-[#d4af37] font-medium">{item.price}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#f7ecd5] mb-1">{item.name}</h3>
                      <span className="text-xs italic text-[#d4af37] font-serif block mb-3">
                        {item.subtitle}
                      </span>
                      <p className="text-xs text-[#c4b5a0] font-sans font-light leading-relaxed mb-4">
                        {item.desc}
                      </p>
                    </div>

                    <div className="border-t border-[#d4af37]/15 pt-3 flex items-center justify-between text-[10px] font-sans">
                      <span className="text-[#8e816e]">{item.aura}</span>
                      <span className={isSelected ? 'text-[#d4af37] font-semibold flex items-center gap-1' : 'text-[#6d6253]'}>
                        {isSelected ? (
                          <>
                            <span>Active</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                          </>
                        ) : (
                          'Select →'
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sleek Acquisition Banner */}
            <div className="bg-[#0a0907]/75 backdrop-blur-xl border border-[#d4af37]/30 border-t-2 border-t-[#d4af37] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto shadow-2xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] font-sans font-medium">
                    SELECTED FLACON
                  </span>
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-[#f7ecd5]">
                  {currentTrilogyItem?.name} <span className="text-[#d4af37] font-serif">{currentTrilogyItem?.price}</span>
                </h4>
                <p className="text-xs text-[#c4b5a0] font-sans font-light mt-1">
                  100ml Extrait De Parfum • Velvet Coffret • Discovery Vials
                </p>
              </div>
              <button
                type="button"
                onClick={() => onAcquireClick(currentTrilogyItem)}
                className="w-full sm:w-auto px-8 py-4 btn-gold-couture text-xs uppercase tracking-[0.3em] font-semibold whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>Acquire Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Breathing Spacer */}
        <div className="h-[25vh]" />

        {/* ========================================================
            STAGE 7: FINAL REVELATION & PRIVATE ACQUISITION (850vh - 950vh)
           ======================================================== */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 md:p-14 lg:p-20 relative pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto bg-[#0a0907]/75 backdrop-blur-xl border border-[#d4af37]/30 border-t-2 border-t-[#d4af37] p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
            <span className="text-[9px] md:text-[11px] tracking-[0.45em] text-[#d4af37] uppercase font-sans mb-2 block font-medium">
              FINAL ACT • THE MONOLITH
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-[#f7ecd5] font-normal uppercase mb-4 tracking-tight">
              Crafted To Linger
            </h2>
            <p className="text-xs md:text-sm text-[#c4b5a0] font-sans font-light leading-relaxed mb-8 max-w-lg mx-auto">
              A sovereign fragrance of indisputable presence. Al Noble Ameer settles into an indelible trail of warm amber, smoked Cambodian agarwood, and regal majesty that commands memory.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onAcquireClick(currentTrilogyItem)}
                className="w-full sm:w-auto px-10 py-4 btn-gold-couture text-xs tracking-[0.3em] uppercase font-semibold flex items-center justify-center gap-2"
              >
                <span>Acquire The Flacon • $185</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#d4af37]/15 pt-6 mt-8 text-[9px] tracking-[0.2em] text-[#8e816e] uppercase font-sans">
              <div>COMPLIMENTARY VELVET COFFRET</div>
              <div>2 DISCOVERY SPRAYS INCLUDED</div>
              <div>EXPRESS GLOBAL DELIVERY</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
