'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MagneticButton from '../ui/MagneticButton';
import TactileBadge from '../ui/TactileBadge';
import { useLenisScroll } from '../providers/SmoothScrollProvider';

// Dynamic import with SSR false for Three.js canvas
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[620px] xl:h-[660px] flex items-center justify-center bg-transparent select-none">
      <div className="font-mono text-xs text-stone tracking-widest animate-pulse">
        [INITIALIZING MONUMENT...]
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const { scrollTo } = useLenisScroll();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 sm:pt-36 lg:pt-42 pb-20 lg:pb-28 border-b border-[#D1CBD0]/60 overflow-hidden bg-canvas"
    >
      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-12">
        {/* Main Editorial Asymmetrical Layout: Pure Typography on Left & 3D Monument on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Massive Editorial Display Typography with Pure Whitespace */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Massive Display Headline */}
            <h1 className="font-display uppercase font-bold text-ink text-[clamp(3.5rem,7.5vw,7.2rem)] leading-[0.92] tracking-[-0.02em] mb-8">
              GREAT BRANDS <br />
              <span className="text-cobalt">DON&apos;T PUSH.</span> <br />
              THEY RESONATE.
            </h1>

            {/* Concise Positioning Narrative Body (Strictly Max 42ch) */}
            <p className="max-w-[42ch] text-base sm:text-lg text-ink/90 font-normal leading-relaxed mb-10">
              Great companies don&apos;t just market products—they architect emotional brand
              stories that cultivate empathy, visceral trust, and generational loyalty.
            </p>

            {/* High-Contrast Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                onClick={() => scrollTo('#dialogue')}
                className="text-xs px-7 py-4"
              >
                COMMISSION BRAND STRATEGY →
              </MagneticButton>

              <MagneticButton
                variant="outline"
                onClick={() => scrollTo('#the-shift')}
                className="text-xs px-6 py-4"
              >
                THE COGNITIVE SHIFT ↓
              </MagneticButton>
            </div>

            {/* Premium Metrics Capsule Strip */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-[#D1CBD0]/60 max-w-[560px]">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  4.8X
                </div>
                <div className="text-[10px] font-mono text-stone uppercase tracking-wider mt-0.5">
                  LTV Expansion
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-cobalt">
                  +340%
                </div>
                <div className="text-[10px] font-mono text-stone uppercase tracking-wider mt-0.5">
                  Inbound Velocity
                </div>
              </div>

              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  0%
                </div>
                <div className="text-[10px] font-mono text-stone uppercase tracking-wider mt-0.5">
                  CAC Ad Addiction
                </div>
              </div>
            </div>

            {/* Subtle Draggable Tactile Badge in Whitespace */}
            <div className="mt-8 pt-6 border-t border-[#D1CBD0]/40 flex items-center gap-6">
              <TactileBadge
                label="100% RELATIONAL MOAT"
                sublabel="ZERO CAC DEPENDENCE"
                variant="cobalt"
              />
              <span className="text-xs font-mono text-stone max-w-[28ch] hidden sm:block">
                Subconscious empathy precedes every rational buying decision.
              </span>
            </div>
          </div>

          {/* Right Column: Pristine Floating 3D Architectural Brand Monument */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:-mt-10">
            <div className="w-full relative">
              <HeroCanvas />
              
              {/* Subtle Spatial Caption */}
              <div className="mt-2 text-center">
                <span className="font-mono text-[10px] text-stone tracking-[0.16em] uppercase">
                  [TM MONOLITH // INTERACTIVE 3D EMBLEM]
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
