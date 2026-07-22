import Link from "next/link";

const sections = [
  {
    title: "Rentals",
    amharic: "የሚከራይ ቤቶች",
    icon: "🏠",
    description:
      "Rooms, apartments, houses, basements, commercial spaces and roommates.",
    href: "/housing",
    button: "Browse Rentals",
    color: "bg-green-50",
  },
  {
    title: "Marketplace",
    amharic: "ገበያ",
    icon: "🛍️",
    description:
      "Buy and sell cars, phones, furniture, electronics and community services.",
    href: "/marketplace",
    button: "Shop Marketplace",
    color: "bg-blue-50",
  },
  {
    title: "Promotions",
    amharic: "ማስታወቂያ",
    icon: "📢",
    description:
      "Discover restaurants, grocery stores, events, sales and featured businesses.",
    href: "/businesses",
    button: "View Promotions",
    color: "bg-yellow-50",
  },
  {
    title: "Jobs",
    amharic: "ስራ",
    icon: "💼",
    description:
      "Find your next opportunity or connect with qualified employees.",
    href: "/jobs",
    button: "Find Jobs",
    color: "bg-purple-50",
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-4xl font-black text-[#064d2b]">
          Explore Habeshawi Marketplace
        </h2>

        <p className="mt-4 text-xl text-gray-600">
          Buy • Sell • Rent • Find Jobs • Promote Your Business
        </p>

        <p className="mt-2 font-semibold text-[#087531]">
          ይግዙ • ይሽጡ • ይከራዩ • ስራ ያግኙ • ንግድዎን ያስተዋውቁ
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className={`${section.color} group rounded-3xl border border-gray-200 p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
          >
            <div className="text-6xl">{section.icon}</div>

            <h3 className="mt-6 text-2xl font-black text-[#064d2b]">
              {section.title}
            </h3>

            <p className="mt-2 text-lg font-semibold text-[#087531]">
              {section.amharic}
            </p>

            <p className="mt-5 min-h-[90px] text-gray-600 leading-7">
              {section.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="rounded-full bg-white px-5 py-2 text-sm font-bold shadow">
                {section.button}
              </span>

              <span className="text-2xl transition group-hover:translate-x-2">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}