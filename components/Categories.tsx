import Link from "next/link";

const categories = [
  {
    icon: "🛏️",
    title: "Rooms",
    amharic: "ክፍል",
    href: "/housing/rooms",
    color: "bg-green-50",
  },
  {
    icon: "🏢",
    title: "Apartments",
    amharic: "አፓርታማ",
    href: "/housing/apartments",
    color: "bg-blue-50",
  },
  {
    icon: "🏡",
    title: "Houses",
    amharic: "ቤት",
    href: "/housing/houses",
    color: "bg-yellow-50",
  },
  {
    icon: "🏘️",
    title: "Basements",
    amharic: "ቤዝመንት",
    href: "/housing",
    color: "bg-orange-50",
  },
  {
    icon: "👥",
    title: "Roommates",
    amharic: "አብሮ የሚኖር",
    href: "/housing/roommates",
    color: "bg-purple-50",
  },
  {
    icon: "🏬",
    title: "Commercial",
    amharic: "የንግድ ቦታ",
    href: "/housing",
    color: "bg-red-50",
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-[#064d2b]">
          Browse Rental Categories
        </h2>

        <p className="mt-3 text-xl text-gray-600">
          የሚከራይ ቤቶችን በአይነት ይመልከቱ
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className={`${category.color} group rounded-3xl border border-gray-200 p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
          >
            <div className="text-6xl">{category.icon}</div>

            <h3 className="mt-6 text-2xl font-black text-[#064d2b]">
              {category.title}
            </h3>

            <p className="mt-2 text-lg font-semibold text-gray-600">
              {category.amharic}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow">
                View Listings
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