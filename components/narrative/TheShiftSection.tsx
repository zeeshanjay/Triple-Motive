'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ShiftDimension {
  dimension: string;
  marketing: {
    title: string;
    description: string;
    metric: string;
    vibe: string;
  };
  branding: {
    title: string;
    description: string;
    metric: string;
    vibe: string;
  };
}

const SHIFT_DIMENSIONS: ShiftDimension[] = [
  {
    dimension: '01 // VALUE PROPOSITION',
    marketing: {
      title: 'Feature Pushing & Utility',
      description: 'Obsessed with technical specs, speed dials, discount coupons, and transactional "buy now" prompts that commoditize value.',
      metric: 'Transient Conversion: 1.4%',
      vibe: 'Transactional, loud, easily replicated by competitors.',
    },
    branding: {
      title: 'Shared Worldview & Belief',
      description: 'Articulates an existential purpose. Speaks to what the customer believes about themselves, forging immediate subconscious kinship.',
      metric: 'Organic Affinity: 88% Brand Recall',
      vibe: 'Relational, timeless, inimitable cultural resonance.',
    },
  },
  {
    dimension: '02 // RETENTION ENGINE',
    marketing: {
      title: 'Remarketing & Push Notifications',
      description: 'Spamming the customer inbox with discount nudges, countdown timers, and desperate cart recovery tricks.',
      metric: 'Churn Rate: 42% Annual',
      vibe: 'Exhausting CAC treadmill with zero loyalty.',
    },
    branding: {
      title: 'Empathic Identity Anchor',
      description: 'The product becomes a badge of honor. Customers defend the brand in public forums and wear its iconography with genuine pride.',
      metric: 'Repeat Purchase: 68% Without Paid Ads',
      vibe: 'Self-sustaining flywheel of evangelists.',
    },
  },
  {
    dimension: '03 // PRICING RESILIENCE',
    marketing: {
      title: 'Race to the Bottom Margin',
      description: 'Forced to match rival discounts, slashing gross margin to defend market share as buyers shop purely on cost.',
      metric: 'Pricing Power: Near Zero',
      vibe: 'Subject to algorithmic ad inflation and price war attrition.',
    },
    branding: {
      title: 'Inelastic Premium Moat',
      description: 'Customers pay a premium willingly because the emotional utility of belonging cannot be substituted by a generic rival.',
      metric: 'Margin Expansion: +35% To +110%',
      vibe: 'Sovereign brand authority insulated from market noise.',
    },
  },
  {
    dimension: '04 // ACQUISITION VECTOR',
    marketing: {
      title: 'Algorithmic Arbitrage',
      description: 'Renting attention from Meta and Google. The moment budget stops flowing, revenue plunges to flatline.',
      metric: 'Blended CAC: Constantly Compounding Upwards',
      vibe: 'Rentier economy; building on rented land.',
    },
    branding: {
      title: 'Peer-to-Peer Storytelling',
      description: 'Word of mouth becomes your primary distributor. When someone asks "why did you choose them?", the buyer tells your story for you.',
      metric: 'Viral Coefficient: 2.4 Organic K-Factor',
      vibe: 'Compound brand equity that appreciates over decades.',
    },
  },
];

