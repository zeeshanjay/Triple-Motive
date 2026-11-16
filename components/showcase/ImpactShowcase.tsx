'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CaseStudy {
  id: string;
  index: string;
  client: string;
  sector: string;
  period: string;
  headline: string;
  narrativeChallenge: string;
  relationalSolution: string;
  keyMetrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aetherium',
    index: 'CASE // 01',
    client: 'AETHERIUM LABS',
    sector: 'DEEP TECH / QUANTUM CRYPTOGRAPHY',
    period: '2025 – 2026',
    headline: 'Repositioning Cryptographic Math into Civilizational Sovereignty',
    narrativeChallenge:
      'Aetherium was trapped pitching algorithmic hashing speeds. Enterprise buyers treated them as a commodity vendor, grinding procurement margins by 40%.',
    relationalSolution:
      'We rebuilt their brand around civilizational continuity and digital sovereignty. Instead of selling encryption modules, they became the uncompromised custodians of enterprise survival.',
    keyMetrics: [
      { label: 'ORGANIC INBOUND DEALFLOW', value: '+340%', subtext: 'In Fortune 500 inquiries' },
      { label: 'SERIES B VALUATION', value: '$48M', subtext: 'Oversubscribed in 3 weeks' },
      { label: 'SALES CYCLE COMPRESSION', value: '-62%', subtext: 'From 9 months to 72 days' },
    ],
    testimonial: {
      quote:
        'Triple Motive stripped away our engineering jargon and uncovered our real story. For the first time, CISOs weren’t negotiating prices—they were asking how quickly we could deploy.',
      author: 'Dr. Valerian Cross',
      role: 'CEO & Founder, Aetherium Labs',
    },
    tags: ['Brand Narrative', 'Visual Lexicon', 'Web Experience'],
  },
  {
    id: 'sonder',
    index: 'CASE // 02',
    client: 'SONDER HERITAGE',
    sector: 'LUXURY APPAREL & HEIRLOOM CRAFT',
    period: '2024 – 2025',
    headline: 'From Paid Ad Addiction to a Cult Community of Lifelong Patrons',
    narrativeChallenge:
      'Sonder spent $180,000/month on Meta ads. ROAS dropped below 1.2x as CAC surged. Customers were purely opportunistic discount hunters with 8% repeat rates.',
    relationalSolution:
      'We eliminated seasonal discounts and engineered "The Patron Codex"—a ritualized brand narrative celebrating garment repairability, lineage provenance, and artisan interviews.',
    keyMetrics: [
      { label: 'CUSTOMER LIFETIME VALUE', value: '4.8X', subtext: 'Organic cohort expansion' },
      { label: 'REPEAT ORDER RATE', value: '68%', subtext: 'Achieved with zero paid ads' },
      { label: 'PAID AD SPEND REDUCTION', value: '-85%', subtext: 'Reallocated to net margin' },
    ],
    testimonial: {
      quote:
        'We stopped burning capital on ads that brought customers who didn’t care. Triple Motive built an emotional moat that turned our customers into our most vocal evangelists.',
      author: 'Elena Rostova',
      role: 'Creative Director, Sonder Heritage',
    },
    tags: ['Ecosystem Architecture', 'Editorial Story', 'Direct Commerce'],
  },
  {
    id: 'kestrel',
    index: 'CASE // 03',
    client: 'KESTREL DYNAMICS',
    sector: 'AUTONOMOUS AEROSPACE SYSTEMS',
    period: '2025',
    headline: 'Transforming Drone Fleet Hardware into Unshakeable Defense Trust',
    narrativeChallenge:
      'Competing against multi-billion dollar legacy defense conglomerates with stagnant public perception and bureaucratic distrust.',
    relationalSolution:
      'Engineered an authoritative, minimalist identity and visceral documentary series centering on operator safety, ethical telemetry, and battlefield resilience.',
    keyMetrics: [
      { label: 'PIPELINE CONTRACT VALUE', value: '$120M', subtext: 'Multi-year defense awards' },
      { label: 'NET PROMOTER SCORE', value: '89 NPS', subtext: 'Highest in sector cohort' },
      { label: 'PR & ORGANIC REACH', value: '14M+', subtext: 'Unpaid editorial impressions' },
    ],
    testimonial: {
      quote:
        'The clarity and gravitas Triple Motive brought to Kestrel gave us the sovereign stature needed to win against companies 50 times our size.',
      author: 'Marcus Vance',
      role: 'Chief Technology Officer, Kestrel',
    },
    tags: ['Category Creation', 'Verbal Identity', 'Interactive Flagship'],
  },
];

