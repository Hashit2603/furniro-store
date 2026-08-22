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

        {/* Sale Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 border border-[#f0c399] bg-white rounded-md p-4 flex flex-col md:flex-row items-center justify-between shadow-sm gap-4"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="block text-xl font-bold text-red-600">SALE</span>
              <span className="text-[10px] text-red-600 uppercase font-medium">Ends In</span>
            </div>
            <div className="flex gap-2 text-red-600 text-2xl font-light">
              <div className="flex flex-col items-center"><span>02</span><span className="text-[9px] text-stone-500 uppercase">Days</span></div> :
              <div className="flex flex-col items-center"><span>18</span><span className="text-[9px] text-stone-500 uppercase">Hrs</span></div> :
              <div className="flex flex-col items-center"><span>59</span><span className="text-[9px] text-stone-500 uppercase">Mins</span></div> :
              <div className="flex flex-col items-center"><span>56</span><span className="text-[9px] text-stone-500 uppercase">Secs</span></div>
            </div>
          </div>
          
          <div className="bg-[#e97d26] text-white px-8 py-3 rounded-md flex items-center gap-2">
            <span className="text-sm font-medium uppercase">Upto</span>
            <span className="text-3xl font-bold">₹25,000*</span>
            <span className="text-sm font-medium leading-tight">Instant<br/>Discount</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded">On EMI Txn.</div>
          </div>
        </motion.div>
      </main>

      <CategoryRow />
      
      <ProductGrid />

    </div>
  );
}
