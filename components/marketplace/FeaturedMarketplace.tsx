import Image from "next/image";
import Link from "next/link";

const featuredItems = [
  {
    id: "ethiopian-jacket",
    title: "Ethiopian Jacket",
    price: "$79",
    location: "Silver Spring, MD",
    condition: "New",
    image: "/listings/ethiopian-jacket.png",
  },
  {
    id: "womens-ethiopian-shirt",
    title: "Women's Ethiopian Shirt",
    price: "$39",
    location: "Washington, DC",
    condition: "New",
    image: "/listings/womens-ethiopian-shirt.png",
  },
  {
    id: "lion-of-judah-shirt",
    title: "Lion of Judah T-Shirt",
    price: "$29",
    location: "Alexandria, VA",
    condition: "New",
    image: "/listings/lion-of-judah-shirt.png",
  },
];

export default function FeaturedMarketplace() {
  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-[#087531]">
            Community Products
          </p>

          <h4 className="mt-1 text-2xl font-black text-[#064d2b]">
            Featured Community Listings
          </h4>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Explore Ethiopian clothing and cultural products available from
            sellers in the community.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="font-bold text-[#087531] transition hover:text-[#064d2b] hover:underline"
        >
          View Marketplace →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item) => (
          <Link
            key={item.id}
            href="/marketplace"
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-72 overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-[#087531] shadow-sm">
                {item.condition}
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1.5 text-sm font-black text-[#064d2b] shadow-sm">
                {item.price}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <h5 className="text-lg font-black text-slate-900 transition group-hover:text-[#087531]">
                  {item.title}
                </h5>

                <span className="shrink-0 text-lg font-black text-[#087531]">
                  {item.price}
                </span>
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span aria-hidden="true">📍</span>
                {item.location}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-bold text-[#087531]">
                  View Item
                </span>

                <span
                  aria-hidden="true"
                  className="text-lg font-black text-[#087531] transition group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/marketplace"
          className="inline-flex items-center justify-center rounded-xl border-2 border-[#087531] bg-white px-7 py-3 font-black text-[#087531] transition hover:bg-[#eef8f1]"
        >
          View All Marketplace Items
        </Link>

        <Link
          href="/marketplace/post"
          className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-7 py-3 font-black text-[#064d2b] transition hover:bg-yellow-300"
        >
          + Post an Item
        </Link>
      </div>
    </div>
  );
}