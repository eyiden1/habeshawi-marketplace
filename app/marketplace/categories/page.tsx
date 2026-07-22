import Link from "next/link";

const categories = [
  {
    name: "Cars",
    description: "Browse cars, SUVs, trucks, and other vehicles.",
    icon: "🚗",
    href: "/marketplace?category=cars",
  },
  {
    name: "Phones & Electronics",
    description: "Find phones, laptops, TVs, and electronic devices.",
    icon: "📱",
    href: "/marketplace?category=electronics",
  },
  {
    name: "Furniture",
    description: "Shop for sofas, tables, chairs, beds, and home furniture.",
    icon: "🛋️",
    href: "/marketplace?category=furniture",
  },
  {
    name: "Restaurant Equipment",
    description: "Buy and sell commercial kitchen and restaurant equipment.",
    icon: "🍽️",
    href: "/marketplace?category=restaurant-equipment",
  },
  {
    name: "Services",
    description: "Discover local community services and professionals.",
    icon: "🛠️",
    href: "/marketplace?category=services",
  },
  {
    name: "Other",
    description: "Browse additional items and community listings.",
    icon: "📦",
    href: "/marketplace?category=other",
  },
];

export default function MarketplaceCategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <Link
            href="/marketplace"
            className="font-medium text-green-700 hover:underline"
          >
            ← Back to Marketplace
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Marketplace Categories
          </h1>

          <p className="mt-2 text-gray-600">
            Choose a category to find the items or services you need.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                {category.icon}
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {category.name}
              </h2>

              <p className="mt-2 leading-7 text-gray-600">
                {category.description}
              </p>

              <p className="mt-5 font-semibold text-green-700">
                View listings →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}