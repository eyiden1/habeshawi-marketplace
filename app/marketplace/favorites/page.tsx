import Image from "next/image";
import Link from "next/link";

const favoriteListings = [
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
];

export default function MarketplaceFavoritesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/marketplace"
              className="font-medium text-green-700 hover:underline"
            >
              ← Back to Marketplace
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Favorite Listings
            </h1>

            <p className="mt-2 text-gray-600">
              Keep track of marketplace items you are interested in.
            </p>
          </div>

          <Link
            href="/marketplace/search"
            className="rounded-lg bg-green-700 px-5 py-3 text-center font-semibold text-white hover:bg-green-800"
          >
            Find More Listings
          </Link>
        </div>

        {favoriteListings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteListings.map((listing) => (
              <article
                key={listing.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <Link href={`/marketplace/${listing.id}`}>
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow">
                      ❤️
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <p className="text-sm font-semibold text-green-700">
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
                      className="rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-5xl">❤️</div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Favorites Yet
            </h2>

            <p className="mt-3 text-gray-600">
              Save listings you like so you can find them again easily.
            </p>

            <Link
              href="/marketplace"
              className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Browse Marketplace
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}