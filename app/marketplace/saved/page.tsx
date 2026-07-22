import Image from "next/image";
import Link from "next/link";

const savedListings = [
  {
    id: "iphone-15-pro",
    title: "iPhone 15 Pro",
    price: "$750",
    location: "Silver Spring, MD",
    image: "/phone1.jpg",
    category: "Phones & Electronics",
  },
  {
    id: "toyota-camry",
    title: "Toyota Camry",
    price: "$18,500",
    location: "Washington, DC",
    image: "/cars1.jpg",
    category: "Cars",
  },
  {
    id: "restaurant-equipment",
    title: "Restaurant Equipment",
    price: "$4,500",
    location: "Alexandria, VA",
    image: "/sofa1.jpg",
    category: "Restaurant Equipment",
  },
];

export default function SavedListingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Saved Listings
          </h1>

          <p className="mt-2 text-gray-600">
            View the marketplace listings you saved.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedListings.map((listing) => (
            <article
              key={listing.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <Link href={`/marketplace/${listing.id}`}>
                <div className="relative h-56 w-full bg-gray-100">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="p-5">
                <p className="text-sm font-medium text-green-700">
                  {listing.category}
                </p>

                <Link href={`/marketplace/${listing.id}`}>
                  <h2 className="mt-2 text-xl font-bold text-gray-900 hover:text-green-700">
                    {listing.title}
                  </h2>
                </Link>

                <p className="mt-3 text-2xl font-bold text-green-700">
                  {listing.price}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {listing.location}
                </p>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/marketplace/${listing.id}`}
                    className="flex-1 rounded-lg bg-green-700 px-4 py-2.5 text-center font-semibold text-white hover:bg-green-800"
                  >
                    View Listing
                  </Link>

                  <button
                    type="button"
                    aria-label={`Remove ${listing.title} from saved listings`}
                    className="rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}