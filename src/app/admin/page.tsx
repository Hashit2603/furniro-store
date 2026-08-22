"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, TrendingUp, Package, ArrowUpRight } from 'lucide-react';

const STATS = [
  { label: 'Total Revenue', value: '₹12,45,000', increase: '+14%', icon: <DollarSign className="w-6 h-6 text-green-600" />, bg: 'bg-green-100' },
  { label: 'Active Orders', value: '45', increase: '+5%', icon: <ShoppingBag className="w-6 h-6 text-orange-600" />, bg: 'bg-orange-100' },
  { label: 'Total Customers', value: '1,240', increase: '+18%', icon: <Users className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-100' },
  { label: 'Conversion Rate', value: '3.2%', increase: '+1.2%', icon: <TrendingUp className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-100' },
];

const RECENT_ORDERS = [
  { id: '#FUR-8991', customer: 'Rahul Sharma', date: 'Oct 24, 2023', total: '₹45,000', status: 'Processing' },
  { id: '#FUR-8990', customer: 'Priya Patel', date: 'Oct 23, 2023', total: '₹12,500', status: 'Shipped' },
  { id: '#FUR-8989', customer: 'Amit Kumar', date: 'Oct 23, 2023', total: '₹89,900', status: 'Delivered' },
  { id: '#FUR-8988', customer: 'Sneha Gupta', date: 'Oct 22, 2023', total: '₹34,200', status: 'Processing' },
  { id: '#FUR-8987', customer: 'Vikram Singh', date: 'Oct 21, 2023', total: '₹1,12,000', status: 'Delivered' },
];

const TOP_PRODUCTS = [
  { name: 'Syltherine Lounge Chair', category: 'Chairs', sales: 124, revenue: '₹4,34,000' },
  { name: 'Leviosa Minimalist Desk', category: 'Tables', sales: 98, revenue: '₹2,45,000' },
  { name: 'Lolito Luxury Sofa', category: 'Sofas', sales: 45, revenue: '₹3,15,000' },
];

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
              <span className="text-xs font-medium text-green-600 flex items-center mt-2">
                <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.increase} this month
              </span>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Recent Orders</h2>
            <button className="text-sm font-medium text-orange-600 hover:text-orange-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-stone-100">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 font-medium text-stone-900">{order.id}</td>
                    <td className="p-4 text-stone-600">{order.customer}</td>
                    <td className="p-4 text-stone-500">{order.date}</td>
                    <td className="p-4 text-stone-900 font-medium">{order.total}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Top Products</h2>
          </div>
          <div className="p-6 space-y-6">
            {TOP_PRODUCTS.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400 shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-stone-900 truncate">{product.name}</h4>
                  <p className="text-xs text-stone-500">{product.category} • {product.sales} sales</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-sm font-bold text-stone-900">{product.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
