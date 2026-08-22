"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Phone, Mail, Package, CreditCard, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQS = [
  {
    category: "Delivery & Tracking",
    icon: <Package className="w-5 h-5" />,
    questions: [
      { q: "How do I track my order?", a: "You can track your order using the 'Track Order' link in the top menu. Enter your Order ID and Email to see real-time updates on your delivery status." },
      { q: "What are your delivery charges?", a: "Delivery charges vary based on your location and the size of the items. The final delivery cost will be calculated at checkout." },
      { q: "Do you deliver pan-India?", a: "Yes! We deliver to over 15,000 PIN codes across India through our specialized furniture delivery network." }
    ]
  },
  {
    category: "Returns & Refunds",
    icon: <RotateCcw className="w-5 h-5" />,
    questions: [
      { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for damaged or defective items. Custom-made furniture cannot be returned unless there is a manufacturing defect." },
      { q: "How long do refunds take?", a: "Once your return is picked up and inspected, refunds are processed within 5-7 business days to your original payment method." }
    ]
  },
  {
    category: "Payments & EMI",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      { q: "Do you offer No Cost EMI?", a: "Yes, we offer No Cost EMI options for up to 6 months on major credit cards for orders above ₹10,000." },
      { q: "What payment methods are accepted?", a: "We accept all major Credit/Debit cards, UPI, Net Banking, and select digital wallets." }
    ]
  }
];

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (idx: string) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">How can we help you?</h1>
          
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 rounded-full bg-white/10 border border-stone-600 focus:outline-none focus:border-orange-500 focus:bg-white focus:text-stone-900 transition-colors placeholder:text-stone-400"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 -mt-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12"
        >
          {FAQS.map((category, catIdx) => (
            <motion.div key={category.category} variants={itemVariants} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold text-stone-900">{category.category}</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => {
                  const uniqueId = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === uniqueId;
                  
                  // Simple search filter
                  if (searchQuery && !faq.q.toLowerCase().includes(searchQuery.toLowerCase()) && !faq.a.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return null;
                  }

                  return (
                    <div key={uniqueId} className="border border-stone-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => toggleFaq(uniqueId)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between bg-white hover:bg-stone-50 transition-colors focus:outline-none"
                      >
                        <span className="font-medium text-stone-900 pr-8">{faq.q}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 text-stone-400"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-5 py-4 bg-stone-50 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Contact Support Section */}
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-xl font-bold text-stone-900 mb-6 text-center">Still need help?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.a 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:support@furniro.com"
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-stone-200 text-center hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <Mail className="w-8 h-8 text-stone-400 group-hover:text-orange-600 mb-3 transition-colors" />
                <span className="font-medium text-stone-900 block mb-1">Email Us</span>
                <span className="text-xs text-stone-500">support@furniro.com</span>
              </motion.a>
              
              <motion.a 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-stone-200 text-center hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <Phone className="w-8 h-8 text-stone-400 group-hover:text-orange-600 mb-3 transition-colors" />
                <span className="font-medium text-stone-900 block mb-1">Call Us</span>
                <span className="text-xs text-stone-500">+91-9314444747</span>
              </motion.a>
              
              <motion.a 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-stone-200 text-center hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <MessageCircle className="w-8 h-8 text-stone-400 group-hover:text-orange-600 mb-3 transition-colors" />
                <span className="font-medium text-stone-900 block mb-1">Live Chat</span>
                <span className="text-xs text-stone-500">10 AM - 7 PM</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
