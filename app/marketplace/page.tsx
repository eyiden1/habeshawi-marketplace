import PageHeader from "@/components/layout/PageHeader";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        <PageHeader
          title="Marketplace"
          description="Browse thousands of listings from the Ethiopian community."
        />

        <div className="rounded-2xl border bg-white p-8 shadow">
          <p className="text-lg">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
  <form className="flex flex-col gap-4 md:flex-row">
    <input
      type="text"
      placeholder="Search cars, furniture, electronics..."
      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]"
    />

    <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]">
      <option>All Categories</option>
      <option>Cars</option>
      <option>Furniture</option>
      <option>Electronics</option>
      <option>Restaurant Equipment</option>
    </select>

    <button
      type="submit"
      className="rounded-xl bg-[#087531] px-8 py-3 font-semibold text-white hover:bg-[#065f28]"
    >
      Search
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

<MarketplaceCard
  title="Toyota Camry"
  price={12500}
  location="Silver Spring, MD"
  image="/listings/car.jpg"
  href="/marketplace/toyota-camry"
/>

<MarketplaceCard
  title="Living Room Sofa"
  price={650}
  location="Washington, DC"
  image="/listings/sofa.jpg"
  href="/marketplace/living-room-sofa"
/>

<MarketplaceCard
  title="iPhone for Sale"
  price={500}
  location="Alexandria, VA"
  image="/listings/iphone.jpg"
  href="/marketplace/iphone-for-sale"
/>

<MarketplaceCard
  title="Restaurant Equipment"
  price={4500}
  location="Rockville, MD"
  image="/listings/restaurant-equipment.jpg"
  href="/marketplace/restaurant-equipment"
/>
</div>
    </button>
  </form>
</div>
          </p>

          <p className="mt-4">
            Soon you'll be able to search, filter, and post marketplace listings here.
          </p>
        </div>

      </div>
    </main>
  );
}