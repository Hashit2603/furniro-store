import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900">Orders & Inquiries</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 flex flex-col items-center justify-center min-h-[60vh] text-stone-400">
        <ShoppingBag className="w-16 h-16 opacity-20 mb-4" />
        <h2 className="text-xl font-bold text-stone-900 mb-2">No active inquiries</h2>
        <p className="text-sm">When customers request quotes, they will appear here.</p>
      </div>
    </div>
  );
}