// Interactive Cursor-Reactive 3D Card
function CursorTiltCard({
  caseStudy,
  isActive,
  onSelect,
}: {
  caseStudy: CaseStudy;
  isActive: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`cursor-pointer border transition-all duration-300 p-8 sm:p-10 select-none ${
        isActive
          ? 'bg-canvas border-ink shadow-tactile-lg relative ring-2 ring-cobalt'
          : 'bg-canvas/70 border-stone/30 hover:border-ink hover:bg-canvas shadow-tactile-sm'
      }`}
    >
      <div style={{ transform: 'translateZ(18px)' }}>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone/20 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-cobalt px-2 py-0.5 bg-cobalt/10 border border-cobalt/20">
              {caseStudy.index}
            </span>
            <span className="micro-tag text-stone">{caseStudy.period}</span>
          </div>
          <span className="font-mono text-xs text-stone tracking-widest uppercase">
            {caseStudy.sector}
          </span>
        </div>

        {/* Client Name & Headline */}
        <h3 className="font-display text-3xl sm:text-4xl uppercase font-bold text-ink tracking-tight mb-3">
          {caseStudy.client}
        </h3>
        <p className="font-sans font-medium text-ink text-base sm:text-lg leading-snug mb-6 max-w-[42ch]">
          {caseStudy.headline}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone/20 mb-6">
          {caseStudy.keyMetrics.map((metric, mIdx) => (
            <div key={mIdx} className="bg-canvas-muted p-3 border border-stone/20">
              <div className="font-display text-2xl sm:text-3xl font-bold text-cobalt">
                {metric.value}
              </div>
              <div className="micro-tag text-stone text-[9px] mt-1 line-clamp-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-stone/15 text-stone text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-ink font-bold flex items-center gap-1 group-hover:text-cobalt">
            {isActive ? '[EXAMINING CASE]' : 'VIEW FULL AUDIT →'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactShowcase() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const activeCase = CASE_STUDIES[activeCaseIndex];

  return (
    <section
      id="impact"
      className="relative py-20 sm:py-28 border-b border-[#D1CBD0]/80 bg-canvas overflow-hidden"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#D1CBD0] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2.5 py-1 bg-cobalt text-canvas font-mono text-[11px] tracking-[0.16em] uppercase font-bold">
                04 // EMPIRICAL EVIDENCE
              </span>
              <span className="w-8 h-px bg-[#D1CBD0]" />
              <span className="font-mono text-xs text-stone tracking-[0.14em] uppercase">
                VERIFIABLE ENTERPRISE GROWTH
              </span>
            </div>
            <h2 className="display-title text-ink leading-[0.95] tracking-[-0.02em]">
              PROVING THE POWER <br />
              OF <span className="text-cobalt">RELATIONAL ARCHITECTURE</span>.
            </h2>
          </div>

          <div className="max-w-[42ch] text-sm sm:text-base text-stone leading-relaxed">
            Brand without measurable business impact is merely decoration. Here is how our
            framework drives hard enterprise valuation, margin expansion, and generational loyalty.
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
          {CASE_STUDIES.map((cs, idx) => (
            <CursorTiltCard
              key={cs.id}
              caseStudy={cs}
              isActive={activeCaseIndex === idx}
              onSelect={() => setActiveCaseIndex(idx)}
            />
          ))}
        </div>

        {/* Selected Case In-Depth Breakdown Drawer */}
        <div className="mt-12 bg-canvas-muted border-2 border-ink p-8 sm:p-12 shadow-tactile-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone/25 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 bg-ink text-canvas">
                CASE DEEP-DIVE
              </span>
              <span className="font-display text-2xl font-bold uppercase text-ink">
                {activeCase.client} // STRATEGIC ANATOMY
              </span>
            </div>
            <span className="font-mono text-xs text-stone">
              AUDITED FINANCIALS & NARRATIVE ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: The Challenge & The Relational Solution */}
            <div>
              <div className="mb-6">
                <div className="micro-tag text-stone mb-2">THE TRANSACTIONAL FRICTION</div>
                <p className="text-stone text-sm sm:text-base leading-relaxed">
                  {activeCase.narrativeChallenge}
                </p>
              </div>

              <div>
                <div className="micro-tag text-cobalt mb-2 font-bold">
                  THE RELATIONAL TRANSFORMATION
                </div>
                <p className="text-ink text-sm sm:text-base font-medium leading-relaxed">
                  {activeCase.relationalSolution}
                </p>
              </div>
            </div>

            {/* Right: Client Testimony & Audit Seal */}
            <div className="flex flex-col justify-between p-6 bg-canvas border border-stone/30">
              <div>
                <div className="micro-tag text-stone mb-4">EXECUTIVE TESTIMONY</div>
                <blockquote className="font-sans text-base sm:text-lg text-ink italic leading-relaxed mb-6">
                  &ldquo;{activeCase.testimonial.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-stone/20 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-bold uppercase text-ink">
                    {activeCase.testimonial.author}
                  </div>
                  <div className="text-xs font-mono text-stone">
                    {activeCase.testimonial.role}
                  </div>
                </div>

                <div className="w-10 h-10 border border-ink flex items-center justify-center font-mono text-[9px] text-ink font-bold shadow-tactile-sm">
                  VERIFIED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
