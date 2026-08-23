"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8">Returns & Refunds</h1>
        
        <div className="prose prose-stone max-w-none text-stone-600">
          <p className="lead text-lg mb-6">
            We want you to be completely satisfied with your Satguru Industries furniture. 
            If you change your mind, we offer a straightforward return policy.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">7-Day Return Policy</h3>
          <p className="mb-4">
            We accept returns within 7 days of delivery for most standard items. 
            To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Non-Returnable Items</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Custom-made or personalized furniture</li>
            <li>Items marked as "Final Sale"</li>
            <li>Products that have been assembled or modified</li>
            <li>Items without original packaging</li>
          </ul>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Refund Process</h3>
          <p className="mb-4">
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. 
            If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}