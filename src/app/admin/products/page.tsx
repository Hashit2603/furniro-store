"use client";

import React, { useState } from 'react';
import { PackageSearch, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { products } from '@/data/products';

export default function AdminProducts() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900">Products ({products.length})</h1>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-stone-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Categories</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={product.imageUrl} 
                          alt={product.title} 
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                        />
                        <span className="font-bold text-stone-900">{product.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-stone-500">
                      <div className="flex flex-wrap gap-1">
                        {product.categories.slice(0, 2).map(cat => (
                          <span key={cat} className="px-2 py-1 bg-stone-100 rounded text-xs">{cat}</span>
                        ))}
                        {product.categories.length > 2 && (
                          <span className="px-2 py-1 bg-stone-100 rounded text-xs">+{product.categories.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-stone-900">{product.price}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-stone-400 hover:text-orange-600 transition-colors inline-flex">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-red-600 transition-colors inline-flex">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-16 text-center text-stone-400 font-medium">
                    No products found matching "{search}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
