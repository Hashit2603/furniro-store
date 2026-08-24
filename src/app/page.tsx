import Navbar from "@/components/Navbar";
import CategoryRow from "@/components/CategoryRow";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CinematicHero from "@/components/CinematicHero";
import CinematicShowcase from "@/components/CinematicShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-orange-200">
      <Navbar />

      <main className="w-full overflow-hidden">
        <CinematicHero />
        
        <div className="bg-white relative z-20">
          <CategoryRow />
        </div>

        <CinematicShowcase />
        
        <div className="bg-white relative z-20 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-900 text-center uppercase tracking-wider">Complete Collection</h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>
          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}
