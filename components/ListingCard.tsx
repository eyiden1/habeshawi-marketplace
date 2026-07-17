import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  title: string;
  price: string;
  location: string;
  image: string;
  href: string;
};

export default function ListingCard({
  title,
  price,
  location,
  image,
  href,
}: ListingCardProps) {
return (
  <Link
    href={href}
    className="block overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="relative">
      <Image
        src={image}
        alt={title}
        width={500}
        height={350}
        className="h-56 w-full object-cover"
      />

      <button
        type="button"
        className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-red-50"
        aria-label="Add to favorites"
      >
        ❤️
      </button>
    </div>

    <div className="p-4">
      <h3 className="text-lg font-bold">{title}</h3>

      <p className="mt-2 text-2xl font-bold text-[#087531]">
        {price}
      </p>

      <p className="mt-2 text-slate-500">
        📍 {location}
      </p>
    </div>
  </Link>
);
}