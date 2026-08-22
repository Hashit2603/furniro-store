"use client";

import React, { createContext, useContext, useState } from 'react';
import { Product } from './CartContext';

interface WishlistContextType {
  wishlistItems: Product[];
  isWishlistOpen: boolean;
  toggleWishlistItem: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlistItem = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      isWishlistOpen,
      toggleWishlistItem,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
