"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Latest Arrivals', icon: '✨', isNew: true },
  { name: 'Sofas', icon: '🛋️' },
  { name: 'Sofa Cum Beds', icon: '🛏️' },
  { name: 'Coffee Tables', icon: '☕' },
  { name: 'Beds', icon: '🛏️' },
  { name: 'Wardrobes', icon: '🚪' },
  { name: 'TV Units', icon: '📺' },
  { name: 'Recliners', icon: '💺' },
  { name: 'Dining Sets', icon: '🍽️' },
  { name: 'Lounge Chairs', icon: '🪑' },
  { name: 'Shoe Racks', icon: '👟' },
  { name: 'Bookshelves', icon: '📚' },
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
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md ${category.isNew ? 'bg-[#503726] text-white' : 'bg-[#fff9f2]'}`}>
                  {category.isNew ? (
                    <div className="relative">
                      <svg className="w-16 h-16 fill-transparent stroke-white stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 2.4L18 4l.6 3.4 3.4.6L20 10.4 22 12l-2 1.6 2 2.4-3.4.6L18 20l-3.6-1.6L12 22l-2.4-3.6L6 20l-.6-3.4L2 16l2-1.6L2 12l2-1.6L2 8l3.4-.6L6 4l3.6 1.6L12 2z" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-xs">NEW</span>
                    </div>
                  ) : (
                    <span>{category.icon}</span>
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
