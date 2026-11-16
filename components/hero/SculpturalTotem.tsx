'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, useGLTF } from '@react-three/drei';

interface SculpturalTotemProps {
  mouse: { x: number; y: number };
  customGlbUrl?: string;
}

// Bespoke 3D Architectural Brand Monument for Triple Motive
// Zero flickering / zero Z-fighting: strictly calibrated depth layering, logarithmic precision, and museum lighting
export function ArchitecturalBrandMonument({
  mouse,
}: {
  mouse: { x: number; y: number };
}) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Material 1: Precision Brushed Dark Obsidian Titanium (with polygonOffset to prevent any z-fighting)
  const obsidianTitaniumMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#141312'),
        roughness: 0.22,
        metalness: 0.88,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        reflectivity: 0.9,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
    []
  );

  // Material 2: Electric Cobalt Anodized Aerospace Satin
  const cobaltSatinMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1D4ED8'),
        emissive: new THREE.Color('#0A2268'),
        emissiveIntensity: 0.25,
        roughness: 0.18,
        metalness: 0.82,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  // Material 3: Polished Chrome Accent Jewel
  const chromeAccentMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#F0ECE2'),
        roughness: 0.08,
        metalness: 0.96,
        clearcoat: 1.0,
      }),
    []
  );

  // Material 4: Floating Muted Steel Ring
  const ringMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#C8C4BC'),
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 0.7,
      }),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (rootGroupRef.current) {
      // Smooth, serene weighted cursor parallax tilt with continuous idle precession
      const targetRotY = mouse.x * 0.4 + Math.sin(time * 0.2) * 0.1;
      const targetRotX = -mouse.y * 0.3 + 0.08 + Math.cos(time * 0.18) * 0.05;
      const targetRotZ = mouse.x * 0.08;

      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        3.0,
        delta
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        3.0,
        delta
      );
      rootGroupRef.current.rotation.z = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.z,
        targetRotZ,
        2.5,
        delta
      );
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.08;
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, 0.25, 0]} scale={[0.85, 0.85, 0.85]}>
      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.15}>
        
        {/* Layer 1 (Z = 0): The Dark Obsidian Architectural "T" Frame */}
        <group position={[0, 0, 0]}>
          {/* Top Horizontal Header Beam (T Crossbar) */}
          <RoundedBox
            args={[2.5, 0.3, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[0, 1.2, 0]}
            material={obsidianTitaniumMat}
            castShadow
            receiveShadow
          />

          {/* Central Vertical Obelisk (T Central Stem) */}
          <RoundedBox
            args={[0.32, 2.2, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[0, 0.1, 0]}
            material={obsidianTitaniumMat}
            castShadow
            receiveShadow
          />

          {/* Left Outer Structural Pillar */}
          <RoundedBox
            args={[0.26, 1.35, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[-1.12, -0.05, 0]}
            material={obsidianTitaniumMat}
            castShadow
            receiveShadow
          />

          {/* Right Outer Structural Pillar */}
          <RoundedBox
            args={[0.26, 1.35, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[1.12, -0.05, 0]}
            material={obsidianTitaniumMat}
            castShadow
            receiveShadow
          />

          {/* Outer Bottom Connecting Plinths */}
          <RoundedBox
            args={[0.75, 0.24, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[-0.82, -0.6, 0]}
            material={obsidianTitaniumMat}
            castShadow
            receiveShadow
          />
          <RoundedBox
            args={[0.75, 0.24, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[0.82, -0.6, 0]}
            material={obsidianTitaniumMat}
            castShadow
            receiveShadow
          />
        </group>

        {/* Layer 2 (Z = 0.20): The Interlocking Electric Cobalt "V / M" Chevron Blades */}
        <group position={[0, 0, 0.2]}>
          {/* Left Diagonal Chevron Wing */}
          <RoundedBox
            args={[0.3, 1.55, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[-0.44, 0.24, 0]}
            rotation={[0, 0, -Math.PI / 5.2]}
            material={cobaltSatinMat}
            castShadow
            receiveShadow
          />

          {/* Right Diagonal Chevron Wing */}
          <RoundedBox
            args={[0.3, 1.55, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[0.44, 0.24, 0]}
            rotation={[0, 0, Math.PI / 5.2]}
            material={cobaltSatinMat}
            castShadow
            receiveShadow
          />

          {/* Left Descending Cobalt Stanchion */}
          <RoundedBox
            args={[0.3, 1.05, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[-0.84, -0.42, 0]}
            material={cobaltSatinMat}
            castShadow
            receiveShadow
          />

          {/* Right Descending Cobalt Stanchion */}
          <RoundedBox
            args={[0.3, 1.05, 0.24]}
            radius={0.03}
            smoothness={4}
            position={[0.84, -0.42, 0]}
            material={cobaltSatinMat}
            castShadow
            receiveShadow
          />

          {/* Precision Center Diamond Jewel Node (Z = 0.14 relative to cobalt) */}
          <mesh position={[0, 0.2, 0.14]} material={chromeAccentMat} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
          </mesh>
        </group>

        {/* Layer 3 (Z = -0.18): Graceful Background Orbital Ring (Behind the Monolith) */}
        <group ref={ringRef} position={[0, 0.05, -0.18]} rotation={[Math.PI / 2.5, 0, 0]}>
          <mesh material={ringMat} castShadow receiveShadow>
            <torusGeometry args={[1.75, 0.032, 16, 80]} />
          </mesh>
        </group>

      </Float>
    </group>
  );
}

// Drop-in GLB Model Loader
function CustomGlbModel({ url, mouse }: { url: string; mouse: { x: number; y: number } }) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        mouse.x * 0.5,
        3.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouse.y * 0.35,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.25, 0]} dispose={null}>
      <primitive object={gltf.scene} scale={1.2} />
    </group>
  );
}

export default function SculpturalTotem(props: SculpturalTotemProps) {
  if (props.customGlbUrl) {
    return <CustomGlbModel url={props.customGlbUrl} mouse={props.mouse} />;
  }

  return <ArchitecturalBrandMonument mouse={props.mouse} />;
}
