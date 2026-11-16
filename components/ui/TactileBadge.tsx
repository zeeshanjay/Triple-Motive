'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TactileBadgeProps {
  label: string;
  sublabel?: string;
  variant?: 'cobalt' | 'ink' | 'stone';
  className?: string;
}

export default function TactileBadge({
  label,
  sublabel = 'AUTHENTICATED EMBLEM',
  variant = 'cobalt',
  className = '',
}: TactileBadgeProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['18deg', '-18deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-18deg', '18deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const colorStyles = {
    cobalt: 'bg-cobalt text-canvas border-ink shadow-tactile',
    ink: 'bg-ink text-canvas border-ink shadow-cobalt-pop',
    stone: 'bg-canvas-muted text-ink border-ink shadow-tactile',
  }[variant];

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={{ left: -50, right: 50, top: -40, bottom: 40 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.08, cursor: 'grabbing', zIndex: 60 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`cursor-grab select-none border-2 p-3.5 inline-block transition-shadow duration-200 ${colorStyles} ${className}`}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">
            {sublabel}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-canvas animate-pulse" />
        </div>
        <div className="font-display text-lg uppercase tracking-tight font-bold leading-none mt-1">
          {label}
        </div>
        <div className="flex items-center justify-between text-[8px] font-mono opacity-70 mt-1 pt-1 border-t border-current/20">
          <span>DRAG ME</span>
          <span>// 3D TILT</span>
        </div>
      </div>
    </motion.div>
  );
}
