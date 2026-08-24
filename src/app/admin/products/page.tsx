import React from 'react';
import { PackageSearch, Plus } from 'lucide-react';

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900">Products</h1>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 flex flex-col items-center justify-center min-h-[60vh] text-stone-400">
        <PackageSearch className="w-16 h-16 opacity-20 mb-4" />
        <h2 className="text-xl font-bold text-stone-900 mb-2">Manage your catalog</h2>
        <p className="text-sm">Add, edit, or remove products from your store.</p>
      </div>
    </div>
  );
}
