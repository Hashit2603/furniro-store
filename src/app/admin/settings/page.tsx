"use client";

import React, { useState } from 'react';
import { Save, Store, Globe, Shield, Bell, Check } from 'lucide-react';

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Simulated form state
  const [settings, setSettings] = useState({
    storeName: 'Satguru Industries',
    supportEmail: 'contact@satguruindustries.com',
    phone: '+91 98765 43210',
    catalogMode: true,
    emailNotifications: true,
    currency: 'INR'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900">Store Settings</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
          ) : isSaved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* General Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center gap-3">
              <Store className="w-5 h-5 text-stone-400" />
              <h2 className="text-lg font-bold text-stone-900">General Information</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Store Name</label>
                  <input 
                    type="text" 
                    value={settings.storeName}
                    onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Primary Currency</label>
                  <select 
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow bg-white"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Support Email</label>
                  <input 
                    type="email" 
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center gap-3">
              <Shield className="w-5 h-5 text-stone-400" />
              <h2 className="text-lg font-bold text-stone-900">Admin Security</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">New Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center gap-3">
              <Globe className="w-5 h-5 text-stone-400" />
              <h2 className="text-lg font-bold text-stone-900">Store Mode</h2>
            </div>
            <div className="p-6 space-y-6">
              
              <label className="flex items-start gap-4 cursor-pointer">
                <div className="relative flex items-center pt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.catalogMode}
                    onChange={(e) => setSettings({...settings, catalogMode: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Catalog Mode</p>
                  <p className="text-xs text-stone-500 mt-1">Hides prices and replaces "Add to Cart" with inquiry forms for all products.</p>
                </div>
              </label>

            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center gap-3">
              <Bell className="w-5 h-5 text-stone-400" />
              <h2 className="text-lg font-bold text-stone-900">Notifications</h2>
            </div>
            <div className="p-6 space-y-6">
              
              <label className="flex items-start gap-4 cursor-pointer">
                <div className="relative flex items-center pt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-900">Email Alerts</p>
                  <p className="text-xs text-stone-500 mt-1">Receive an email immediately when a new inquiry is placed.</p>
                </div>
              </label>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
