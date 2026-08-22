import React from 'react';
import Navbar from '@/components/Navbar';
import { Building2, Briefcase, Mail } from 'lucide-react';

export default function BulkOrderPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-serif text-stone-900 mb-6">Partner With Us for Bulk Orders</h1>
          <p className="text-stone-500 text-lg">
            Whether you are furnishing a new hotel, an entire office building, or a large residential project, our B2B team is here to provide exceptional quality at wholesale scale.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
          {/* Info Side */}
          <div className="flex-1 space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Commercial Spaces</h3>
                <p className="text-stone-500 text-sm">Durable, commercial-grade furniture tested for high-traffic environments like offices and retail.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Dedicated Account Manager</h3>
                <p className="text-stone-500 text-sm">You'll have a single point of contact from quotation to final delivery and installation.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Custom Manufacturing</h3>
                <p className="text-stone-500 text-sm">Need a specific design replicated 500 times? We own our supply chain and can manufacture to spec.</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="flex-1 w-full bg-[#f8f7f5] p-8 rounded-2xl border border-stone-200">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Request a B2B Quote</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">First Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-orange-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Company Name</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-orange-500" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-orange-500" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Project Details</label>
                <textarea rows={4} className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-orange-500"></textarea>
              </div>
              
              <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition-colors mt-2">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
