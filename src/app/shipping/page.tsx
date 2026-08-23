"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8">Shipping Information</h1>
        
        <div className="prose prose-stone max-w-none text-stone-600">
          <p className="lead text-lg mb-6">
            We are committed to delivering your premium furniture safely and on time. 
            Here is everything you need to know about our shipping and delivery processes.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Delivery Zones</h3>
          <p className="mb-4">
            We currently deliver to over 15,000 PIN codes across India. 
            Our specialized furniture delivery network ensures your items are handled with the utmost care from our warehouse to your living room.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Shipping Costs</h3>
          <p className="mb-4">
            Shipping charges are calculated dynamically based on your location and the volumetric weight of your order. 
            Free delivery is available in select metropolitan areas for orders exceeding our minimum threshold.
          </p>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">Estimated Delivery Times</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Standard Items:</strong> 5-10 business days</li>
            <li><strong>Custom Furniture:</strong> 3-5 weeks depending on manufacturing complexity</li>
            <li><strong>Accessories & Decor:</strong> 3-5 business days</li>
          </ul>

          <h3 className="text-2xl font-bold text-stone-900 mt-10 mb-4">White Glove Delivery</h3>
          <p className="mb-4">
            For premium and oversized items, we offer a complimentary White Glove Delivery service. 
            Our professionals will unbox, assemble, and place the furniture in your room of choice, and remove all packaging materials.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}