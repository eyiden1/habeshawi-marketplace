import Link from "next/link";

export default function MyListingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Listings
            </h1>
            <p className="mt-2 text-gray-600">
              Manage all of your marketplace listings.
            </p>
          </div>

          <Link
            href="/post-ad"
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            + Post New Ad
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
            📦
          </div>

          <h2 className="text-2xl font-semibold">
            No Listings Yet
          </h2>

          <p className="mt-3 text-gray-600">
            You haven't posted any listings yet.
          </p>

          <Link
            href="/post-ad"
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Create Your First Listing
          </Link>
        </div>
      </div>
    </main>
  );
}