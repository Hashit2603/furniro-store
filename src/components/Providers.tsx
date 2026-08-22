"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CategoryProvider } from '@/context/CategoryContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CategoryProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </CategoryProvider>
    </SessionProvider>
  );
}
