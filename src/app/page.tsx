import Navbar from "@/components/Navbar";
import CategoryRow from "@/components/CategoryRow";
import ProductGrid from "@/components/ProductGrid";
import HeroCarousel from "@/components/HeroCarousel";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-orange-200">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-12 overflow-hidden">
        <HeroCarousel />


      </main>

      <CategoryRow />
      
      <ProductGrid />

    </div>
  );
}
