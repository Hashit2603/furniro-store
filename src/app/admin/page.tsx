"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, Package, FileText } from 'lucide-react';

const STATS = [
  { label: 'Total Inquiries', value: '0', icon: <FileText className="w-6 h-6 text-green-600" />, bg: 'bg-green-100' },
  { label: 'Active Quotes', value: '0', icon: <ShoppingBag className="w-6 h-6 text-orange-600" />, bg: 'bg-orange-100' },
  { label: 'Total Customers', value: '0', icon: <Users className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-100' },
  { label: 'Total Products', value: '12', icon: <Package className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-100' },
];

const RECENT_INQUIRIES: any[] = [];
const TOP_PRODUCTS: any[] = [];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 flex items-start justify-between"
          >
            <div>
              <p className="text-sm font-medium text-stone-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-stone-900">{stat.value}</h3>
              <span className="text-xs font-medium text-stone-400 flex items-center mt-2">
                -- no data yet
              </span>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Recent Inquiries</h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Inquiry ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-stone-100">
                {RECENT_INQUIRIES.length > 0 ? (
                  RECENT_INQUIRIES.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 font-medium text-stone-900">{inquiry.id}</td>
                      <td className="p-4 text-stone-600">{inquiry.customer}</td>
                      <td className="p-4 text-stone-500">{inquiry.date}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-stone-100 text-stone-700">
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-16 text-center text-stone-400 font-medium">
                      No recent inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Top Products</h2>
          </div>
          <div className="p-6 space-y-6 flex-1 flex flex-col">
            {TOP_PRODUCTS.length > 0 ? (
              TOP_PRODUCTS.map((product) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400 shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 truncate">{product.name}</h4>
                    <p className="text-xs text-stone-500">{product.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2 pb-6">
                 <Package className="w-8 h-8 opacity-20" />
                 <span className="text-sm font-medium">No product data yet.</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
