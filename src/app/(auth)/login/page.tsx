"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // For now, since the backend is still being wired, we can mock a success
    // or properly call signIn if Credentials provider is ready.
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setIsLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex bg-white">
      {/* Left side: Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 relative bg-stone-900"
      >
        <img 
          src="/images/sofa_living.jpg"
          alt="Elegant Furniture" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-20 text-white">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-4xl lg:text-5xl font-serif mb-4 leading-tight"
           >
             Welcome Back to Satguru Industries
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="text-lg text-stone-200 max-w-md"
           >
             Discover premium, distinctly Indian furniture crafted for the modern home.
           </motion.p>
        </div>
      </motion.div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 bg-[#f8f7f5] lg:bg-white relative overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl lg:shadow-none lg:border-none border border-stone-100 my-8"
        >
        <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-orange-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Welcome Back</h1>
        <p className="text-stone-500 text-sm mb-8">Sign in to your Satguru Industries account to manage your orders and wishlist.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm text-stone-900 placeholder:text-stone-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm text-stone-900 placeholder:text-stone-400"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-orange-600 focus:ring-orange-500 accent-orange-600" />
              <span className="text-sm text-stone-600">Remember me</span>
            </label>
            <a href="#" className="text-sm font-medium text-orange-600 hover:underline">Forgot Password?</a>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-center text-sm text-stone-600 mt-8">
          Don&apos;t have an account? <Link href="/register" className="font-bold text-orange-600 hover:underline">Sign Up</Link>
        </p>
      </motion.div>
      </div>
    </main>
  );
}
