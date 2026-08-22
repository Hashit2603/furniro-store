import React from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import CategoryRow from '@/components/CategoryRow';

export default function FurniturePage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">All Furniture</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">Explore our complete collection of premium, distinctly Indian furniture crafted for the modern home.</p>
        </div>

        <CategoryRow />
        <div className="mt-8">
          <ProductGrid />
        </div>
      </main>
    </div>
  );
}
