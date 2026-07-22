import Image from "next/image";
import Link from "next/link";

type MarketplaceCardProps = {
  href: string;
  image: string;
  title: string;
  location: string;
  price: number;
  featured?: boolean;
  condition?: string | null;
};

export default function MarketplaceCard({
  href,
  image,
  title,
  location,
  price,
  featured = false,
  condition,
}: MarketplaceCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <Image
          src={image || "/images/placeholder.jpg"}
          alt={title}
          width={500}
          height={350}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
            ⭐ Featured
          </span>
        )}

        {condition && (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
            {condition}
          </span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
          {title}
        </h3>

        <p className="text-2xl font-extrabold text-[#087531]">
          ${price.toLocaleString()}
        </p>

        <p className="text-sm text-slate-600">
          📍 {location}
        </p>
      </div>
    </Link>
  );
}