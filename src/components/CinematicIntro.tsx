"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicIntro() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPlayed = sessionStorage.getItem('introPlayed');

    if (prefersReducedMotion || hasPlayed) {
      setShow(false);
      return;
    }

    setShow(true);

    // Simulate essential assets loading (can be tied to real load events)
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait for doors to open, then unmount
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('introPlayed', 'true');
      }, 2500); 
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] pointer-events-none flex bg-stone-950">
        {/* Left Door */}
        <motion.div 
          className="w-1/2 h-full relative overflow-hidden bg-stone-900 border-r border-stone-800 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
          initial={{ x: 0 }}
          animate={{ x: loading ? 0 : '-100%' }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          <video 
            autoPlay muted playsInline loop
            poster="/images/sofa_living.jpg" // Fallback placeholder
            className="absolute left-0 top-0 w-[100vw] max-w-[100vw] h-full object-cover"
          >
            <source src="/videos/intro-desktop.mp4" type="video/mp4" />
          </video>
          {/* Overlay to simulate depth lighting */}
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: loading ? 0.3 : 0 }}
            transition={{ duration: 1.8 }}
          />
        </motion.div>

        {/* Right Door */}
        <motion.div 
          className="w-1/2 h-full relative overflow-hidden bg-stone-900 border-l border-stone-800 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          initial={{ x: 0 }}
          animate={{ x: loading ? 0 : '100%' }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          <video 
            autoPlay muted playsInline loop
            poster="/images/sofa_living.jpg" // Fallback placeholder
            className="absolute right-0 top-0 w-[100vw] max-w-[100vw] h-full object-cover"
          >
            <source src="/videos/intro-desktop.mp4" type="video/mp4" />
          </video>
          {/* Overlay to simulate depth lighting */}
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: loading ? 0.3 : 0 }}
            transition={{ duration: 1.8 }}
          />
        </motion.div>
        
        {/* Loading / Branding Text in center */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: loading ? 1 : 0, scale: loading ? 1 : 1.1 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
           <div className="text-white text-2xl md:text-5xl font-serif tracking-widest uppercase flex flex-col items-center gap-8 drop-shadow-2xl">
              Satguru Industries
              {loading && (
                <div className="w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-orange-500 animate-spin rounded-full"></div>
              )}
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
