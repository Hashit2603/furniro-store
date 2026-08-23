"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, PackageSearch, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
  { name: 'Products', href: '/admin/products', icon: <PackageSearch className="w-5 h-5" /> },
  { name: 'Customers', href: '/admin/customers', icon: <Users className="w-5 h-5" /> },
  { name: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-stone-900 text-white p-4 flex justify-between items-center z-20">
        <span className="font-serif font-bold text-xl">Satguru Admin</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen || (typeof window !== "undefined" && window.innerWidth >= 768) ? 0 : -300 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="fixed md:sticky top-0 left-0 h-screen w-64 bg-stone-900 text-stone-300 flex flex-col z-30"
      >
        <div className="p-6 hidden md:block">
          <Link href="/" className="font-serif font-bold text-2xl text-white hover:text-orange-500 transition-colors">
            Satguru Industries
          </Link>
          <span className="block text-xs text-stone-500 mt-1 uppercase tracking-widest font-bold">Admin Panel</span>
        </div>

        <nav className="flex-1 px-4 py-6 md:py-0 space-y-1">
          {ADMIN_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-orange-600 text-white font-medium shadow-md' 
                    : 'hover:bg-stone-800 hover:text-white'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar for desktop */}
        <header className="hidden md:flex bg-white h-16 border-b border-stone-200 items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-stone-800 capitalize">
            {pathname.split('/').pop() === 'admin' ? 'Dashboard' : pathname.split('/').pop()}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
