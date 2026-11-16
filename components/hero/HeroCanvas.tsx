'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import SculpturalTotem from './SculpturalTotem';

interface HeroCanvasProps {
  customGlbUrl?: string;
}

export default function HeroCanvas({ customGlbUrl }: HeroCanvasProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[620px] xl:h-[660px] bg-transparent select-none overflow-visible">
      {/* 100% Transparent 3D Architectural Scene with Logarithmic Depth Buffer */}
      {isMounted && (
        <Canvas
          shadows
          camera={{ position: [0, 0.15, 4.8], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            logarithmicDepthBuffer: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing !bg-transparent"
        >
          {/* Studio Illumination */}
          <ambientLight intensity={1.0} />
          
          {/* Main Architectural Specular Key Light */}
          <directionalLight
            position={[5, 8, 4]}
            intensity={2.2}
            color="#FFFDF8"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={10}
            shadow-bias={-0.0002}
          />
          
          {/* Cobalt Rim Accent Light */}
          <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#1D4ED8" />

          {/* Warm Diffused Fill */}
          <directionalLight position={[0, -3, 3]} intensity={0.5} color="#E8E4DC" />

          {/* Precision Top Highlight */}
          <pointLight position={[0, 3, 2]} intensity={0.6} color="#FFFFFF" />

          {/* Soft Museum Floor Contact Shadow placed safely below */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.25}
            scale={5.5}
            blur={2.4}
            far={3.0}
            color="#1C1A18"
          />

          <Suspense fallback={null}>
            <SculpturalTotem mouse={mouse} customGlbUrl={customGlbUrl} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
