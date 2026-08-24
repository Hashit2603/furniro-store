"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

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
    color: "#d4af37", // Elegant brass/gold
    roughness: 0.2,
    metalness: 1.0,
  });

  const signX = isLeft ? 1 : -1;

  return (
    <group>
      {/* Main Door Frame */}
      <mesh position={[signX * 1.25, 3.5, 0]} castShadow receiveShadow material={doorMaterial}>
        <boxGeometry args={[2.5, 9, 0.2]} />
      </mesh>
      
      {/* Decorative Inner Panels */}
      <mesh position={[signX * 1.25, 6, 0.11]} castShadow receiveShadow material={panelMaterial}>
        <boxGeometry args={[1.8, 3.5, 0.05]} />
      </mesh>
      <mesh position={[signX * 1.25, 1.5, 0.11]} castShadow receiveShadow material={panelMaterial}>
        <boxGeometry args={[1.8, 4, 0.05]} />
      </mesh>

      {/* Elegant Long Handle */}
      <mesh position={[signX * 2.2, 3.5, 0.2]} castShadow material={handleMaterial}>
        <cylinderGeometry args={[0.015, 0.015, 2.5, 16]} />
      </mesh>
      {/* Handle mounts */}
      <mesh position={[signX * 2.2, 4.6, 0.15]} castShadow material={handleMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 16]} />
      </mesh>
      <mesh position={[signX * 2.2, 2.4, 0.15]} castShadow material={handleMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 16]} />
      </mesh>
    </group>
  );
}

function DoorScene({  
  onReveal, 
  onFade, 
  onComplete 
}: { 
  onReveal: () => void; 
  onFade: () => void; 
  onComplete: () => void; 
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const lightRevealRef = useRef<THREE.PointLight>(null);

  const onRevealRef = useRef(onReveal);
  const onFadeRef = useRef(onFade);
  const onCompleteRef = useRef(onComplete);

  // Keep refs up to date without triggering useEffect
  useLayoutEffect(() => {
    onRevealRef.current = onReveal;
    onFadeRef.current = onFade;
    onCompleteRef.current = onComplete;
  }, [onReveal, onFade, onComplete]);
  
  useEffect(() => {
    if (!cameraRef.current || !leftDoorRef.current || !rightDoorRef.current || !lightRevealRef.current) return;
    
    // Initial State
    cameraRef.current.position.set(0, 1.5, 14);
    leftDoorRef.current.rotation.y = 0;
    rightDoorRef.current.rotation.y = 0;
    lightRevealRef.current.intensity = 0;

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current()
    });

    // Phase 1: Subtle anticipation (slow dolly in)
    tl.to(cameraRef.current.position, {
      z: 11,
      duration: 2.0,
      ease: "power1.inOut"
    }, 0);

    // Phase 2: Doors open & light spills
    tl.call(() => onRevealRef.current(), [], 1.5);
    
    tl.to([leftDoorRef.current.rotation], {
      y: Math.PI / 1.7, // open outwards
      duration: 2.8,
      ease: "power3.inOut"
    }, 1.5);
    
    tl.to([rightDoorRef.current.rotation], {
      y: -Math.PI / 1.7,
      duration: 2.8,
      ease: "power3.inOut"
    }, 1.5);

    // Light bursts through
    tl.to(lightRevealRef.current, {
      intensity: 15,
      duration: 1.5,
      ease: "power2.in"
    }, 1.5);

    // Phase 3: Camera pushes through the door gap
    tl.to(cameraRef.current.position, {
      z: -3,
      duration: 2.0,
      ease: "power2.inOut"
    }, 2.5);

    // Fade out the entire canvas before it abruptly unmounts
    tl.call(() => onFadeRef.current(), [], 3.5);

    return () => { tl.kill(); };
  }, []); // Run absolutely only once on mount

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#050505",
    roughness: 0.9,
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={40} />
      
      {/* Lighting */}
      <ambientLight intensity={0.05} />
      <spotLight position={[0, 6, 15]} angle={0.5} penumbra={0.8} intensity={2} castShadow />
      
      {/* The cinematic light that bursts from behind the door */}
      <pointLight ref={lightRevealRef} position={[0, 2, -2]} color="#ffffff" intensity={0} distance={30} decay={1.5} />
      
      {/* Left Door */}
      <group ref={leftDoorRef} position={[-2.5, 0, 0]}>
        <LuxuriousDoor isLeft={true} />
      </group>

      {/* Right Door */}
      <group ref={rightDoorRef} position={[2.5, 0, 0]}>
        <LuxuriousDoor isLeft={false} />
      </group>
      
      {/* Corridor Walls to block peripheral vision */}
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
  const [stage, setStage] = useState(0); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPlayed = sessionStorage.getItem('introPlayed');

    if (prefersReducedMotion || hasPlayed) {
      setStage(3);
      return;
    }
  }, []);

  const handleSequenceComplete = () => {
    setStage(3);
    sessionStorage.setItem('introPlayed', 'true');
  };

  if (stage === 3 || !mounted) return null;

  return (
    <motion.div 
      className={`fixed inset-0 z-[999999] ${stage >= 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 2 ? 0 : 1 }}
      transition={{ duration: 1.0, ease: "easeInOut" }} 
    >
       {/* Background that fades out to reveal the real website behind the 3D doors */}
       <div 
        className="absolute inset-0 bg-stone-950 transition-opacity duration-[1500ms] ease-in-out" 
        style={{ opacity: stage >= 1 ? 0 : 1 }} 
       />
       
       <Canvas 
        shadows 
        gl={{ alpha: true, antialias: true }} 
        camera={{ position: [0, 1.5, 14], fov: 40 }}
        className="relative z-10"
       >
         <DoorScene 
           onReveal={() => setStage(1)} 
           onFade={() => setStage(2)} 
           onComplete={handleSequenceComplete} 
         />
       </Canvas>
    </motion.div>
  );
}


