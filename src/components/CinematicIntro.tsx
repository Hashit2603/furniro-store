"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function LuxuriousDoor({ isLeft }: { isLeft: boolean }) {
  const doorMaterial = new THREE.MeshStandardMaterial({
    color: "#111111",
    roughness: 0.1,
    metalness: 0.6,
  });
  const panelMaterial = new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    roughness: 0.3,
    metalness: 0.3,
  });
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: "#d4af37",
    roughness: 0.2,
    metalness: 1.0,
  });

  const signX = isLeft ? 1 : -1;

  return (
    <group>
      <mesh position={[signX * 1.25, 3.5, 0]} castShadow receiveShadow material={doorMaterial}>
        <boxGeometry args={[2.5, 9, 0.2]} />
      </mesh>
      <mesh position={[signX * 1.25, 6, 0.11]} castShadow receiveShadow material={panelMaterial}>
        <boxGeometry args={[1.8, 3.5, 0.05]} />
      </mesh>
      <mesh position={[signX * 1.25, 1.5, 0.11]} castShadow receiveShadow material={panelMaterial}>
        <boxGeometry args={[1.8, 4, 0.05]} />
      </mesh>
      <mesh position={[signX * 2.2, 3.5, 0.2]} castShadow material={handleMaterial}>
        <cylinderGeometry args={[0.015, 0.015, 2.5, 16]} />
      </mesh>
      <mesh position={[signX * 2.2, 4.6, 0.15]} castShadow material={handleMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 16]} />
      </mesh>
      <mesh position={[signX * 2.2, 2.4, 0.15]} castShadow material={handleMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 16]} />
      </mesh>
    </group>
  );
}

function DoorScene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const lightRevealRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!cameraRef.current || !leftDoorRef.current || !rightDoorRef.current || !lightRevealRef.current) return;
    
    const y = window.scrollY;
    
    // Phase 1: Dolly in (0 to 150px)
    const pDolly = Math.min(Math.max(y / 150, 0), 1);
    
    // Phase 2: Doors open (150 to 450px)
    const pDoors = Math.min(Math.max((y - 150) / 300, 0), 1);
    
    // Phase 3: Push through (350 to 600px)
    const pPush = Math.min(Math.max((y - 350) / 250, 0), 1);

    // Apply easing manually for smooth cinematic feel
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    const easedDolly = easeInOut(pDolly);
    const easedDoors = easeInOut(pDoors);
    const easedPush = easeInOut(pPush);

    // Camera Z: 14 -> 11 -> -3
    let camZ = THREE.MathUtils.lerp(14, 11, easedDolly);
    if (pPush > 0) {
      camZ = THREE.MathUtils.lerp(11, -3, easedPush);
    }
    cameraRef.current.position.z = camZ;

    leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 1.7, easedDoors);
    rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI / 1.7, easedDoors);

    lightRevealRef.current.intensity = THREE.MathUtils.lerp(0, 15, easedDoors);
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#050505",
    roughness: 0.9,
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={40} />
      
      <ambientLight intensity={0.05} />
      <spotLight position={[0, 6, 15]} angle={0.5} penumbra={0.8} intensity={2} castShadow />
      <pointLight ref={lightRevealRef} position={[0, 2, -2]} color="#ffffff" intensity={0} distance={30} decay={1.5} />
      
      <group ref={leftDoorRef} position={[-2.5, 0, 0]}>
        <LuxuriousDoor isLeft={true} />
      </group>
      <group ref={rightDoorRef} position={[2.5, 0, 0]}>
        <LuxuriousDoor isLeft={false} />
      </group>
      
      <mesh position={[-5, 3.5, 5]} rotation={[0, Math.PI / 2, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[20, 20]} />
      </mesh>
      <mesh position={[5, 3.5, 5]} rotation={[0, -Math.PI / 2, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[20, 20]} />
      </mesh>
      <mesh position={[0, 8, 5]} rotation={[Math.PI / 2, 0, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[20, 20]} />
      </mesh>
      <mesh position={[0, -1, 5]} rotation={[-Math.PI / 2, 0, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[20, 20]} />
      </mesh>
      
      <Environment preset="night" />
    </>
  );
}

export default function CinematicIntro() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll(); // Native window scroll
  
  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMounted(false);
    }
  }, []);

  // Background fades out quickly as doors open (150 to 350px)
  const bgOpacity = useTransform(scrollY, [150, 350], [1, 0]);
  
  // Entire canvas fades out at the very end (550 to 650px)
  const canvasOpacity = useTransform(scrollY, [550, 650], [1, 0]);

  // Disable pointer events when scrolling begins to ensure user can interact with the site underneath
  // BUT we need it to block clicks initially if the doors are closed.
  const pointerEvents = useTransform(scrollY, (y) => y >= 10 ? "none" : "auto");
  
  // Hide scroll prompt text
  const textOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  if (!mounted) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[999999]"
      style={{ pointerEvents }}
    >
      {/* Background that fades out to reveal the real website behind the 3D doors */}
      <motion.div 
        className="absolute inset-0 bg-stone-950 z-0" 
        style={{ opacity: bgOpacity }} 
      />
      
      {/* Scroll Prompt */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-stone-400 font-serif"
        style={{ opacity: textOpacity }}
      >
        <span className="text-sm tracking-widest uppercase">Scroll to Enter</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-400 to-transparent" />
      </motion.div>
      
      <motion.div className="absolute inset-0 z-10" style={{ opacity: canvasOpacity }}>
        <Canvas 
          shadows 
          gl={{ alpha: true, antialias: true }} 
          camera={{ position: [0, 1.5, 14], fov: 40 }}
        >
          <DoorScene />
        </Canvas>
      </motion.div>
    </motion.div>
  );
}
