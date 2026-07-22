import Categories from "@/components/Categories";
import FeaturedListings from "@/components/FeaturedListings";
import FeaturedPromotions from "@/components/FeaturedPromotions";
import MarketplaceListings from "@/components/MarketplaceListings";
import LatestJobs from "@/components/LatestJobs";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <Header />

      <Hero />

      <Categories />

      <section
        id="rentals"
        className="mx-auto max-w-7xl px-6 pb-16"
      >
        <FeaturedListings />
      </section>

      <FeaturedPromotions />

      <MarketplaceListings />

      <LatestJobs />

      <Footer />
    </main>
  );
}