import Link from "next/link";

const promotions = [
  {
    id: 1,
    businessName: "Habesha Restaurant",
    category: "Restaurant",
    location: "Silver Spring, Maryland",
    icon: "🍽️",
    description:
      "Traditional Ethiopian and Eritrean meals, fresh injera and family dining.",
    offer: "Featured Business",
    href: "/businesses",
    background: "from-orange-100 to-yellow-50",
  },
  {
    id: 2,
    businessName: "Addis Grocery Market",
    category: "Grocery Store",
    location: "Washington, DC",
    icon: "🛒",
    description:
      "Spices, coffee, injera, produce and everyday Ethiopian grocery products.",
    offer: "Community Favorite",
    href: "/businesses",
    background: "from-green-100 to-emerald-50",
  },
  {
    id: 3,
    businessName: "DMV Tax & Accounting",
    category: "Professional Service",
    location: "Alexandria, Virginia",
    icon: "📊",
    description:
      "Personal taxes, business accounting, bookkeeping and financial support.",
    offer: "Now Accepting Clients",
    href: "/businesses",
    background: "from-blue-100 to-sky-50",
  },
  {
    id: 4,
    businessName: "Habesha Auto Care",
    category: "Automotive Service",
    location: "Hyattsville, Maryland",
    icon: "🚗",
    description:
      "Oil changes, brake service, vehicle inspections and general auto repair.",
    offer: "Special Promotion",
    href: "/businesses",
    background: "from-slate-200 to-slate-50",
  },
];

export default function FeaturedPromotions() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-bold uppercase tracking-wider text-[#087531]">
              Support Community Businesses
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#064d2b] sm:text-4xl">
              Featured Promotions
            </h2>

            <p className="mt-2 max-w-2xl text-slate-600">
              Discover restaurants, stores and professional services serving
              the Ethiopian and Eritrean community.
            </p>

            <p className="mt-2 font-semibold text-[#087531]">
              የተመረጡ የንግድ ማስታወቂያዎች
            </p>
          </div>

          <Link
            href="/businesses"
            className="font-bold text-[#087531] transition hover:text-[#064d2b] hover:underline"
          >
            View All Promotions →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {promotions.map((promotion) => (
            <article
              key={promotion.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${promotion.background}`}
              >
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#087531] shadow-sm">
                  {promotion.offer}
                </div>

                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-6xl shadow-lg transition duration-300 group-hover:scale-110">
                  {promotion.icon}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex h-1">
                  <div className="w-1/3 bg-green-500" />
                  <div className="w-1/3 bg-yellow-400" />
                  <div className="w-1/3 bg-red-500" />
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-wide text-[#087531]">
                  {promotion.category}
                </p>

                <h3 className="mt-2 text-xl font-black text-slate-900">
                  {promotion.businessName}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <span aria-hidden="true">📍</span>
                  {promotion.location}
                </p>

                <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
                  {promotion.description}
                </p>

                <Link
                  href={promotion.href}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#087531] px-5 py-3 font-bold text-white transition hover:bg-[#064d2b]"
                >
                  View Business
                  <span
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-[#064d2b] px-6 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 lg:px-10">
          <div>
            <h3 className="text-2xl font-black">
              Promote Your Business on Habeshawi
            </h3>

            <p className="mt-2 max-w-2xl text-white/75">
              Reach customers across Washington, DC, Maryland and Virginia with
              a featured business promotion.
            </p>
          </div>

          <Link
            href="/businesses"
            className="mt-6 inline-flex shrink-0 items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 font-black text-[#064d2b] transition hover:bg-yellow-300 sm:mt-0"
          >
            Promote Your Business
          </Link>
        </div>
      </div>
    </section>
  );
}