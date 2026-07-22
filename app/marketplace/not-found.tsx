import Link from "next/link";

export default function MarketplaceNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 text-5xl">
          🔍
        </div>

        <p className="mt-6 font-bold uppercase tracking-wider text-green-700">
          404 Error
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Listing Not Found
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          The marketplace listing or page you are looking for may have been
          removed, sold, or is no longer available.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/marketplace"
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Browse Marketplace
          </Link>

          <Link
            href="/marketplace/search"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Search Listings
          </Link>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block font-medium text-green-700 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}