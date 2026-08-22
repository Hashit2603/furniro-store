"use client";

import React, { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

const CheckboxItem = ({ label }: { label: string }) => (
  <label className="flex items-center gap-2 cursor-pointer group mb-2.5">
    <div className="w-4 h-4 border border-stone-300 rounded-[3px] bg-white group-hover:border-orange-500 flex items-center justify-center transition-colors">
      {/* Checked state would go here, omitting for pure UI mockup */}
    </div>
    <span className="text-[13px] text-stone-700">{label}</span>
  </label>
);

const FilterSection = ({ title, children, showSeeMore = false }: { title: string, children: React.ReactNode, showSeeMore?: boolean }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold text-stone-900 mb-3">{title}</h3>
    {children}
    {showSeeMore && (
      <button className="text-[13px] text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1 mt-1">
        <ChevronDown className="w-3 h-3" /> See more
      </button>
    )}
  </div>
);

export default function SidebarFilter() {
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(300000);
  const MAX_PRICE = 300000;

  return (
    <div className="w-full bg-white pr-4 hidden md:block">
      
      {/* Delivery Day */}
      <FilterSection title="Delivery Day">
        <CheckboxItem label="Get It by Tomorrow" />
        <CheckboxItem label="Get It in 2 Days" />
      </FilterSection>
      
      {/* Brands */}
      <FilterSection title="Brands" showSeeMore>
        <CheckboxItem label="Furniro" />
        <CheckboxItem label="Godrej Interio" />
        <CheckboxItem label="Urban Ladder" />
        <CheckboxItem label="WoodenStreet" />
        <CheckboxItem label="Pepperfry" />
      </FilterSection>
      
      {/* Customer Reviews */}
      <FilterSection title="Customer Reviews">
        <div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 mb-2">
          <div className="flex text-orange-500">
            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 text-stone-300" />
          </div>
          <span className="text-[13px] text-stone-700">& Up</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 mb-2">
          <div className="flex text-orange-500">
            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 text-stone-300" /><Star className="w-4 h-4 text-stone-300" />
          </div>
          <span className="text-[13px] text-stone-700">& Up</span>
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <div className="text-[13px] text-stone-700 mb-4 font-medium">
          ₹{minPrice.toLocaleString('en-IN')} - {maxPrice >= MAX_PRICE ? `₹${MAX_PRICE.toLocaleString('en-IN')}+` : `₹${maxPrice.toLocaleString('en-IN')}`}
        </div>
        
        {/* Interactive Dual Slider */}
        <div className="relative h-1 bg-stone-200 rounded-full mb-8 mt-2">
          {/* Active Range Track */}
          <div 
            className="absolute top-0 h-full bg-orange-600 rounded-full pointer-events-none"
            style={{ 
              left: `${(minPrice / MAX_PRICE) * 100}%`, 
              right: `${100 - (maxPrice / MAX_PRICE) * 100}%` 
            }}
          />
          
          <input 
            type="range" 
            min="0" max={MAX_PRICE} step="1000"
            value={minPrice} 
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 5000))}
            className="price-slider absolute top-1/2 -translate-y-1/2 w-full m-0"
            style={{ zIndex: minPrice > MAX_PRICE - 20000 ? 5 : 3 }}
          />
          <input 
            type="range" 
            min="0" max={MAX_PRICE} step="1000"
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 5000))}
            className="price-slider absolute top-1/2 -translate-y-1/2 w-full m-0"
            style={{ zIndex: 4 }}
          />
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .price-slider {
            -webkit-appearance: none;
            appearance: none;
            background: transparent;
            pointer-events: none;
            outline: none;
          }
          .price-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            pointer-events: auto;
            width: 16px;
            height: 16px;
            background: white;
            border: 2px solid #ea580c;
            border-radius: 50%;
            cursor: grab;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
          .price-slider::-webkit-slider-thumb:active {
            cursor: grabbing;
          }
          .price-slider::-moz-range-thumb {
            pointer-events: auto;
            width: 16px;
            height: 16px;
            background: white;
            border: 2px solid #ea580c;
            border-radius: 50%;
            cursor: grab;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
          .price-slider::-moz-range-thumb:active {
            cursor: grabbing;
          }
        `}} />

        <ul className="space-y-2 text-[13px] text-stone-700">
          <li className="cursor-pointer hover:text-orange-600" onClick={() => { setMinPrice(0); setMaxPrice(10000); }}>Up to ₹10,000</li>
          <li className="cursor-pointer hover:text-orange-600" onClick={() => { setMinPrice(10000); setMaxPrice(25000); }}>₹10,000 - ₹25,000</li>
          <li className="cursor-pointer hover:text-orange-600" onClick={() => { setMinPrice(25000); setMaxPrice(50000); }}>₹25,000 - ₹50,000</li>
          <li className="cursor-pointer hover:text-orange-600" onClick={() => { setMinPrice(50000); setMaxPrice(MAX_PRICE); }}>Over ₹50,000</li>
        </ul>
      </FilterSection>
      
      {/* Deals & Discounts */}
      <FilterSection title="Deals & Discounts">
        <ul className="space-y-2 text-[13px] text-stone-700 mb-4">
          <li className="cursor-pointer hover:text-orange-600">All Discounts</li>
          <li className="cursor-pointer hover:text-orange-600">Buy More, Save More</li>
          <li className="cursor-pointer hover:text-orange-600">Today&apos;s Deals</li>
        </ul>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        <ul className="space-y-2 text-[13px] text-stone-700">
          <li className="cursor-pointer hover:text-orange-600">10% Off or more</li>
          <li className="cursor-pointer hover:text-orange-600">25% Off or more</li>
          <li className="cursor-pointer hover:text-orange-600">35% Off or more</li>
          <li className="cursor-pointer hover:text-orange-600">50% Off or more</li>
        </ul>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Material" showSeeMore>
        <CheckboxItem label="Teak Wood" />
        <CheckboxItem label="Engineered Wood" />
        <CheckboxItem label="Metal" />
        <CheckboxItem label="Fabric" />
      </FilterSection>
      
      {/* Pay On Delivery */}
      <FilterSection title="Pay On Delivery">
        <CheckboxItem label="Eligible for Pay On Delivery" />
      </FilterSection>
      
      {/* Availability */}
      <FilterSection title="Availability">
        <CheckboxItem label="Include Out of Stock" />
      </FilterSection>
      
      {/* Item Condition */}
      <FilterSection title="Item Condition">
        <CheckboxItem label="New" />
      </FilterSection>

    </div>
  );
}
