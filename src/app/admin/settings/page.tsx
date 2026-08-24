import React from 'react';
import { Settings } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900">Store Settings</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 flex flex-col items-center justify-center min-h-[60vh] text-stone-400">
        <Settings className="w-16 h-16 opacity-20 mb-4" />
        <h2 className="text-xl font-bold text-stone-900 mb-2">Configuration</h2>
        <p className="text-sm">Configure your brand, admin preferences, and notifications.</p>
      </div>
    </div>
  );
}
