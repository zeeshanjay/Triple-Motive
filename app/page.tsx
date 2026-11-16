'use client';

import React from 'react';
import EditorialHeader from '@/components/navigation/EditorialHeader';
import HeroSection from '@/components/hero/HeroSection';
import KineticMarquee from '@/components/ui/KineticMarquee';
import TheShiftSection from '@/components/narrative/TheShiftSection';
import PillarsSection from '@/components/pillars/PillarsSection';
import ImpactShowcase from '@/components/showcase/ImpactShowcase';
import ConversationFooter from '@/components/footer/ConversationFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink relative">
      {/* Top Editorial Navigation */}
      <EditorialHeader />

      {/* 01: Hero with Clean Typography & Pristine 3D Minimal Sculpture */}
      <HeroSection />

      {/* Kinetic Velocity Marquee Banner */}
      <KineticMarquee
        phrases={[
          'BRAND STORY PRECEDES BUYING DECISIONS',
          'EMPATHY OVER ALGORITHMIC CAC',
          'RELATIONAL ARCHITECTURE',
          'GUT-LEVEL TRUST IS UN-COMMODITIZABLE',
          'NOT TRANSACTIONAL MARKETING, BUT RELATIONAL BELIEF',
        ]}
      />

      {/* 02: The Shift (Marketing vs. Branding Interactive Matrix) */}
      <TheShiftSection />

      {/* Secondary Kinetic Intermission */}
      <KineticMarquee
        direction="right"
        phrases={[
          '01 BRAND STORY & EMPATHY',
          '02 VISUAL & VERBAL IDENTITY',
          '03 SOCIAL ECOSYSTEM & MOAT',
          '04 DIGITAL EXPERIENCE & CONVERSION',
        ]}
      />

      {/* 03: The 4 Pillars of Brand Trust (Interactive Methodology Terminal) */}
      <PillarsSection />

      {/* 04: Interactive Case / Impact Showcase (3D Cursor Tilt Cards & Verified Returns) */}
      <ImpactShowcase />

      {/* 05: Social-Optimized Footer & High-Trust Dialogue Conversion */}
      <ConversationFooter />
    </main>
  );
}
