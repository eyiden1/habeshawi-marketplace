import Categories from "@/components/Categories";
import FeaturedListings from "@/components/FeaturedListings";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <Header />

      <Hero />

      <Categories />

      <section
        id="marketplace"
        className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 lg:grid-cols-3"
      >
       <div className="lg:col-span-2">
         <FeaturedListings />
       </div>

        <aside id="jobs">
          <LatestJobs />
        </aside>
      </section>

        <Footer />
    </main>
  );
}