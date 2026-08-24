"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Environment, ContactShadows, PresentationControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// A beautifully stylized procedural 3D Sofa using drei primitives
function ProceduralSofa({ color = "#d4c5b9" }: { color?: string }) {
  const group = useRef<THREE.Group>(null);
  const material = new THREE.MeshStandardMaterial({ 
    color, 
    roughness: 0.8, 
    metalness: 0.1 
  });
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: "#4a3525", 
    roughness: 0.9, 
    metalness: 0.1 
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Main Seat */}
      <RoundedBox args={[2.2, 0.4, 1.1]} radius={0.1} smoothness={4} position={[0, 0.5, 0]} material={material} castShadow receiveShadow />
      
      {/* Backrest */}
      <RoundedBox args={[2.2, 0.8, 0.3]} radius={0.1} smoothness={4} position={[0, 1.1, -0.4]} material={material} castShadow receiveShadow />
      
      {/* Left Armrest */}
      <RoundedBox args={[0.3, 0.6, 1.1]} radius={0.1} smoothness={4} position={[-1.1, 0.8, 0]} material={material} castShadow receiveShadow />
      
      {/* Right Armrest */}
      <RoundedBox args={[0.3, 0.6, 1.1]} radius={0.1} smoothness={4} position={[1.1, 0.8, 0]} material={material} castShadow receiveShadow />
      
      {/* Pillows */}
      <RoundedBox args={[0.5, 0.4, 0.15]} radius={0.05} smoothness={4} position={[-0.6, 0.8, -0.2]} rotation={[0.1, 0, 0.1]} material={new THREE.MeshStandardMaterial({ color: "#f97316", roughness: 0.9 })} castShadow />
      <RoundedBox args={[0.5, 0.4, 0.15]} radius={0.05} smoothness={4} position={[0.6, 0.8, -0.2]} rotation={[0.1, 0, -0.1]} material={new THREE.MeshStandardMaterial({ color: "#e5e5e5", roughness: 0.9 })} castShadow />

      {/* Legs */}
      <mesh position={[-1.0, 0.15, 0.4]} castShadow material={woodMaterial}>
        <cylinderGeometry args={[0.04, 0.02, 0.3, 16]} />
      </mesh>
      <mesh position={[1.0, 0.15, 0.4]} castShadow material={woodMaterial}>
        <cylinderGeometry args={[0.04, 0.02, 0.3, 16]} />
      </mesh>
      <mesh position={[-1.0, 0.15, -0.4]} castShadow material={woodMaterial}>
        <cylinderGeometry args={[0.04, 0.02, 0.3, 16]} />
      </mesh>
      <mesh position={[1.0, 0.15, -0.4]} castShadow material={woodMaterial}>
        <cylinderGeometry args={[0.04, 0.02, 0.3, 16]} />
      </mesh>
    </group>
  );
}

export default function ProductViewer3D({ color }: { color?: string }) {
  return (
    <div className="w-full h-full relative bg-stone-100 cursor-grab active:cursor-grabbing rounded-xl overflow-hidden">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 45 }}>
        <color attach="background" args={['#f5f5f4']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />
        
        <PresentationControls 
          global 
          zoom={0.8} 
          rotation={[0, -Math.PI / 4, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <ProceduralSofa color={color} />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-stone-600 shadow-sm inline-flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          Drag to Rotate 3D Model
        </span>
      </div>
    </div>
  );
}