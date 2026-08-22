"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { Package, Truck, CheckCircle2, Search, MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-stone-900 mb-3">Track Your Order</h1>
            <p className="text-stone-500">Enter your order ID and email to see the real-time status of your delivery.</p>
          </div>

          {/* Tracking Form */}
          <div className="max-w-2xl mx-auto bg-stone-50 p-6 rounded-xl border border-stone-200 mb-12">
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">Order ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. FUR-12345678"
                  defaultValue="FUR-8991203"
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-stone-900 placeholder:text-stone-500 caret-stone-900"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  defaultValue="hello@example.com"
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-stone-900 placeholder:text-stone-500 caret-stone-900"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full sm:w-auto px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  Track
                </button>
              </div>
            </form>
          </div>

          {/* Dummy Tracking Status Result */}
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-8 border-b border-stone-200 pb-4">
              <div>
                <p className="text-sm text-stone-500">Order <span className="font-semibold text-stone-900">#FUR-8991203</span></p>
                <h2 className="text-xl font-bold text-stone-900 mt-1">Arriving on Oct 24, 2026</h2>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-stone-500">Carrier</p>
                <p className="font-semibold text-stone-900 flex items-center gap-1 justify-end">
                  <Truck className="w-4 h-4" /> BlueDart Express
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pt-4 pl-4 sm:pl-0 sm:pt-8">
              {/* Desktop horizontal line */}
              <div className="hidden sm:block absolute top-[52px] left-0 w-full h-1 bg-stone-100 rounded-full z-0"></div>
              <div className="hidden sm:block absolute top-[52px] left-0 w-[65%] h-1 bg-orange-500 rounded-full z-0"></div>
              
              {/* Mobile vertical line */}
              <div className="block sm:hidden absolute top-4 left-[27px] w-1 h-full bg-stone-100 rounded-full z-0"></div>
              <div className="block sm:hidden absolute top-4 left-[27px] w-1 h-[65%] bg-orange-500 rounded-full z-0"></div>

              <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
                {/* Step 1 */}
                <div className="flex sm:flex-col items-center gap-4 sm:gap-3 text-center w-full sm:w-1/4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md shadow-orange-200 ring-4 ring-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="font-bold text-stone-900 text-sm">Order Placed</p>
                    <p className="text-xs text-stone-500 mt-0.5">Oct 18, 10:45 AM</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-col items-center gap-4 sm:gap-3 text-center w-full sm:w-1/4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md shadow-orange-200 ring-4 ring-white">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="font-bold text-stone-900 text-sm">Processing</p>
                    <p className="text-xs text-stone-500 mt-0.5">Oct 19, 02:30 PM</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-col items-center gap-4 sm:gap-3 text-center w-full sm:w-1/4">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-md shadow-orange-200 ring-4 ring-white animate-pulse">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="font-bold text-orange-600 text-sm">Out for Delivery</p>
                    <p className="text-xs text-stone-500 mt-0.5">Today, 08:15 AM</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex sm:flex-col items-center gap-4 sm:gap-3 text-center w-full sm:w-1/4">
                  <div className="w-10 h-10 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center ring-4 ring-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className="font-bold text-stone-400 text-sm">Delivered</p>
                    <p className="text-xs text-stone-400 mt-0.5">Pending</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Delivery Details Block */}
            <div className="mt-12 bg-[#f8f7f5] p-6 rounded-xl border border-stone-200 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-stone-900 mb-2">Shipping Address</h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  John Doe<br/>
                  123 Furniture Avenue, Sector 4<br/>
                  Bengaluru, Karnataka 560001<br/>
                  India
                </p>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-stone-900 mb-2">Order Items</h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone-200 rounded overflow-hidden">
                    <img src="/images/5.jpg" alt="Item" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-900">Malinda Fabric 3-Seater Recliner</p>
                    <p className="text-xs text-stone-500">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
