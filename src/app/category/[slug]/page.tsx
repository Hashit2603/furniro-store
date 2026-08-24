"use client";

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, X, Shield, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  
  const [animatingHeartId, setAnimatingHeartId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const currentlyWished = isInWishlist(product.id);
    toggleWishlistItem(product);
    
    if (!currentlyWished) {
      setAnimatingHeartId(product.id);
      setTimeout(() => setAnimatingHeartId(null), 800);
    }
  };

  const categoryName = resolvedParams.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const categoryProducts = products.filter(p => p.categories.includes(categoryName));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };

    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
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

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <AnimatePresence mode="popLayout">
                {categoryProducts.map((product) => {
                  const isWished = isInWishlist(product.id);
                  return (
                    <motion.div 
                      layoutId={"card-" + product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ layout: { type: "spring", damping: 25, stiffness: 200 } }}
                      key={product.id} 
                      className="group cursor-pointer flex flex-col"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <motion.div 
                        layoutId={"image-container-" + product.id}
                        className="relative w-full aspect-[4/3] bg-stone-100 rounded-sm overflow-hidden mb-4"
                      >
                        <motion.img 
                          layoutId={"image-" + product.id}
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.tag && (
                          <div className={"absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider z-10 " + (
                            product.tagType === 'brown' 
                              ? 'bg-[#8b5a2b] text-white' 
                              : 'bg-white text-stone-900 shadow-sm'
                          )}>
                            {product.tag}
                          </div>
                        )}
                        
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
                      </motion.div>

                      <div className="flex flex-col flex-1">
                        <motion.h3 layoutId={"title-" + product.id} className="text-stone-900 font-bold text-sm mb-1 truncate">
                          {product.title}
                        </motion.h3>
                        <motion.p layoutId={"offer-" + product.id} className="text-[#c26d2b] text-xs font-medium">
                          {product.offerText}
                        </motion.p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[80]"
                onClick={() => setSelectedProduct(null)}
              />
  
              <div className="fixed inset-0 flex items-center justify-center z-[90] pointer-events-none p-4 sm:p-6 md:p-12">
                <motion.div
                  layoutId={"card-" + selectedProduct.id}
                  className="bg-white w-full max-w-5xl max-h-full md:max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto relative"
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-500 hover:text-stone-900 shadow-sm transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
  
                  <motion.div 
                    layoutId={"image-container-" + selectedProduct.id}
                    className="w-full md:w-1/2 h-64 md:h-full relative bg-stone-100 shrink-0"
                  >
                    <motion.img 
                      layoutId={"image-" + selectedProduct.id}
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
                  </motion.div>
  
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white no-scrollbar">
                    
                    <div className="mb-6">
                      <motion.h3 
                        layoutId={"title-" + selectedProduct.id}
                        className="text-2xl md:text-3xl font-bold text-stone-900 mb-4 leading-tight"
                      >
                        {selectedProduct.title}
                      </motion.h3>
                      
                      <motion.p 
                        layoutId={"offer-" + selectedProduct.id}
                        className="text-sm font-medium text-[#c26d2b] mt-3 bg-orange-50 inline-block px-3 py-1.5 rounded-md border border-orange-100"
                      >
                        {selectedProduct.offerText}
                      </motion.p>
                    </div>
  
                    <hr className="border-stone-100 my-6" />
  
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="space-y-6 flex-grow"
                    >
                      <div>
                        <h4 className="font-bold text-stone-900 mb-2">Description</h4>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          Experience perfect comfort and unmatched elegance. Crafted with premium materials, this piece brings both durability and a timeless aesthetic to your space. Designed to seamlessly blend with modern and classic interiors alike.
                        </p>
                      </div>
  
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                          <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-stone-900">1 Year Warranty</p>
                            <p className="text-[10px] text-stone-500 mt-0.5">On manufacturing defects</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-stone-50 rounded-lg">
                          <RotateCcw className="w-5 h-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-stone-900">Easy Returns</p>
                            <p className="text-[10px] text-stone-500 mt-0.5">7 days replacement</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
  
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="mt-8 flex gap-3 pt-6 border-t border-stone-100"
                    >
                      <button 
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5"
                      >
                        Add to Cart
                      </button>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleWishlistItem(selectedProduct)}
                        className="px-6 py-4 border border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-600 rounded-xl transition-all flex items-center justify-center"
                      >
                        <motion.div
                          animate={isInWishlist(selectedProduct.id) ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Heart className={`w-6 h-6 transition-colors ${isInWishlist(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`} />
                        </motion.div>
                      </motion.button>
                    </motion.div>
  
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}




