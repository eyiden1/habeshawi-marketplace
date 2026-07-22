import Link from "next/link";

export default function MarketplaceSettingsPage() {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Marketplace Settings
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your marketplace preferences and notifications.
            </p>
          </div>

          <form className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900">
                Notifications
              </h2>

              <div className="mt-4 space-y-4">
                <label className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      New Messages
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Receive notifications when someone sends you a message.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="newMessages"
                    defaultChecked
                    className="mt-1 h-5 w-5 accent-green-700"
                  />
                </label>

                <label className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Listing Activity
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Receive updates when someone saves or contacts you about a listing.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="listingActivity"
                    defaultChecked
                    className="mt-1 h-5 w-5 accent-green-700"
                  />
                </label>

                <label className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Marketplace News
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      Receive community updates, safety notices, and new feature announcements.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="marketplaceNews"
                    className="mt-1 h-5 w-5 accent-green-700"
                  />
                </label>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Contact Preferences
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="contactMethod"
                  className="mb-2 block font-semibold text-gray-800"
                >
                  Preferred Contact Method
                </label>

                <select
                  id="contactMethod"
                  name="contactMethod"
                  defaultValue="marketplace-messages"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                >
                  <option value="marketplace-messages">
                    Marketplace Messages
                  </option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Default Listing Location
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="location"
                  className="mb-2 block font-semibold text-gray-800"
                >
                  City or ZIP Code
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  defaultValue="Silver Spring, MD"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Language
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="language"
                  className="mb-2 block font-semibold text-gray-800"
                >
                  Marketplace Language
                </label>

                <select
                  id="language"
                  name="language"
                  defaultValue="english"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                >
                  <option value="english">English</option>
                  <option value="amharic">Amharic</option>
                </select>
              </div>
            </section>

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
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}