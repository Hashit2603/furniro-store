"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sofa, 
  BedDouble, 
  Coffee, 
  DoorClosed, 
  Tv, 
  Armchair, 
  Utensils, 
  RockingChair,
  Footprints, 
  Library,
  Sparkles
} from 'lucide-react';

const categories = [
  { name: 'Latest Arrivals', icon: <Sparkles className="w-10 h-10 text-white" strokeWidth={1.5} />, isNew: true },
  { name: 'Sofas', icon: <Sofa className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Sofa Cum Beds', icon: <BedDouble className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Coffee Tables', icon: <Coffee className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Beds', icon: <BedDouble className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Wardrobes', icon: <DoorClosed className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'TV Units', icon: <Tv className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Recliners', icon: <Armchair className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Dining Sets', icon: <Utensils className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Lounge Chairs', icon: <RockingChair className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Shoe Racks', icon: <Footprints className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
  { name: 'Bookshelves', icon: <Library className="w-10 h-10 text-stone-700 group-hover:text-orange-600 transition-colors" strokeWidth={1.5} /> },
];

export default function CategoryRow() {
  const router = useRouter();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleCategoryClick = (e: React.MouseEvent, slug: string, idx: number) => {
    e.preventDefault();
    if (clickedIndex !== null) return; // Prevent double clicks
    
    setClickedIndex(idx);
    
    // Smooth iOS-like transition to the next page
    setTimeout(() => {
      router.push(`/category/${slug}`);
      setTimeout(() => setClickedIndex(null), 500); // Reset state after routing is likely complete
    }, 550); 
  };

  return (
    <section id="shop-by-category" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <h2 className="text-xl font-bold text-stone-900 mb-8 relative z-10">Shop by Category</h2>
      
      {/* 
        To make the massive scaling overlay work perfectly without getting clipped by parents, 
        we render a separate AnimatePresence overlay if clickedIndex is not null. 
      */}
      <AnimatePresence>
        {clickedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[100] ${categories[clickedIndex].isNew ? 'bg-[#503726]' : 'bg-[#fff9f2]'}`}
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {}
        }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 gap-y-10 relative z-10"
      >
        {categories.map((category, idx) => {
          const slug = category.name.toLowerCase().replace(/\s+/g, '-');
          const isClicked = clickedIndex === idx;
          const isAnotherClicked = clickedIndex !== null && clickedIndex !== idx;
          
          return (
            <div key={idx} className="relative cursor-pointer group" onClick={(e) => handleCategoryClick(e, slug, idx)}>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                whileTap={!clickedIndex ? { scale: 0.85 } : undefined} // iOS app press effect
                animate={{
                  opacity: isAnotherClicked ? 0 : 1, // Fade out other icons
                  scale: isClicked ? 100 : 1, // Massive scale for the clicked one
                  zIndex: isClicked ? 110 : 1, // Keep it above everything
                }}
                transition={isClicked ? { 
                  duration: 0.6, 
                  ease: [0.32, 0.72, 0, 1] // iOS spring ease out
                } : { 
                  duration: 0.2 
                }}
                className={`flex flex-col items-center gap-3 relative ${isClicked ? 'pointer-events-none' : ''}`}
              >
                <div 
                  className={`w-24 h-24 flex items-center justify-center shadow-sm 
                    ${!isClicked ? 'transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md' : 'shadow-none'} 
                    ${category.isNew ? 'bg-[#503726] text-white' : 'bg-[#fff9f2]'}
                  `}
                  style={{ borderRadius: isClicked ? '0px' : '32px' }} // Squircle instead of full circle
                >
                  <motion.div 
                    animate={{ opacity: isClicked ? 0 : 1 }} 
                    transition={{ duration: 0.15 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    {category.isNew ? (
                      <>
                        {category.icon}
                        <span className="absolute -bottom-4 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                      </>
                    ) : (
                      category.icon
                    )}
                  </motion.div>
                </div>
                
                <motion.span 
                  animate={{ opacity: isClicked ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs font-bold text-stone-600 text-center uppercase tracking-wider"
                >
                  {category.name}
                </motion.span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
