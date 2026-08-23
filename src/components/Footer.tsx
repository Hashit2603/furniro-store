import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
                <span className="font-serif font-bold text-2xl leading-none">S</span>
              </div>
              <h3 className="text-white text-2xl font-bold tracking-tight">
                Satguru <span className="text-orange-500">Industries</span>
              </h3>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Crafting premium, sustainable furniture that transforms houses into modern sanctuaries. Excellence in every detail since 2010.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-400">
                  45/2 Industrial Estate Phase-II,<br />
                  Okhla, New Delhi 110020, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="tel:+917505036616" className="text-sm text-stone-400 hover:text-white transition-colors">
                  +91 7505036616
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:info@satguruindustries.com" className="text-sm text-stone-400 hover:text-white transition-colors">
                  info@satguruindustries.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 uppercase tracking-wider">Collections</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Living Room</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Bedroom Setup</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Dining & Kitchen</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Office Furniture</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Outdoor Patio</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/help-center" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Help Center</Link></li>
              <li><Link href="/track-order" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Shipping Information</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter & Socials */}
          <div className="space-y-8">
            <div>
              <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider">Stay Updated</h4>
              <p className="text-sm text-stone-400 mb-4">Subscribe to our newsletter for exclusive offers and design inspiration.</p>
              <div className="flex bg-stone-800 rounded-md p-1 border border-stone-700 focus-within:border-orange-500 transition-colors">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent w-full px-3 text-sm text-white outline-none placeholder:text-stone-500" 
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white transition-all">
                  <FacebookIcon />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white transition-all">
                  <InstagramIcon />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white transition-all">
                  <TwitterIcon />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-orange-600 hover:text-white transition-all">
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Satguru Industries. All rights reserved.</p>
          <div className="flex gap-4 font-medium text-stone-400">
            <span>Secure Payments:</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

