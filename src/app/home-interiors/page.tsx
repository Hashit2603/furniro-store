import React from 'react';
import Navbar from '@/components/Navbar';
import { Palette, PenTool, Home } from 'lucide-react';

export default function HomeInteriorsPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            <div className="p-12 md:p-16 lg:p-24 flex flex-col justify-center">
              <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-4">Furniro Interiors</span>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
                Transform your home with our experts.
              </h1>
              <p className="text-stone-600 mb-10 leading-relaxed">
                Book a consultation with our award-winning interior designers. We provide end-to-end solutions from spatial planning to bespoke furniture curation tailored exactly to your lifestyle.
              </p>
              
              <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-colors self-start">
                Book Free Consultation
              </button>
            </div>
            
            <div className="relative h-[400px] md:h-auto bg-stone-200">
              <img 
                src="/images/2.jpg" 
                alt="Beautiful Interior" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-2xl border border-stone-100 text-center shadow-sm">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-3">Custom Curation</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Our designers handpick textures, materials, and colors that resonate with your personal style.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-stone-100 text-center shadow-sm">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-3">Spatial Planning</h3>
            <p className="text-stone-500 text-sm leading-relaxed">Optimize your living space for both functionality and aesthetic beauty with our precise 3D plans.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-stone-100 text-center shadow-sm">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-3">End-to-End Execution</h3>
            <p className="text-stone-500 text-sm leading-relaxed">From manufacturing to final installation, we handle everything so you can simply walk into your dream home.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
