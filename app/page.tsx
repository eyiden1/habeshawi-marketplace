import Categories from "@/components/Categories";
import FeaturedListings from "@/components/FeaturedListings";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <Header />

      {/* Main rental search area */}
      <Hero />

      {/* Rooms, apartments, houses, basements, and roommates */}
      <Categories />

      {/* Existing rental listings */}
      <section
        id="rentals"
        className="mx-auto max-w-7xl px-6 pb-16"
      >
        <FeaturedListings />
      </section>

      <Footer />
    </main>
  );
}