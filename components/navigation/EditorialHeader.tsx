'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenisScroll } from '../providers/SmoothScrollProvider';

export default function EditorialHeader() {
  const { scrollTo } = useLenisScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [times, setTimes] = useState({ denver: '', nyc: '', ldn: '' });

  // Update atelier clocks (Denver, NYC, London)
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimes({
        denver: now.toLocaleTimeString('en-US', {
          timeZone: 'America/Denver',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        nyc: now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        ldn: now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent background scroll when full-page menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { num: '01', title: 'CORE PHILOSOPHY', target: '#hero', sub: 'THESIS & RELATIONAL ARCHITECTURE' },
    { num: '02', title: 'THE COGNITIVE SHIFT', target: '#the-shift', sub: 'MARKETING VS BRANDING MATRIX' },
    { num: '03', title: 'FOUR PILLARS OF TRUST', target: '#pillars', sub: 'SYSTEMIC METHODOLOGY' },
    { num: '04', title: 'EMPIRICAL IMPACT', target: '#impact', sub: 'AUDITED CASE EVIDENCE' },
    { num: '05', title: 'INITIATE DIALOGUE', target: '#dialogue', sub: 'DIRECT STRATEGIST INBOX' },
  ];

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    setTimeout(() => {
      scrollTo(target, { offset: -20, duration: 1.4 });
      if (target === '#dialogue') {
        window.dispatchEvent(new CustomEvent('focus-dialogue'));
      }
    }, 300);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <>
      {/* Fixed Clean Editorial Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-canvas/90 backdrop-blur-md border-b border-[#D1CBD0]/70 transition-all">
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
          
          {/* Left: Pure Brand Logotype with User Logo Icon */}
          <button
            onClick={() => scrollTo('#hero')}
            className="text-left group flex items-center gap-3.5 focus:outline-none"
          >
            <img
              src="/logo.png"
              alt="Triple Motive Monogram Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase leading-none hover:text-cobalt transition-colors duration-200">
              TRIPLE MOTIVE
            </span>
          </button>

          {/* Right Action Elements: Start Dialogue + Premium 3-Lines Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* High-Contrast Action Button */}
            <button
              onClick={() => {
                scrollTo('#dialogue', { offset: -20, duration: 1.4 });
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('focus-dialogue'));
                }, 800);
              }}
              className="hidden sm:inline-flex px-5 py-2.5 bg-ink text-canvas font-mono text-xs uppercase tracking-widest font-semibold hover:bg-cobalt hover:border-cobalt transition-all duration-200 border border-ink shadow-tactile-sm items-center gap-2"
            >
              <span>START DIALOGUE</span>
              <span className="text-cobalt-light">→</span>
            </button>

            {/* Premium 3-Lines Hamburger Element */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Full Navigation Menu"
              className="p-3 bg-canvas border border-ink shadow-tactile-sm hover:bg-ink hover:text-canvas transition-colors duration-200 flex flex-col justify-center items-center gap-1.5 w-11 h-11 group"
            >
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-200 ${
                  isOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Page Premium Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-canvas text-ink flex flex-col justify-between overflow-y-auto pt-24 pb-12 px-6 sm:px-12 select-none"
          >
            {/* Top Bar inside Menu */}
            <div className="max-w-[1720px] w-full mx-auto flex items-center justify-between pb-6 border-b border-[#D1CBD0]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping" />
                <span className="font-mono text-xs font-bold text-ink tracking-widest uppercase">
                  INDEX // SYSTEM NAVIGATION
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs text-stone hover:text-ink tracking-widest uppercase flex items-center gap-2 group"
              >
                <span>[ESC]</span>
                <span className="group-hover:translate-x-0.5 transition-transform">CLOSE ✕</span>
              </button>
            </div>

            {/* Main Full-Page Menu Grid */}
            <div className="max-w-[1720px] w-full mx-auto my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Massive Editorial Navigation */}
              <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.num}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.4 }}
                    onClick={() => handleNavClick(link.target)}
                    className="text-left group flex flex-col sm:flex-row sm:items-baseline justify-between py-3 border-b border-[#D1CBD0]/60 hover:border-ink transition-colors"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm font-bold text-cobalt tracking-widest">
                        {link.num}
                      </span>
                      <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-ink group-hover:text-cobalt transition-colors duration-200">
                        {link.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-stone group-hover:text-ink tracking-wider uppercase mt-1 sm:mt-0">
                      {link.sub} →
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Right Column: About, Monograph Newsletter & Ateliers */}
              <div className="lg:col-span-5 flex flex-col gap-8 bg-canvas-muted border-2 border-ink p-8 sm:p-10 shadow-tactile-lg">
                
                {/* About Atelier Section */}
                <div>
                  <div className="font-mono text-[10px] text-cobalt tracking-[0.16em] uppercase font-bold mb-2">
                    ABOUT TRIPLE MOTIVE
                  </div>
                  <p className="text-sm sm:text-base text-ink leading-relaxed">
                    We are an independent brand strategy and relational architecture atelier based in Denver, Colorado. We help
                    visionary founders escape the transactional CAC treadmill by engineering
                    deep-seated emotional belief, unassailable pricing power, and generational loyalty.
                  </p>
                </div>

                {/* Private Monograph / Dispatch Subscription */}
                <div className="pt-6 border-t border-[#D1CBD0]">
                  <div className="font-mono text-[10px] text-stone tracking-[0.14em] uppercase font-bold mb-2">
                    PRIVATE BRAND STRATEGY DISPATCH
                  </div>
                  <p className="text-xs text-stone mb-4">
                    Receive our quarterly monographs on relational moats, cultural narrative engineering, and pricing inelasticity.
                  </p>

                  {subscribed ? (
                    <div className="p-4 bg-cobalt text-canvas font-mono text-xs border border-ink">
                      ✓ SUBSCRIBED TO PRIVATE MONOGRAPHS. WELCOME.
                    </div>
                  ) : (
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="founder@company.com"
                        className="flex-1 px-4 py-3 bg-canvas border border-ink text-ink font-mono text-xs focus:outline-none focus:ring-2 focus:ring-cobalt"
                      />
                      <button
                        type="submit"
                        className="px-5 py-3 bg-ink text-canvas font-mono text-xs uppercase tracking-widest font-semibold hover:bg-cobalt transition-colors whitespace-nowrap"
                      >
                        JOIN COHORT →
                      </button>
                    </form>
                  )}
                </div>

                {/* Active Global Ateliers with Denver, Colorado */}
                <div className="pt-6 border-t border-[#D1CBD0]">
                  <div className="font-mono text-[10px] text-stone tracking-[0.14em] uppercase font-bold mb-3">
                    LOCAL TELEMETRY
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div>
                      <div className="text-stone text-[10px]">DENVER // HQ</div>
                      <div className="font-bold text-ink">{times.denver || '10:23'}</div>
                    </div>
                    <div>
                      <div className="text-stone text-[10px]">NYC // SOHO</div>
                      <div className="font-bold text-ink">{times.nyc || '12:23'}</div>
                    </div>
                    <div>
                      <div className="text-stone text-[10px]">LDN // MAYFAIR</div>
                      <div className="font-bold text-ink">{times.ldn || '17:23'}</div>
                    </div>
                  </div>
                </div>

                {/* Direct Communications with Lisa Email & Phone */}
                <div className="pt-4 border-t border-[#D1CBD0] text-xs font-mono text-stone space-y-1">
                  <div>Direct Inquiries: <a href="mailto:lisa@triplemotive.net" className="text-cobalt font-medium hover:underline">lisa@triplemotive.net</a></div>
                  <div>Direct Phone: <a href="tel:+13032422757" className="text-ink font-medium hover:text-cobalt">+1 (303) 242-2757</a></div>
                </div>

              </div>
            </div>

            {/* Bottom Footer inside Menu */}
            <div className="max-w-[1720px] w-full mx-auto pt-6 border-t border-[#D1CBD0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone">
              <div>
                © {new Date().getFullYear()} TRIPLE MOTIVE. RELATIONAL OVER TRANSACTIONAL.
              </div>
              <div className="flex items-center gap-4">
                <span>DENVER</span>
                <span>•</span>
                <span>NEW YORK</span>
                <span>•</span>
                <span>LONDON</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
