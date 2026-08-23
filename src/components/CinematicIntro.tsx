"use client";

import React, { useEffect, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

export default function CinematicIntro() {
  const [step, setStep] = useState(0); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPlayed = sessionStorage.getItem('introPlayed');

    if (prefersReducedMotion || hasPlayed) {
      setStep(3);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 1500); // Doors start opening
    const t3 = setTimeout(() => {
      setStep(3); // Unmount after doors finish opening
      sessionStorage.setItem('introPlayed', 'true');
    }, 3500); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t3);
    };
  }, []);
  
  if (step === 3) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-transparent pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: step >= 1 ? 0 : 1 }}
      transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }} 
    >
      {/* Left Door */}
      <motion.div 
        className="absolute left-0 top-0 w-1/2 h-full overflow-hidden bg-stone-900 border-r border-stone-800 shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-20"
        initial={{ x: 0 }}
        animate={{ x: step >= 1 ? '-100%' : 0 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <video 
          autoPlay muted playsInline loop
          poster="/images/generated/sofa_living_1787317267428.jpg"
          className="absolute left-0 top-0 w-[100vw] max-w-[100vw] h-full object-cover"
        >
          <source src="/videos/intro-desktop.mp4" type="video/mp4" />
        </video>
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: step >= 1 ? 0 : 0.3 }}
          transition={{ duration: 1.8 }}
        />
      </motion.div>

      {/* Right Door */}
      <motion.div 
        className="absolute right-0 top-0 w-1/2 h-full overflow-hidden bg-stone-900 border-l border-stone-800 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20"
        initial={{ x: 0 }}
        animate={{ x: step >= 1 ? '100%' : 0 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <video 
          autoPlay muted playsInline loop
          poster="/images/generated/sofa_living_1787317267428.jpg"
          className="absolute right-0 top-0 w-[100vw] max-w-[100vw] h-full object-cover"
        >
          <source src="/videos/intro-desktop.mp4" type="video/mp4" />
        </video>
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: step >= 1 ? 0 : 0.3 }}
          transition={{ duration: 1.8 }}
        />
      </motion.div>
      
      {/* Loading Spinner Over Doors */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: step >= 1 ? 0 : 1, scale: step >= 1 ? 1.1 : 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
         <div className="flex flex-col items-center gap-6 drop-shadow-2xl">
            <div className="w-10 h-10 border-t-2 border-r-2 border-white animate-spin rounded-full"></div>
            <span className="text-white text-sm tracking-[0.2em] uppercase font-light">Loading Showroom</span>
         </div>
      </motion.div>
    </motion.div>
  );
}
