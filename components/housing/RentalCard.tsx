import Image from "next/image";
import Link from "next/link";

type RentalCardProps = {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  description: string;
  type?: string;
  phone?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  available?: boolean;
};

export default function RentalCard({
  id,
  image,
  title,
  price,
  location,
  description,
  type,
  beds,
  baths,
  sqft,
  available = true,
}: RentalCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative">

        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="h-56 w-full object-cover"
        />

        {type && (
          <span className="absolute left-3 top-3 rounded-full bg-[#087531] px-3 py-1 text-sm font-bold text-white">
            {type}
          </span>
        )}

        <button
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
          type="button"
        >
          ❤️
        </button>
      </div>

      <div className="p-5">

        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <p className="mt-2 text-2xl font-black text-[#087531]">
          {price}
        </p>

        <p className="mt-2 text-slate-500">
          📍 {location}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
          {beds && <span>🛏 {beds} Bed</span>}
          {baths && <span>🚿 {baths} Bath</span>}
          {sqft && <span>📐 {sqft} sq ft</span>}
        </div>

        {available && (
          <span className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Available Now
          </span>
        )}

        <p className="mt-4 line-clamp-3 text-sm text-slate-600">
          {description}
        </p>

        <Link
          href={`/housing/${id}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#087531] px-4 py-3 font-bold text-white transition hover:bg-[#064d2b]"
        >
          View Details
        </Link>

      </div>
    </article>
  );
}