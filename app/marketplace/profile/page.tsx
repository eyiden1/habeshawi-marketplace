import Link from "next/link";

export default function MarketplaceProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/marketplace"
          className="font-medium text-green-700 hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 border-b border-gray-200 pb-8 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
              EY
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Marketplace Profile
              </h1>

              <p className="mt-2 text-gray-600">
                Manage the information buyers and sellers can see.
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="displayName"
                className="mb-2 block font-semibold text-gray-800"
              >
                Display Name
              </label>

              <input
                id="displayName"
                name="displayName"
                type="text"
                defaultValue="Endalkachew Y."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block font-semibold text-gray-800"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                defaultValue="Silver Spring, MD"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block font-semibold text-gray-800"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <p className="mt-2 text-sm text-gray-500">
                Your phone number will remain private unless you choose to share
                it on a listing.
              </p>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block font-semibold text-gray-800"
              >
                About Me
              </label>

              <textarea
                id="bio"
                name="bio"
                rows={5}
                defaultValue="Habeshawi Marketplace community member serving the Washington, DC metropolitan area."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h2 className="font-bold text-green-900">
                Marketplace Reputation
              </h2>

              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-gray-500">Active Listings</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">3</p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-gray-500">Completed Sales</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">0</p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-gray-500">Member Since</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">2026</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/marketplace"
                className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}