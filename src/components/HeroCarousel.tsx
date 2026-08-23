"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 0,
    bg: '#f7f4f0',
    tagColor: 'bg-orange-600',
    textColor: 'text-[#2a2a2a]',
    subTextColor: 'text-stone-600',
    priceBg: 'bg-[#3e2e28]',
    priceText: 'text-white',
    title: 'MADE FOR THE WORLD',
    subtitle: 'Premium Sofas & Loungers',
    price: 'Starting From ₹48,999',
    is3D: false,
    image: '/images/1.jpg',
  },
  {
    id: 1,
    bg: '#1c1917', // Dark background
    tagColor: 'bg-orange-500',
    textColor: 'text-white',
    subTextColor: 'text-stone-300',
    priceBg: 'bg-white',
    priceText: 'text-[#1c1917]',
    title: 'ELEGANCE IN DARK',
    subtitle: 'Midnight Velvet Collection',
    price: 'Starting From ₹89,999',
    is3D: false,
    image: '/images/5.jpg', // Dark moody furniture
  },
  {
    id: 2,
    bg: '#d7cec3', // Warm mid-tone
    tagColor: 'bg-stone-900',
    textColor: 'text-[#2a2a2a]',
    subTextColor: 'text-stone-700',
    priceBg: 'bg-[#8b5a2b]',
    priceText: 'text-white',
    title: 'NATURAL HARMONY',
    subtitle: 'Solid Teak Wood Dining',
    price: 'Starting From ₹55,999',
    is3D: false,
    image: '/images/8.jpg', // Dining table
  }
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextSlide = () => {
    setDirection(1);
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Optional: Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    })
  };

  return (
    <motion.div 
      initial={false}
      animate={{ backgroundColor: slides[active].bg }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative rounded-lg overflow-hidden border border-[#e8e3dc] shadow-sm min-h-[650px] md:min-h-[500px] flex items-center"
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={active}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full flex flex-col md:flex-row items-center justify-between absolute inset-0"
        >
          {/* Left Text */}
          <div className="p-8 md:p-12 lg:p-16 max-w-lg w-full md:w-1/2 z-10">
            <p className={`text-sm font-semibold tracking-[0.2em] mb-3 flex items-center gap-2 ${slides[active].subTextColor}`}>
              <span className={`w-6 h-px ${slides[active].tagColor}`}></span> DISTINCTLY INDIAN
            </p>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif mb-2 leading-tight ${slides[active].textColor}`}>
              {slides[active].title}
            </h1>
            <p className={`mb-8 font-medium ${slides[active].subTextColor}`}>
              {slides[active].subtitle}
            </p>
            
            {/* Price removed as per request */}
          </div>

          {/* Right Content (Image) */}
          <div className="w-full md:w-1/2 h-[300px] md:h-full relative flex items-center justify-center p-4">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={slides[active].image} 
              alt="Furniture Collection" 
              className="w-full h-full object-cover rounded-xl shadow-2xl max-h-[400px]"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 right-6 md:bottom-1/2 md:-translate-y-1/2 md:right-4 flex md:flex-col gap-2 z-20">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-current border border-white/30 transition-colors shadow-sm"
          style={{ color: slides[active].textColor }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-current border border-white/30 transition-colors shadow-sm"
          style={{ color: slides[active].textColor }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > active ? 1 : -1);
              setActive(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === active 
                ? 'w-8 bg-orange-500' 
                : 'bg-stone-400/50 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
