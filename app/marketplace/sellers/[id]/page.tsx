import Image from "next/image";
import Link from "next/link";

type SellerProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const sellerListings = [
  {
    id: "iphone-15-pro",
    title: "iPhone 15 Pro",
    price: "$750",
    location: "Silver Spring, MD",
    image: "/phone1.jpg",
  },
  {
    id: "toyota-camry",
    title: "Toyota Camry",
    price: "$18,500",
    location: "Washington, DC",
    image: "/cars1.jpg",
  },
];

export default async function SellerProfilePage({
  params,
}: SellerProfilePageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/marketplace"
          className="font-medium text-green-700 hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-4xl font-bold text-green-700">
              ST
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Samuel T.
              </h1>

              <p className="mt-2 text-gray-600">
                Marketplace seller in Silver Spring, Maryland.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-800">
                  Verified Seller
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                  Member since 2026
                </span>

                <span className="rounded-full bg-yellow-100 px-3 py-1 font-medium text-yellow-800">
                  ⭐ 4.9 Rating
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Seller ID: {id}
              </p>
            </div>

            <Link
              href={`/marketplace/messages/${id}`}
              className="rounded-lg bg-green-700 px-6 py-3 text-center font-semibold text-white hover:bg-green-800"
            >
              Message Seller
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Listings from Samuel
            </h2>

            <p className="mt-2 text-gray-600">
              Browse active marketplace listings from this seller.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sellerListings.map((listing) => (
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
                  <Link href={`/marketplace/${listing.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-green-700">
                      {listing.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-2xl font-bold text-green-700">
                    {listing.price}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    {listing.location}
                  </p>

                  <Link
                    href={`/marketplace/${listing.id}`}
                    className="mt-5 block rounded-lg bg-green-700 px-4 py-2.5 text-center font-semibold text-white hover:bg-green-800"
                  >
                    View Listing
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Seller Safety Information
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Meet in a safe public place, inspect the item carefully, and confirm
            the listing details before making payment.
          </p>
        </section>
      </div>
    </main>
  );
}