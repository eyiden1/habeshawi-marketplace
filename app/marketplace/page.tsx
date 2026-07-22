import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import MarketplaceCard from "@/components/marketplace/MarketplaceCard";
import { getMarketplaceListings } from "@/lib/marketplace/queries";

const demoListings = [
  {
    id: "toyota-camry",
    title: "Toyota Camry",
    price: 12500,
    city: "Silver Spring",
    state: "MD",
    imageUrl: "/listings/car.jpg",
    condition: "Used",
    featured: true,
  },
  {
    id: "iphone-for-sale",
    title: "iPhone for Sale",
    price: 500,
    city: "Alexandria",
    state: "VA",
    imageUrl: "/listings/iphone.jpg",
    condition: "Like New",
    featured: true,
  },
  {
    id: "restaurant-equipment",
    title: "Restaurant Equipment",
    price: 4500,
    city: "Rockville",
    state: "MD",
    imageUrl: "/listings/restaurant-equipment.jpg",
    condition: "Used",
    featured: true,
  },
  {
    id: "living-room-sofa",
    title: "Living Room Sofa",
    price: 650,
    city: "Washington",
    state: "DC",
    imageUrl: "/listings/sofa.jpg",
    condition: "Excellent",
    featured: false,
  },
];

export default async function MarketplacePage() {
  const liveListings = await getMarketplaceListings();

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Marketplace"
          description="Buy and sell cars, phones, furniture, restaurant equipment, electronics, and more within the Ethiopian and Eritrean community."
        />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              placeholder="Search listings..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]"
            />

            <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]">
              <option>All Categories</option>
              <option>Cars</option>
              <option>Phones</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Clothing</option>
              <option>Restaurant Equipment</option>
            </select>

            <button className="rounded-xl bg-[#087531] px-8 py-3 font-bold text-white hover:bg-[#065f28]">
              Search
            </button>

            <Link
              href="/marketplace/post"
              className="rounded-xl bg-yellow-400 px-8 py-3 text-center font-bold text-black hover:bg-yellow-300"
            >
              + Post Item
            </Link>
          </div>
        </section>

        {liveListings.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-[#064d2b]">
                Community Listings
              </h2>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-[#064d2b]">
                {liveListings.length} Live
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {liveListings.map((listing) => (
                <MarketplaceCard
                  key={listing.id}
                  href={`/marketplace/${listing.id}`}
                  image={listing.imageUrl || "/eth.png"}
                  title={listing.title}
                  location={`${listing.city}, ${listing.state}`}
                  price={listing.price}
                  featured={listing.featured}
                  condition={listing.condition}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-[#064d2b]">
              Featured Listings
            </h2>

            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-[#064d2b]">
              Demo Listings
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {demoListings.map((listing) => (
              <MarketplaceCard
                key={listing.id}
                href={`/marketplace/${listing.id}`}
                image={listing.imageUrl}
                title={listing.title}
                location={`${listing.city}, ${listing.state}`}
                price={listing.price}
                featured={listing.featured}
                condition={listing.condition}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}