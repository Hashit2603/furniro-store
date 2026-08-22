"use client";

import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartSubtotal, cartTotalCount } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60]"
            onClick={toggleCart}
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
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <h2 className="text-lg font-bold text-stone-900">Your Cart</h2>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {cartTotalCount}
                </span>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-400 hover:text-stone-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-stone-300" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Your cart is empty</p>
                    <p className="text-sm text-stone-500 mt-1">Looks like you haven't added any furniture yet.</p>
                  </div>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 text-orange-600 font-medium hover:underline text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id} 
                      className="flex gap-4"
                    >
                      <div className="w-24 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium text-stone-900 line-clamp-2">{item.title}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <p className="font-bold text-stone-900">₹{item.price}</p>
                          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-md px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-stone-400 hover:text-stone-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-stone-900 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-stone-400 hover:text-stone-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-stone-100 p-6 bg-stone-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="text-xl font-bold text-stone-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-stone-500 mb-6">Shipping and taxes calculated at checkout.</p>
                <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors">
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
