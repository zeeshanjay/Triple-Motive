'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  corePhilosophy: string;
  deliverables: string[];
  diagnosticQuery: string;
  strategicOutcome: string;
  svgIcon: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    id: 'story-empathy',
    number: '01',
    title: 'Brand Story & Empathy',
    subtitle: 'THE EMOTIONAL KINETIC ENGINE',
    corePhilosophy:
      'We deconstruct your existential "why" down to its foundational human resonance. By diagnosing your audience\'s unvoiced anxieties and aspirations, we forge an authentic narrative mythos that transforms casual onlookers into devoted brand disciples.',
    deliverables: [
      'Foundational Brand Mythos & Positioning Thesis',
      'Empathic Audience Persona Architecture',
      'Brand Origin & Founder Narrative Playbook',
      'Value Proposition & Belief Codex',
    ],
    diagnosticQuery: 'Why would someone care if your company ceased to exist tomorrow morning?',
    strategicOutcome: '3.8x lift in organic brand recall and instant visceral trust upon first touchpoint.',
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 stroke-current stroke-[1.5]">
        <circle cx="24" cy="24" r="20" strokeDasharray="3 3" />
        <path d="M16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <line x1="24" y1="4" x2="24" y2="8" />
        <line x1="24" y1="40" x2="24" y2="44" />
      </svg>
    ),
  },
  {
    id: 'visual-verbal',
    number: '02',
    title: 'Visual & Verbal Identity',
    subtitle: 'THE SENSORY & LINGUISTIC LEXICON',
    corePhilosophy:
      'A great brand possesses an unmistakable visual silhouette and a distinctive voice. We craft bespoke typography hierarchies, physical color palettes, and editorial guidelines that command immediate respect across every physical and digital surface.',
    deliverables: [
      'Comprehensive Design Token & Type System',
      'Verbal Tone of Voice & Lexicon Manual',
      'Art Direction, Imagery & Spatial Motion Guidelines',
      'Tactile Packaging & Collateral Standards',
    ],
    diagnosticQuery: 'If we stripped away your logo from your website, would anyone recognize your voice?',
    strategicOutcome: 'Unmistakable sovereign aesthetic that renders commoditized imitators instantly obvious.',
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 stroke-current stroke-[1.5]">
        <rect x="8" y="8" width="32" height="32" rx="2" />
        <line x1="8" y1="20" x2="40" y2="20" />
        <line x1="20" y1="20" x2="20" y2="40" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
        <path d="M26 28L34 36M34 28L26 36" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'social-ecosystem',
    number: '03',
    title: 'Social Ecosystem & Engagement',
    subtitle: 'THE RELATIONAL CULTURAL MOAT',
    corePhilosophy:
      'True brand power is conversational, not broadcast. We engineer multi-channel social ecosystems, creator alliances, and community rituals where your customers champion your narrative in peer-to-peer dialogues across X, LinkedIn, and private channels.',
    deliverables: [
      'Social Thought Leadership & Editorial Architecture',
      'Creator Alliances & Cultural Seeding Strategy',
      'Community Rituals & Private Salon Programming',
      'Organic Amplification & Content Sprints',
    ],
    diagnosticQuery: 'Are you buying empty impressions, or are people tattooing your ideas onto their own work?',
    strategicOutcome: 'Decentralized organic word-of-mouth engine delivering negative blended CAC growth.',
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 stroke-current stroke-[1.5]">
        <circle cx="16" cy="16" r="6" />
        <circle cx="32" cy="16" r="6" />
        <circle cx="24" cy="32" r="6" />
        <line x1="20" y1="18" x2="28" y2="18" strokeDasharray="2 2" />
        <line x1="18" y1="21" x2="22" y2="27" />
        <line x1="30" y1="21" x2="26" y2="27" />
      </svg>
    ),
  },
  {
    id: 'digital-experience',
    number: '04',
    title: 'Digital Experience (Web/SEO)',
    subtitle: 'THE TACTILE INTERFACE & CONVERSION',
    corePhilosophy:
      'The web is your flagship digital flagship. We design and build visceral, ultra-fast, bespoke interactive experiences that marry editorial beauty with algorithmic semantic search optimization, turning curious explorers into high-conviction partners.',
    deliverables: [
      'Bespoke Interactive Next.js Architecture',
      'Real-Time 3D & Spatial Shaders (R3F/WebGL)',
      'Algorithmic Semantic SEO & Authority Topic Clusters',
      'High-Conversion Frictionless UX Engineering',
    ],
    diagnosticQuery: 'Does your web presence feel like a generic SaaS template or an architectural monument?',
    strategicOutcome: 'Sub-second page speeds, 99 Lighthouse performance, and 4.2x organic search compounding.',
    svgIcon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 stroke-current stroke-[1.5]">
        <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" />
        <polyline points="6,14 24,24 42,14" />
        <line x1="24" y1="24" x2="24" y2="44" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function PillarsSection() {
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0);
  const activePillar = PILLARS[selectedPillarIndex];

  return (
    <section
      id="pillars"
      className="relative min-h-screen py-32 sm:py-40 border-b border-[#D1CBD0]/80 bg-canvas overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="pb-16 border-b border-[#D1CBD0]">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 bg-ink text-canvas font-mono text-[11px] tracking-[0.16em] uppercase font-bold">
              03 // METHODOLOGY
            </span>
            <span className="w-8 h-px bg-[#D1CBD0]" />
            <span className="font-mono text-xs text-stone tracking-[0.14em] uppercase">
              THE 4 PILLARS OF BRAND TRUST
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="display-title text-ink leading-[0.95] tracking-[-0.02em]">
              FOUR PILLARS OF <br />
              <span className="text-cobalt">UNASSAILABLE</span> BRAND TRUST.
            </h2>
            <div className="max-w-[42ch] text-sm sm:text-base text-stone leading-relaxed">
              Trust is not created by an isolated advertisement. It is the cumulative sensory
              result of four tightly synchronized pillars working in absolute harmony.
            </div>
          </div>
        </div>

        {/* Main Workstation Layout: Left Pillars Index & Right Interactive Blueprint Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Left Column: Asymmetrical Pillar Switchers */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PILLARS.map((pillar, idx) => {
              const isSelected = selectedPillarIndex === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarIndex(idx)}
                  className={`text-left p-6 sm:p-7 border transition-all duration-200 relative group ${
                    isSelected
                      ? 'border-ink bg-canvas shadow-tactile'
                      : 'border-stone/25 bg-canvas/40 hover:bg-canvas-muted hover:border-stone'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cobalt" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 ${
                          isSelected ? 'bg-cobalt text-canvas' : 'bg-stone/20 text-stone'
                        }`}
                      >
                        PILLAR {pillar.number}
                      </span>
                      <span className="micro-tag text-[9px] text-stone">
                        {pillar.subtitle.split(' ')[0]}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-mono transition-transform duration-200 ${
                        isSelected ? 'translate-x-1 text-cobalt font-bold' : 'text-stone group-hover:text-ink'
                      }`}
                    >
                      {isSelected ? '[ACTIVE]' : 'SELECT →'}
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl uppercase font-bold tracking-tight text-ink mt-3">
                    {pillar.title}
                  </h3>

                  <div className="text-xs text-stone font-mono mt-1 tracking-wider uppercase">
                    {pillar.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Blueprint Deep-Dive Terminal */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-canvas border-2 border-ink p-8 sm:p-12 shadow-tactile-lg relative"
              >
                {/* Blueprint Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone/25 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-cobalt">
                      {activePillar.svgIcon}
                    </div>
                    <div>
                      <div className="micro-tag text-stone">ARCHITECTURAL BLUEPRINT // {activePillar.number}</div>
                      <div className="font-display text-2xl sm:text-3xl uppercase font-bold text-ink">
                        {activePillar.title}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-cobalt font-bold px-3 py-1 bg-cobalt/10 border border-cobalt/30">
                    DIAGNOSTIC ACTIVE
                  </div>
                </div>

                {/* Core Philosophy Paragraph */}
                <div className="mb-8">
                  <div className="micro-tag text-stone mb-2">SYSTEM THESIS</div>
                  <p className="text-base sm:text-lg text-ink leading-relaxed max-w-[46ch]">
                    {activePillar.corePhilosophy}
                  </p>
                </div>

                {/* Deliverables Grid */}
                <div className="mb-8">
                  <div className="micro-tag text-stone mb-3">TANGIBLE SPECIFICATIONS & DELIVERABLES</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-3 bg-canvas-muted border border-stone/25 flex items-start gap-2.5"
                      >
                        <span className="font-mono text-xs text-cobalt font-bold mt-0.5">
                          0{dIdx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-ink">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Acid Test Box */}
                <div className="p-5 bg-ink text-canvas border border-ink mb-6 shadow-tactile-sm">
                  <div className="micro-tag text-cobalt-light text-[9px] mb-1 font-bold">
                    THE TRIPLE MOTIVE ACID TEST
                  </div>
                  <div className="font-display text-lg sm:text-xl uppercase tracking-tight font-bold text-canvas mb-2">
                    &ldquo;{activePillar.diagnosticQuery}&rdquo;
                  </div>
                  <div className="text-xs text-stone-light font-mono">
                    If this question provokes hesitation, your brand is vulnerable to commoditization.
                  </div>
                </div>

                {/* Strategic Outcome */}
                <div className="pt-4 border-t border-stone/25 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone">EXPECTED ENTERPRISE RESULT:</span>
                  <span className="font-bold text-cobalt text-right">{activePillar.strategicOutcome}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
