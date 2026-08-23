"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SHOWCASE_PRODUCTS = [
  {
    id: 1,
    name: "Lounge Chair",
    tagline: "Ergonomic perfection meets architectural design.",
    price: "? 45,000",
    image: "/images/generated/sofa_3_1787452854096.jpg" 
  },
  {
    id: 2,
    name: "Master Bed",
    tagline: "Rest in uncompromising luxury.",
    price: "? 1,20,000",
    image: "/images/generated/bed_2_1787452880042.jpg"
  },
  {
    id: 3,
    name: "Dining Set",
    tagline: "The centerpiece of family gatherings.",
    price: "? 85,000",
    image: "/images/generated/dining_1_1787452893634.jpg"
  }
];

export default function CinematicShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      const section = sectionRef.current;
      if (!wrapper || !section) return;

      const header = document.querySelector('header');
      const getNavHeight = () => header ? header.offsetHeight : 160;
      
      section.style.height = "calc(100vh - " + getNavHeight() + "px)";

      const items = gsap.utils.toArray('.showcase-item');
      
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          start: () => "top " + getNavHeight() + "px",
          end: () => "+=" + wrapper.offsetWidth,
        }
      });
      
      const handleResize = () => {
        section.style.height = "calc(100vh - " + getNavHeight() + "px)";
        ScrollTrigger.refresh();
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-stone-900 text-white overflow-hidden flex items-center relative" style={{ height: 'calc(100vh - 160px)' }}>
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-orange-500">Curated Masterpieces</h2>
      </div>
      
      <div ref={scrollWrapperRef} className="flex h-full w-[300vw]">
        {SHOWCASE_PRODUCTS.map((product, i) => (
          <div key={i} className="showcase-item w-screen h-full flex items-center justify-center p-4 md:p-8 relative">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              <div className="order-2 md:order-1 flex flex-col items-start px-4 md:px-12">
                <h3 className="text-4xl md:text-7xl font-serif font-bold mb-4 md:mb-6 leading-tight">{product.name}</h3>
                <p className="text-stone-400 text-lg md:text-2xl font-light mb-6 md:mb-8 max-w-md">
                  {product.tagline}
                </p>
                <div className="text-2xl md:text-3xl font-bold tracking-tight mb-8 md:mb-12 text-stone-200">
                  {product.price}
                </div>
                <Link href="/furniture" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">
                  View Product
                  <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>

              <div className="order-1 md:order-2 h-[45vh] md:h-[70vh] w-full relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
