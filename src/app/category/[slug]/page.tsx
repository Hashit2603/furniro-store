"use client";

import React, { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  
  const [animatingHeartId, setAnimatingHeartId] = useState<number | null>(null);

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const currentlyWished = isInWishlist(product.id);
    toggleWishlistItem(product);
    
    // Only show big heart pop when adding to wishlist (not removing)
    if (!currentlyWished) {
      setAnimatingHeartId(product.id);
      setTimeout(() => setAnimatingHeartId(null), 800); // clear after animation
    }
  };

  // Convert slug back to title case, e.g., 'sofa-cum-beds' -> 'Sofa Cum Beds'
  const categoryName = resolvedParams.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Filter products directly
  const categoryProducts = products.filter(p => p.categories.includes(categoryName));

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#f8f7f5] py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-orange-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">
            {categoryName}
          </h1>
          <p className="mt-4 text-stone-600 max-w-2xl">
            Explore our exclusive collection of {categoryName.toLowerCase()}. Crafted with premium materials for unmatched comfort and style.
          </p>
        </div>
      </div>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-stone-900">
            {categoryProducts.length} Products Found
          </h2>
        </div>
        
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-stone-500 font-medium">No products available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {categoryProducts.map((product) => {
              const isWished = isInWishlist(product.id);
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={product.id} 
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden mb-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.tag && (
                      <div className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
                        product.tagType === 'brown' 
                          ? 'bg-[#8b5a2b] text-white' 
                          : 'bg-white text-stone-900 shadow-sm'
                      }`}>
                        {product.tag}
                      </div>
                    )}
                    
                    {/* Big Heart Overlay Animation */}
                    <AnimatePresence>
                      {animatingHeartId === product.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        >
                          <Heart className="w-20 h-20 text-white drop-shadow-2xl fill-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={(e) => handleWishlistClick(e, product)}
                      className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-stone-600 hover:text-red-500 hover:bg-white shadow-sm transition-colors z-30"
                    >
                      <motion.div
                        animate={isWished ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Heart 
                          className="w-4 h-4 transition-colors" 
                          fill={isWished ? "#ef4444" : "none"}
                          color={isWished ? "#ef4444" : "currentColor"}
                        />
                      </motion.div>
                    </motion.button>

                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="absolute inset-x-0 bottom-0 bg-orange-600 hover:bg-orange-700 translate-y-full group-hover:translate-y-0 transition-all duration-300 py-3 text-center z-10"
                    >
                      <span className="text-sm font-bold text-white tracking-wide">Add to cart</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 flex-grow">
                    <h3 className="text-[13px] font-medium text-stone-800 line-clamp-2 leading-snug">{product.title}</h3>
                    {/* Price removed as per request */}
                    <p className="text-[11px] text-[#c26d2b] mt-1">{product.offerText}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
