'use client';

import React, { useState, useEffect, useRef } from 'react';
import MagneticButton from '../ui/MagneticButton';
import TactileBadge from '../ui/TactileBadge';

export default function ConversationFooter() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [times, setTimes] = useState({ denver: '', nyc: '', ldn: '' });
  const [isHighlighted, setIsHighlighted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Listen for smooth scroll glide trigger from header action button
  useEffect(() => {
    const handleFocusTrigger = () => {
      setIsHighlighted(true);
      nameInputRef.current?.focus();
      const timer = setTimeout(() => setIsHighlighted(false), 3500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('focus-dialogue', handleFocusTrigger);
    return () => window.removeEventListener('focus-dialogue', handleFocusTrigger);
  }, []);

  // Update live clocks
  useEffect(() => {
    const updateClocks = () => {
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
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSubmitError('Please provide your name and direct email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register inquiry.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Transmission error. Please email lisa@triplemotive.net directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="dialogue"
      className="relative bg-canvas border-t-2 border-ink pt-20 sm:pt-28 pb-20 sm:pb-24 overflow-hidden scroll-mt-12"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12">
        {/* Section Header with Strict Overline Spacing */}
        <div className="pb-12 border-b border-[#D1CBD0]/80 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col">
            {/* Overline Mini-Heading */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2.5 py-1 bg-ink text-canvas font-mono text-[11px] tracking-[0.16em] uppercase font-bold">
                05 // INITIATE DIALOGUE
              </span>
              <span className="w-8 h-px bg-[#D1CBD0]" />
              <span className="font-mono text-xs text-stone tracking-[0.14em] uppercase">
                DIRECT STRATEGIST INTAKE
              </span>
            </div>

            {/* Main Display Headline */}
            <h2 className="display-headline text-ink leading-[0.92] tracking-[-0.02em]">
              LET&apos;S TALK ABOUT <br />
              YOUR <span className="text-cobalt">BRAND STORY</span>.
            </h2>
          </div>

          <div className="max-w-[42ch] text-base sm:text-lg text-ink/80 leading-relaxed font-normal">
            We don&apos;t employ account executives or use aggressive closing decks. We begin with a
            rigorous, confidential consultation to evaluate fit and diagnose your strategic friction.
          </div>
        </div>

        {/* Elite Minimalist Contact Grid */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bespoke Editorial Inquiry Form */}
          <div
            ref={terminalRef}
            className={`lg:col-span-7 bg-canvas-muted border-2 border-ink p-8 sm:p-12 transition-all duration-500 relative ${
              isHighlighted
                ? 'ring-4 ring-cobalt ring-offset-4 ring-offset-canvas shadow-tactile-lg shadow-cobalt/20'
                : 'shadow-tactile-lg'
            }`}
          >
            {/* Form Top Micro Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#D1CBD0] mb-8">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping" />
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                  CONFIDENTIAL INQUIRY DESK
                </span>
              </div>
              <span className="micro-tag text-stone">SUPABASE ENCRYPTED</span>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-cobalt text-canvas border-2 border-ink shadow-tactile animate-fade-in">
                <div className="font-display text-3xl sm:text-4xl font-bold uppercase mb-3">
                  INQUIRY REGISTERED
                </div>
                <p className="text-base font-sans mb-4 text-canvas/95 leading-relaxed">
                  Thank you, {formData.fullName}. Your brief has been securely logged into our atelier database.
                </p>
                <div className="text-xs font-mono opacity-90 pt-3 border-t border-canvas/20">
                  Lisa and our managing partners will review your brand context and reach out via {formData.email} within 24 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* 2-Column Inputs for Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-2">
                      01 // YOUR NAME <span className="text-cobalt">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-3.5 bg-canvas border border-ink text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cobalt placeholder:text-stone/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-2">
                      02 // COMPANY / VENTURE
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Aether Dynamics"
                      className="w-full px-4 py-3.5 bg-canvas border border-ink text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cobalt placeholder:text-stone/40"
                    />
                  </div>
                </div>

                {/* 2-Column Inputs for Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-2">
                      03 // WORK EMAIL <span className="text-cobalt">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eleanor@aether.com"
                      className="w-full px-4 py-3.5 bg-canvas border border-ink text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cobalt placeholder:text-stone/40"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-2">
                      04 // PHONE (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (303) 000-0000"
                      className="w-full px-4 py-3.5 bg-canvas border border-ink text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cobalt placeholder:text-stone/40"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-stone font-bold mb-2">
                    05 // BRAND AMBITION & CONTEXT
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your current strategic inflection point, category repositioning, or brand timeline..."
                    className="w-full px-4 py-3.5 bg-canvas border border-ink text-ink font-sans text-sm focus:outline-none focus:ring-2 focus:ring-cobalt placeholder:text-stone/40 resize-none leading-relaxed"
                  />
                </div>

                {submitError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-xs font-mono">
                    {submitError}
                  </div>
                )}

                {/* Submit Row */}
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <MagneticButton
                    variant="primary"
                    className="py-4 px-8 text-xs w-full sm:w-auto"
                  >
                    {isSubmitting ? 'TRANSMITTING INQUIRY...' : 'SEND CONFIDENTIAL INQUIRY →'}
                  </MagneticButton>

                  <span className="font-mono text-[10px] text-stone">
                    • ZERO SALES PITCHES • DIRECT STRATEGIST REVIEW
                  </span>
                </div>

              </form>
            )}

            {/* Bottom Non-Disclosure Note */}
            <div className="mt-8 pt-6 border-t border-[#D1CBD0]/60 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-stone">
              <span>• STRICT NON-DISCLOSURE PLEDGE</span>
              <span>• PERSISTED IN SUPABASE DATABASE</span>
              <span>• 24-HOUR STRATEGIC TURNAROUND</span>
            </div>
          </div>

          {/* Right Column: Studio Coordinates, Live Clocks & Direct Lisa Contact */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Global Studio Live Clocks with Denver Colorado */}
            <div className="bg-canvas border-2 border-ink p-6 sm:p-8 shadow-tactile-sm">
              <div className="micro-tag text-stone mb-4">ACTIVE ATELIERS & LOCAL TELEMETRY</div>
              <div className="grid grid-cols-3 gap-3 border-t border-[#D1CBD0] pt-5">
                <div>
                  <div className="text-[10px] font-mono text-stone">DENVER // HQ</div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                    {times.denver || '10:23'}
                  </div>
                  <div className="text-[9px] font-mono text-cobalt font-semibold mt-0.5">
                    COLORADO
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-stone">NYC // SOHO</div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                    {times.nyc || '12:23'}
                  </div>
                  <div className="text-[9px] font-mono text-stone mt-0.5">
                    EAST COAST
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-stone">LDN // MAYFAIR</div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                    {times.ldn || '17:23'}
                  </div>
                  <div className="text-[9px] font-mono text-stone mt-0.5">
                    STRATEGY HUB
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Tactile Badge */}
            <div className="flex justify-start">
              <TactileBadge
                label="NO TRANSACTIONAL SLOP"
                sublabel="TRIPLE MOTIVE PHILOSOPHY"
                variant="ink"
              />
            </div>

            {/* Studio Contact Metadata with Lisa Direct Credentials */}
            <div className="bg-canvas-muted border border-[#D1CBD0] p-6 sm:p-8 text-xs font-mono text-stone space-y-3">
              <div className="text-ink font-bold uppercase tracking-wider">DIRECT COMMUNICATIONS:</div>
              <div>Inquiries: <a href="mailto:lisa@triplemotive.net" className="text-cobalt font-semibold select-all hover:underline">lisa@triplemotive.net</a></div>
              <div>Direct Phone: <a href="tel:+13032422757" className="text-ink font-semibold select-all hover:text-cobalt">+1 (303) 242-2757</a></div>
              <div>Headquarters: <span className="text-stone">Denver, Colorado &middot; New York &middot; London</span></div>
              <div className="pt-2 text-[10px] text-stone/80">
                All communications are protected under our mutual non-disclosure covenant.
              </div>
            </div>

          </div>
        </div>

        {/* Editorial Colophon */}
        <div className="pt-12 border-t border-[#D1CBD0] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-stone">
          <div>
            © {new Date().getFullYear()} TRIPLE MOTIVE STRATEGY ATELIER. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:lisa@triplemotive.net" className="hover:text-ink transition-colors">
              lisa@triplemotive.net
            </a>
            <span>•</span>
            <a href="tel:+13032422757" className="hover:text-ink transition-colors">
              +1 (303) 242-2757
            </a>
            <span>•</span>
            <span className="text-cobalt font-semibold">DENVER &middot; NYC &middot; LDN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
