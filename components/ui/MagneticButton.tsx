'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
}

export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-ink text-canvas hover:bg-cobalt border border-ink shadow-tactile hover:shadow-tactile-lg',
    secondary:
      'bg-cobalt text-canvas hover:bg-ink border border-ink shadow-tactile hover:shadow-tactile-lg',
    outline:
      'bg-transparent text-ink hover:bg-ink hover:text-canvas border border-ink shadow-tactile-sm',
  }[variant];

  const content = (
    <motion.div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
      className="inline-block"
    >
      <div
        className={`relative inline-flex items-center justify-center gap-3 px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer ${variantStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
