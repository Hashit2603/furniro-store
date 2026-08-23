"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Search, MapPin, User, Heart, ShoppingCart, Phone, Truck, HelpCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCategory } from '@/context/CategoryContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_CATEGORIES = [
  'Sofas', 'Living', 'Bedroom', 'Mattress', 'Dining', 'Storage', 
  'Study & Office', 'Outdoor', 'Decor & Furnishing', 'Interiors', 'New Arrivals'
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cartTotalCount, toggleCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useCategory();

  const [isAnimatingLogo, setIsAnimatingLogo] = useState(false);

  // Clear search when clicking a category
  const handleCategoryClick = (cat: string | null) => {
    setActiveCategory(cat);
    if (cat) setSearchQuery(''); // clear search when navigating to a specific category
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. Immediately clear categories and scroll to top
    handleCategoryClick(null);
    window.scrollTo({ top: 0 }); // instant scroll so it's ready behind the animation
    
    // 2. Trigger the overlay animation
    setIsAnimatingLogo(true);
    
    // 3. If we are on another page, navigate to home silently behind the overlay
    if (pathname !== '/') {
      router.push('/');
    }
    
    // 4. Hide the overlay after the animation sequence finishes
    setTimeout(() => {
      setIsAnimatingLogo(false);
    }, 800);
  };

  // Clear category when searching to avoid zero results
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) setActiveCategory(null);
  };

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const TRENDING_SEARCHES = ['King Size Bed', 'L-Shape Sofa', 'Dining Table 6 Seater', 'Wardrobe', 'Office Chair'];
  const filteredSuggestions = NAV_CATEGORIES.filter(cat => 
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);


  return (
    <>
      {/* Cinematic Logo Animation Overlay */}
      <AnimatePresence>
        {isAnimatingLogo && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Elegant breathing logo reveal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1.05, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-6 relative z-10"
            >
              <div className="bg-orange-600 text-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="font-serif font-bold text-6xl leading-none">S</span>
              </div>
              <span className="font-bold text-4xl md:text-5xl tracking-tight text-stone-900">
                Satguru <span className="text-orange-600">Industries</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-50">
        {/* Top Premium Utility Bar */}
        <div className="hidden md:flex bg-stone-900 text-stone-300 text-[11px] font-medium tracking-[0.05em] py-2.5 px-4 sm:px-8 justify-between items-center">
          <div className="flex items-center gap-6">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="/furniture" className="hover:text-white transition-colors flex items-center gap-1.5 uppercase">
                Furniture
              </Link>
            </motion.div>
            <span className="w-px h-3 bg-stone-700"></span>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="/home-interiors" className="hover:text-white transition-colors flex items-center gap-1.5 uppercase">
                Home Interiors
              </Link>
            </motion.div>
            <span className="w-px h-3 bg-stone-700"></span>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="/bulk-order" className="hover:text-white transition-colors flex items-center gap-1.5 uppercase">
                Bulk Order
              </Link>
            </motion.div>
            <span className="w-px h-3 bg-stone-700"></span>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5 uppercase">
                About Us
              </Link>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-6">
            <motion.div whileTap={{ scale: 0.95 }}>
              <a href="tel:+917505036616" className="flex items-center gap-1.5 hover:text-white transition-colors text-orange-500 font-bold tracking-wider">
                <Phone className="w-3.5 h-3.5" /> +91 7505036616
              </a>
            </motion.div>
            <span className="w-px h-3 bg-stone-700"></span>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="/track-order" className="flex items-center gap-1.5 hover:text-white transition-colors uppercase">
                <Truck className="w-3.5 h-3.5" /> Track Order
              </Link>
            </motion.div>
            <span className="w-px h-3 bg-stone-700"></span>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link href="/help-center" className="flex items-center gap-1.5 hover:text-white transition-colors uppercase">
                <HelpCircle className="w-3.5 h-3.5" /> Help Center
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
              <div className="bg-orange-600 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"><span className="font-serif font-bold text-2xl leading-none">S</span></div><span className="font-bold text-2xl tracking-tight text-stone-900">Satguru <span className="text-orange-600">Industries</span></span>
            </Link>

            {/* Search Bar */}
            <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl mx-12 relative z-[60]">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchFocused(false);
                    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder="Search Products, Color & More..."
                className="w-full pl-4 pr-12 py-2.5 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
              />
              <button 
                onClick={() => {
                  setIsSearchFocused(false);
                  document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-orange-600"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 shadow-2xl rounded-xl overflow-hidden py-4 z-[70]"
                  >
                    {!searchQuery ? (
                      <div className="px-4">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Trending Searches</h4>
                        <div className="flex flex-wrap gap-2">
                          {TRENDING_SEARCHES.map(term => (
                            <button
                              key={term}
                              onClick={() => {
                                setSearchQuery(term);
                                setIsSearchFocused(false);
                                document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-orange-100 hover:text-orange-700 text-stone-700 text-sm rounded-full transition-colors flex items-center gap-1.5"
                            >
                              <Search className="w-3 h-3 opacity-50" />
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="px-2">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 px-2">Suggestions</h4>
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((cat, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setSearchQuery(cat);
                                setIsSearchFocused(false);
                                document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-stone-50 text-stone-700 text-sm flex items-center gap-3 transition-colors"
                            >
                              <Search className="w-4 h-4 text-stone-400" />
                              <span dangerouslySetInnerHTML={{
                                __html: cat.replace(new RegExp(`(${searchQuery})`, 'gi'), '<strong class="text-orange-600">$1</strong>')
                              }} />
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-stone-500">
                            No results found for &quot;{searchQuery}&quot;
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              <button className="flex flex-col items-center gap-1 text-stone-600 hover:text-orange-600 transition-colors group">
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block text-[10px] font-medium">Stores</span>
              </button>
              {/* Profile Dropdown */}
              <div className="relative group">
                <motion.button 
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    if (!session) {
                      router.push('/login');
                    }
                  }}
                  className="flex flex-col items-center gap-1 text-stone-600 hover:text-orange-600 transition-colors group"
                >
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:block text-[10px] font-medium">{session ? session.user?.name || 'Profile' : 'Sign In'}</span>
                </motion.button>
                
                {session && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-stone-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    <div className="p-4 border-b border-stone-100 bg-stone-50">
                      <p className="text-sm font-bold text-stone-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-stone-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="p-2 flex flex-col">
                      <Link href="/profile" className="px-3 py-2 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors">My Profile</Link>
                      <Link href="/orders" className="px-3 py-2 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors">My Orders</Link>
                      <button 
                        onClick={() => signOut()}
                        className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 text-left rounded-md transition-colors w-full mt-1 border-t border-stone-100 pt-3"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <motion.button 
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.05 }}
                onClick={toggleWishlist}
                className="flex flex-col items-center gap-1 text-stone-600 hover:text-orange-600 transition-colors group relative"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block text-[10px] font-medium">Wishlist</span>
                <span className="absolute -top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[9px] flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.05 }}
                onClick={toggleCart}
                className="flex flex-col items-center gap-1 text-stone-600 hover:text-orange-600 transition-colors group relative"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:block text-[10px] font-medium">Cart</span>
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1 right-0 w-4 h-4 bg-orange-600 text-white text-[9px] flex items-center justify-center rounded-full">
                    {cartTotalCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul 
            className="flex items-center justify-between py-3 overflow-x-auto gap-4 text-[13px] font-medium text-stone-600"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {NAV_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              const isNewArrivals = cat === 'New Arrivals';
              
              return (
                <li 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`shrink-0 cursor-pointer transition-colors pb-1 border-b-2 ${
                    isActive 
                      ? 'border-orange-600 text-orange-600' 
                      : `border-transparent ${isNewArrivals ? 'text-orange-500 hover:text-orange-700' : 'hover:text-orange-600 hover:border-orange-600'}`
                  }`}
                >
                  {cat}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}





