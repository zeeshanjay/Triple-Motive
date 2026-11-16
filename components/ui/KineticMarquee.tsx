'use client';

import React, { useEffect, useRef, useState } from 'react';

interface KineticMarqueeProps {
  phrases?: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export default function KineticMarquee({
  phrases = [
    'BRAND STORY PRECEDES BUYING DECISIONS',
    'EMPATHY OVER ALGORITHMIC CAC',
    'RELATIONAL ARCHITECTURE',
    'GUT-LEVEL TRUST IS UN-COMMODITIZABLE',
    'THE TRIPLE MOTIVE PARADIGM',
  ],
  direction = 'left',
}: KineticMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skew, setSkew] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          lastScrollY = currentScrollY;

          // Compute dynamic velocity skew based on scroll delta
          const targetSkew = Math.max(-10, Math.min(10, delta * 0.12));
          setSkew(targetSkew);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-4 border-y border-stone/30 select-none bg-canvas"
      style={{
        transform: `skewX(${skew}deg)`,
        transition: 'transform 0.18s ease-out',
      }}
    >
      <div className="flex w-max items-center whitespace-nowrap animate-marquee">
        {[...phrases, ...phrases].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-5">
            <span className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight font-bold text-ink hover:text-cobalt transition-colors duration-200">
              {phrase}
            </span>
            <span className="inline-block w-2.5 h-2.5 bg-cobalt rotate-45" />
            <span className="micro-tag text-stone font-mono tracking-widest text-[10px]">
              0{((idx % 4) + 1)}
            </span>
            <span className="text-stone/40 font-mono text-sm">//</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