export default function TheShiftSection() {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 (100% Marketing) to 100 (100% Branding)
  const [activeDimension, setActiveDimension] = useState(0);

  return (
    <section
      id="the-shift"
      className="relative min-h-screen py-32 sm:py-40 border-b border-[#D1CBD0]/80 bg-canvas overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-[#D1CBD0]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2.5 py-1 bg-cobalt text-canvas font-mono text-[11px] tracking-[0.16em] uppercase font-bold">
                02 // THE COGNITIVE SHIFT
              </span>
              <span className="w-8 h-px bg-[#D1CBD0]" />
              <span className="font-mono text-xs text-stone tracking-[0.14em] uppercase">
                PARADIGM DECONSTRUCTION
              </span>
            </div>
            <h2 className="display-title text-ink leading-[0.95] tracking-[-0.02em]">
              TRANSACTIONAL MARKETING <br />
              <span className="text-stone">VERSUS</span> RELATIONAL BRANDING.
            </h2>
          </div>

          <div className="max-w-[42ch] text-sm sm:text-base text-ink leading-relaxed">
            <p className="font-medium">
              Every buying decision is made in the limbic brain before the rational cortex
              justifies it. If you only market features, you compete on logic. If you build a
              brand, you capture conviction.
            </p>
          </div>
        </div>

        {/* Interactive Interactive Scrub Control */}
        <div className="my-12 p-6 sm:p-8 bg-canvas-muted border border-stone/30 shadow-tactile-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="micro-tag text-stone">INTERACTIVE SPECTRUM SCRUBBER</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
                DIAGNOSTIC: DIAL FROM TRANSIENT TO RELATIONAL
              </h3>
            </div>
            <div className="font-mono text-xs text-cobalt font-bold px-3 py-1 bg-canvas border border-ink/20">
              {sliderPosition < 40
                ? 'CURRENT STATE: TRANSACTIONAL DEPENDENCE'
                : sliderPosition > 70
                ? 'TARGET STATE: RELATIONAL SOVEREIGNTY'
                : 'TRANSITIONAL: RE-ARCHITECTING FOUNDATIONS'}
            </div>
          </div>

          {/* Slider input */}
          <div className="relative py-4">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-full h-3 bg-stone/25 appearance-none cursor-pointer accent-cobalt focus:outline-none"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-stone mt-2">
              <span className={sliderPosition < 50 ? 'text-ink font-bold' : ''}>
                ← 0% MARKETING (PUSH)
              </span>
              <span>50% EQUILIBRIUM</span>
              <span className={sliderPosition >= 50 ? 'text-cobalt font-bold' : ''}>
                100% BRANDING (RESONANCE) →
              </span>
            </div>
          </div>
        </div>

        {/* Dimension Selector Tabs (Editorial Hairline Tabs) */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-stone/30 mb-8 divide-x divide-stone/30">
          {SHIFT_DIMENSIONS.map((dim, idx) => (
            <button
              key={dim.dimension}
              onClick={() => setActiveDimension(idx)}
              className={`p-4 text-left transition-all ${
                activeDimension === idx
                  ? 'bg-ink text-canvas shadow-inner'
                  : 'bg-canvas hover:bg-canvas-muted text-stone hover:text-ink'
              }`}
            >
              <div className="micro-tag text-[9px] opacity-75">{dim.dimension}</div>
              <div className="font-display text-sm sm:text-base font-bold uppercase tracking-tight mt-1 truncate">
                {dim.branding.title.split('&')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Dual Comparison Pane */}
        {(() => {
          const active = SHIFT_DIMENSIONS[activeDimension];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Transactional Marketing (Stressed, Fading) */}
              <motion.div
                key={`mkt-${activeDimension}`}
                initial={{ opacity: 0.7, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-8 sm:p-10 border transition-all ${
                  sliderPosition < 50
                    ? 'border-ink bg-canvas shadow-tactile'
                    : 'border-stone/30 bg-canvas/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-stone/25 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone" />
                    <span className="micro-tag text-stone font-bold">THE OLD MODEL</span>
                  </div>
                  <span className="font-mono text-xs text-stone">[TRANSACTIONAL]</span>
                </div>

                <div className="font-display text-2xl sm:text-3xl text-ink font-bold uppercase mb-4 leading-tight">
                  {active.marketing.title}
                </div>

                <p className="text-stone text-sm sm:text-base leading-relaxed mb-6 max-w-[42ch]">
                  {active.marketing.description}
                </p>

                <div className="p-4 bg-canvas-muted border border-stone/25 mb-6">
                  <div className="micro-tag text-stone text-[9px]">REAL-WORLD IMPACT</div>
                  <div className="font-mono text-sm font-bold text-ink mt-1">
                    {active.marketing.metric}
                  </div>
                </div>

                <div className="text-xs font-mono text-stone italic">
                  Observation: {active.marketing.vibe}
                </div>
              </motion.div>

              {/* Right Column: Relational Branding (Empowered, Elevated) */}
              <motion.div
                key={`brd-${activeDimension}`}
                initial={{ opacity: 0.7, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-8 sm:p-10 border transition-all ${
                  sliderPosition >= 50
                    ? 'border-cobalt bg-canvas shadow-tactile-lg relative overflow-hidden'
                    : 'border-stone/30 bg-canvas/60'
                }`}
              >
                {/* Cobalt Corner Stamp */}
                <div className="absolute top-0 right-0 bg-cobalt text-canvas font-mono text-[9px] px-3 py-1 font-bold">
                  RECOMMENDED ARCHITECTURE
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-cobalt/30 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping" />
                    <span className="micro-tag text-cobalt font-bold">THE TRIPLE MOTIVE SYSTEM</span>
                  </div>
                  <span className="font-mono text-xs text-cobalt font-bold">[RELATIONAL]</span>
                </div>

                <div className="font-display text-2xl sm:text-3xl text-ink font-bold uppercase mb-4 leading-tight">
                  {active.branding.title}
                </div>

                <p className="text-ink text-sm sm:text-base leading-relaxed mb-6 max-w-[42ch]">
                  {active.branding.description}
                </p>

                <div className="p-4 bg-cobalt/10 border border-cobalt/30 mb-6">
                  <div className="micro-tag text-cobalt text-[9px]">MEASURABLE RETURN</div>
                  <div className="font-mono text-sm font-bold text-cobalt mt-1">
                    {active.branding.metric}
                  </div>
                </div>

                <div className="text-xs font-mono text-ink font-medium">
                  Result: {active.branding.vibe}
                </div>
              </motion.div>
            </div>
          );
        })()}

        {/* Editorial Quote Footnote */}
        <div className="mt-16 pt-8 border-t border-stone/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <blockquote className="font-display text-xl sm:text-2xl uppercase tracking-tight text-ink font-bold max-w-[60ch]">
            &ldquo;Nobody buys features when their heart is already committed to a belief.&rdquo;
          </blockquote>
          <div className="font-mono text-xs text-stone tracking-widest whitespace-nowrap">
            — THE TRIPLE MOTIVE MANIFESTO // § 04
          </div>
        </div>
      </div>
    </section>
  );
}
