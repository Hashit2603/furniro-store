"use client";

import React from 'react';
import { ChevronDown, Star, Check } from 'lucide-react';

const CheckboxItem = ({ label }: { label: string }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <label className="flex items-center gap-2 cursor-pointer group mb-2.5">
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked} 
        onChange={(e) => setChecked(e.target.checked)} 
      />
      <div className={`w-4 h-4 border rounded-[3px] flex items-center justify-center transition-colors ${
        checked 
          ? "bg-orange-600 border-orange-600" 
          : "bg-white border-stone-300 group-hover:border-orange-500"
      }`}>
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
      </div>
      <span className="text-[13px] text-stone-700">{label}</span>
    </label>
  );
};

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
  return (
    <div className="w-full bg-white pr-4 hidden md:block">
      
      {/* Delivery Day */}
      <FilterSection title="Delivery Day">
        <CheckboxItem label="Get It by Tomorrow" />
        <CheckboxItem label="Get It in 2 Days" />
      </FilterSection>
      
      {/* Brands */}
      <FilterSection title="Brands" showSeeMore>
        <CheckboxItem label="Satguru Industries" />
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

