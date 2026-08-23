"use client";

import React from 'react';
import * as motion from 'framer-motion/client';
import { Factory, Wrench, ShieldCheck, MapPin, Settings, CheckCircle2, ChevronRight, Ruler } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const machinery = [
    "Membrane Press Machine",
    "CNC Router",
    "Through-Feed Edge Banding Machine",
    "Panel Saw",
    "Multi-Boring Machine",
    "And other advanced woodworking equipment"
  ];

  const features = [
    "25+ Years of Experience",
    "Modern Manufacturing",
    "Quality Craftsmanship",
    "Latest Designs",
    "Customized Solutions",
    "Complete Interior Solutions"
  ];

  const products = [
    {
      title: "Doors",
      desc: "Solid Wood, Membrane Press, Veneer, Flush, Mesh, and Customized Designer Doors.",
      img: "/images/1.jpg"
    },
    {
      title: "Door & Window Frames",
      desc: "High-quality frames customized to your size, material, finish, color, and design specifications.",
      img: "/images/2.jpg"
    },
    {
      title: "Home Furniture",
      desc: "Wardrobes, Beds, Side Tables, TV Units, Dressing Tables, Cabinets, and Dining Furniture.",
      img: "/images/3.jpg"
    },
    {
      title: "Office Furniture",
      desc: "Workstations, Reception Desks, Conference Tables, Office Shelving, and Executive Furniture.",
      img: "/images/office.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-orange-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <img 
            src="/images/sofa_living.jpg" 
            alt="Universal Door Manufacturing" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
          >
            About Universal Door
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-stone-300 font-light"
          >
            Crafting Premium Doors, Frames & Furniture Since 1999
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">Our Story</h2>
            <div className="w-20 h-1.5 bg-orange-600 mb-8"></div>
            <p className="text-stone-600 leading-relaxed text-lg">
              Established in 1999, <strong>Universal Door</strong> is a trusted manufacturer of premium-quality doors, window and door frames, and furniture. With more than 25 years of industry experience, we combine skilled craftsmanship, modern technology, and innovative designs to create products that enhance the beauty, functionality, and durability of every space.
            </p>
            <p className="text-stone-600 leading-relaxed text-lg">
              We specialize in manufacturing products tailored to suit different architectural styles, interior concepts, and customer requirements.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src="/images/8.jpg" alt="Craftsmanship" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Facility & Equipment */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-4">Our Manufacturing Facility</h2>
            <p className="text-stone-500 max-w-2xl mx-auto text-lg">
              Equipped with advanced machinery and modern production technology to deliver perfection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {machinery.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-start gap-4"
              >
                <div className="bg-orange-100 p-3 rounded-lg text-orange-600 shrink-0">
                  <Settings className="w-6 h-6" />
                </div>
                <p className="text-stone-700 font-medium pt-1">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-4">Our Product Range</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            Comprehensive woodworking solutions under one roof.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden rounded-xl mb-6">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">{product.title}</h3>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customization */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Ruler className="w-16 h-16 text-orange-500 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Customized to Your Requirements</h2>
          <p className="text-stone-400 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            At Universal Door, we understand that every project is different. That is why we offer customized solutions based on your required size, design, material, finish, color, and specifications.
          </p>
          <p className="text-stone-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Our team works closely with customers, architects, interior designers, contractors, and project professionals to deliver products that combine quality, durability, functionality, and aesthetic appeal.
          </p>
        </div>
      </section>

      {/* Why Choose Us & Locations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Features */}
          <div>
            <h3 className="text-2xl font-bold text-stone-900 mb-8">Why Choose Universal Door?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-stone-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                  <span className="font-medium text-stone-700">{feature}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-stone-600 italic">
              "With more than two decades of experience, we continue to focus on quality manufacturing, modern designs, advanced technology, customization, and customer satisfaction, making Universal Door a reliable choice for residential, commercial, hospitality, and institutional projects."
            </p>
          </div>

          {/* Locations */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-stone-900 mb-8">Our Locations</h3>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white border border-stone-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-stone-900 p-3 rounded-full text-white shrink-0">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-stone-900 mb-2">Manufacturing Unit</h4>
                  <p className="text-stone-500 leading-relaxed">
                    12/10, Site-B, Industrial Area,<br />
                    Surajpur, Greater Noida, Uttar Pradesh
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white border border-stone-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 p-3 rounded-full text-white shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-stone-900 mb-2">Our Showroom</h4>
                  <p className="text-stone-500 leading-relaxed">
                    12/8, Site-B, Industrial Area,<br />
                    Surajpur, Greater Noida, Uttar Pradesh
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
