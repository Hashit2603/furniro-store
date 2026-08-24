import React from 'react';
import { Users } from 'lucide-react';

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900">Customers</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 flex flex-col items-center justify-center min-h-[60vh] text-stone-400">
        <Users className="w-16 h-16 opacity-20 mb-4" />
        <h2 className="text-xl font-bold text-stone-900 mb-2">Customer Database</h2>
        <p className="text-sm">No customers have registered or placed inquiries yet.</p>
      </div>
    </div>
  );
}
