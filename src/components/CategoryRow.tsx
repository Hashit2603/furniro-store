"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  return (
    <section id="shop-by-category" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <h2 className="text-xl font-bold text-stone-900 mb-8">Shop by Category</h2>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {}
        }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 gap-y-10"
      >
        {categories.map((category, idx) => {
          const slug = category.name.toLowerCase().replace(/\s+/g, '-');
          
          return (
            <Link href={`/category/${slug}`} key={idx} passHref>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md ${category.isNew ? 'bg-[#503726] text-white' : 'bg-[#fff9f2]'}`}>
                  {category.isNew ? (
                    <div className="relative flex flex-col items-center justify-center">
                      {category.icon}
                      <span className="absolute -bottom-4 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                    </div>
                  ) : (
                    category.icon
                  )}
                </div>
                <span className="text-xs font-bold text-stone-600 text-center uppercase tracking-wider">{category.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}
