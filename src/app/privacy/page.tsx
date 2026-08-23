"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none text-stone-600">
          <p className="lead text-lg mb-6">
            At Satguru Industries, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Information We Collect</h3>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you create an account, make a purchase, or contact customer support. 
            This may include your name, email address, phone number, shipping address, and payment information.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">How We Use Your Information</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your order status</li>
            <li>To send you marketing communications (if you have opted in)</li>
            <li>To improve our website and customer service</li>
          </ul>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Data Protection</h3>
          <p className="mb-4">
            We implement a variety of security measures to maintain the safety of your personal information. 
            All payment transactions are processed through a secure gateway provider and are not stored or processed on our servers.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Contact Us</h3>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact our support team.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}