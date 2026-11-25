'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import SculpturalTotem from './SculpturalTotem';

interface HeroCanvasProps {
  customGlbUrl?: string;
}

// Check if WebGL context can actually be created on the user's browser/hardware
function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl') ||
      canvas.getContext('webgl2');
    return !!gl;
  } catch {
    return false;
  }
}

// Robust Error Boundary to catch any WebGL context creation failure and prevent page crashes
class WebGLErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL context creation bypassed gracefully:', error?.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Premium CSS 3D-tilt Fallback Emblem for environments where WebGL is disabled
function FallbackMonumentEmblem({ mouse }: { mouse: { x: number; y: number } }) {
  const rotateX = -mouse.y * 14;
  const rotateY = mouse.x * 18;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none pointer-events-none">
      <div
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.95)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative flex items-center justify-center p-8"
      >
        {/* Ambient back aura */}
        <div className="absolute w-64 h-64 rounded-full bg-cobalt/10 blur-3xl -z-10" />

        {/* Monogram emblem */}
        <img
          src="/logo.png"
          alt="Triple Motive Emblem"
          className="w-56 h-56 sm:w-64 sm:h-64 object-contain drop-shadow-[0_25px_35px_rgba(17,17,17,0.18)]"
        />

        {/* Soft floor shadow */}
        <div className="absolute -bottom-6 w-48 h-6 bg-black/15 blur-lg rounded-full" />
      </div>
    </div>
  );
}

export default function HeroCanvas({ customGlbUrl }: HeroCanvasProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setWebglSupported(checkWebGLSupport());

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fallbackUI = <FallbackMonumentEmblem mouse={mouse} />;

  if (!isMounted) {
    return (
      <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[620px] xl:h-[660px] bg-transparent select-none overflow-visible" />
    );
  }

  // If WebGL is not supported on this browser/GPU, render the interactive 3D-tilt emblem directly
  if (!webglSupported) {
    return (
      <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[620px] xl:h-[660px] bg-transparent select-none overflow-visible">
        {fallbackUI}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[620px] xl:h-[660px] bg-transparent select-none overflow-visible">
      <WebGLErrorBoundary fallback={fallbackUI}>
        <Canvas
          shadows
          camera={{ position: [0, 0.15, 4.8], fov: 40 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing !bg-transparent"
        >
          <ambientLight intensity={1.0} />
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
          <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#1D4ED8" />
          <directionalLight position={[0, -3, 3]} intensity={0.5} color="#E8E4DC" />
          <pointLight position={[0, 3, 2]} intensity={0.6} color="#FFFFFF" />

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
      </WebGLErrorBoundary>
    </div>
  );
}
