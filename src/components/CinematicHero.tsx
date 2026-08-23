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
  const bgEntranceRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- ENTRANCE ANIMATION (Synchronized with CinematicIntro) ---
      const hasPlayed = sessionStorage.getItem('introPlayed') === 'true';
      // The logo zoom wrapper fades out starting around 3.9s. We overlap our entrance perfectly.
      const delay = hasPlayed ? 0.1 : 3.9;

      const tl = gsap.timeline();
      
      // Set initial state
      gsap.set(bgEntranceRef.current, { scale: 1.25, filter: 'blur(12px)' });
      gsap.set(textRef.current?.children || [], { y: 40, opacity: 0 });

      // Play entrance
      tl.to(bgEntranceRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 2.2,
        ease: 'power3.out',
        delay: delay
      })
      .to(textRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      }, "-=1.6"); // Reveal text while background is still settling

      // --- SCROLL ANIMATION ---
      // Inner image handles the scroll parallax
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

      // Text container handles scroll slide out
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
      
      {/* Background Wrapper for Entrance Animation */}
      <div ref={bgEntranceRef} className="absolute inset-0 w-full h-full transform-gpu origin-center">
        {/* Inner Image for Scroll Animation */}
        <img
          ref={bgRef}
          src="/images/generated/sofa_living_1787317267428.jpg"
          alt="Premium Furniture Showroom"
          className="absolute inset-0 w-full h-full object-cover transform-gpu origin-center"
        />
      </div>
      
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
        <div className="overflow-hidden p-2">
          <Link 
            href="#shop-by-category" 
            className="inline-block bg-white text-stone-900 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
