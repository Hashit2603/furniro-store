"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop to prevent jank on mobile, or run a lighter version
    let ctx = gsap.context(() => {
      // Background parallax and scale
      gsap.to(bgRef.current, {
        scale: 1.15,
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Text fade and slide
      gsap.to(textRef.current, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Dark overlay fade in for seamless transition to next section
      gsap.to(overlayRef.current, {
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100vh] w-full overflow-hidden bg-stone-900 mt-0">
      <img
        ref={bgRef}
        src="/images/generated/sofa_living_1787317267428.jpg" // Using an existing premium image
        alt="Premium Furniture Showroom"
        className="absolute inset-0 w-full h-full object-cover transform-gpu origin-center"
      />
      
      <div ref={overlayRef} className="absolute inset-0 bg-stone-900 opacity-30 pointer-events-none" />

      <div 
        ref={textRef} 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-white text-5xl md:text-8xl font-serif font-bold tracking-tight uppercase leading-none mb-6 drop-shadow-lg">
          Discover<br />
          The Art<br />
          Of Living.
        </h1>
        <p className="text-stone-200 text-lg md:text-2xl font-light tracking-wide max-w-2xl drop-shadow-md mb-10">
          Uncompromising quality. Architectural design. 
        </p>
        <Link 
          href="#shop-by-category" 
          className="bg-white text-stone-900 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}

