"use client";

import React, { useEffect } from 'react';
import { X, Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistDrawer() {
  const { isWishlistOpen, toggleWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen]);

  const handleMoveToCart = (item: { id: number; title: string; price: string; originalPrice?: string; imageUrl: string }) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60]"
            onClick={toggleWishlist}
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-stone-800" />
                <h2 className="text-lg font-bold text-stone-900">Your Wishlist</h2>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              </div>
              <button 
                onClick={toggleWishlist}
                className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-stone-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-900">Your wishlist is empty</h3>
                    <p className="text-sm text-stone-500 mt-1">Save items you love here to buy them later.</p>
                  </div>
                  <button 
                    onClick={toggleWishlist}
                    className="mt-4 px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Explore Furniture
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlistItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id} 
                      className="flex gap-4"
                    >
                      <div className="w-24 h-24 bg-stone-100 rounded-md overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-medium text-stone-900 line-clamp-2 leading-snug">{item.title}</h4>
                            <button 
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {/* Price removed */}
                        </div>
                        
                        <div className="mt-3">
                          <button 
                            onClick={() => handleMoveToCart(item)}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-md transition-colors"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
