import Image from "next/image";
import Link from "next/link";

type MarketplaceCardProps = {
  href: string;
  image: string;
  title: string;
  location: string;
  price: number;
};

export default function MarketplaceCard({
  href,
  image,
  title,
  location,
  price,
}: MarketplaceCardProps) {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={350}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>

        <p className="mt-2 text-2xl font-bold text-[#087531]">
          ${price.toLocaleString()}
        </p>

        <p className="mt-2 text-slate-600">
          📍 {location}
        </p>
      </div>
    </Link>
  );
}