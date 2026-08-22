"use client";

import React, { createContext, useContext, useState } from 'react';

interface CategoryContextType {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  // Defaulting to 'Living' as it's highlighted in the reference image
  const [activeCategory, setActiveCategory] = useState<string | null>('Living');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory, searchQuery, setSearchQuery }}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
