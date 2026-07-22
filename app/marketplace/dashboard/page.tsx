import Link from "next/link";

const dashboardCards = [
  {
    title: "My Listings",
    description: "View, edit, or remove your marketplace ads.",
    value: "3",
    icon: "📦",
    href: "/marketplace/my-listings",
  },
  {
    title: "Messages",
    description: "Read messages from buyers and sellers.",
    value: "1 new",
    icon: "💬",
    href: "/marketplace/messages",
  },
  {
    title: "Favorites",
    description: "View the listings you saved.",
    value: "2",
    icon: "❤️",
    href: "/marketplace/favorites",
  },
  {
    title: "Notifications",
    description: "Review your latest marketplace activity.",
    value: "2 new",
    icon: "🔔",
    href: "/marketplace/notifications",
  },
];

const recentListings = [
  {
    id: "iphone-15-pro",
    title: "iPhone 15 Pro",
    price: "$750",
    status: "Active",
    views: 28,
  },
  {
    id: "toyota-camry",
    title: "Toyota Camry",
    price: "$18,500",
    status: "Active",
    views: 45,
  },
  {
    id: "restaurant-equipment",
    title: "Restaurant Equipment",
    price: "$4,500",
    status: "Active",
    views: 17,
  },
];

export default function MarketplaceDashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/marketplace"
              className="font-medium text-green-700 hover:underline"
            >
              ← Back to Marketplace
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Marketplace Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your listings, messages, favorites, and account.
            </p>
          </div>

          <Link
            href="/post-ad"
            className="rounded-lg bg-green-700 px-6 py-3 text-center font-semibold text-white hover:bg-green-800"
          >
            + Post New Ad
          </Link>
        </div>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                  {card.icon}
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-800">
                  {card.value}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {card.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {card.description}
              </p>

              <p className="mt-4 font-semibold text-green-700">
                Open →
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Listings
              </h2>

              <p className="mt-1 text-gray-600">
                Review the performance of your marketplace ads.
              </p>
            </div>

            <Link
              href="/marketplace/my-listings"
              className="font-semibold text-green-700 hover:underline"
            >
              View All Listings
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">Listing</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Views</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {recentListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="border-t border-gray-200"
                  >
                    <td className="px-6 py-5">
                      <Link
                        href={`/marketplace/${listing.id}`}
                        className="font-bold text-gray-900 hover:text-green-700"
                      >
                        {listing.title}
                      </Link>
                    </td>

                    <td className="px-6 py-5 font-semibold text-green-700">
                      {listing.price}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                        {listing.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {listing.views}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-4">
                        <Link
                          href={`/marketplace/my-listings/${listing.id}/edit`}
                          className="font-semibold text-green-700 hover:underline"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/marketplace/my-listings/${listing.id}/delete`}
                          className="font-semibold text-red-600 hover:underline"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Account
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              Update your public profile and marketplace preferences.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/marketplace/profile"
                className="rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white hover:bg-green-800"
              >
                Edit Profile
              </Link>

              <Link
                href="/marketplace/settings"
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Settings
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-xl font-bold text-green-900">
              Marketplace Safety
            </h2>

            <p className="mt-2 leading-7 text-green-800">
              Review safety recommendations before meeting buyers or sellers.
            </p>

            <Link
              href="/marketplace/help"
              className="mt-5 inline-block rounded-lg bg-green-800 px-5 py-2.5 font-semibold text-white hover:bg-green-900"
            >
              Visit Safety Center
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}