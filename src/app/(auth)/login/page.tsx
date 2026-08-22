"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    <main className="min-h-screen bg-[#f8f7f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-stone-100">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-orange-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">Welcome Back</h1>
        <p className="text-stone-500 text-sm mb-8">Sign in to your Furniro account to manage your orders and wishlist.</p>

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
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
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
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
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

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-600 mt-8">
          Don't have an account? <Link href="/register" className="font-bold text-orange-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}
