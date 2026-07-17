import Image from "next/image";
import Link from "next/link";

type ListingCardProps = {
  id: string;
  href: string;
  image: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  description: string;
  propertyType: string | null;
  createdAt: string;
};

export default function ListingCard({
  id,
  href,
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  description,
  propertyType,
  createdAt,
}: ListingCardProps) {
  return (
    <div
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
      </div>

      <div className="p-4">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold capitalize text-[#087531]">
          {propertyType ?? "Rental"}
        </span>

        <h3 className="mt-3 text-lg font-bold">{title}</h3>

        <p className="mt-2 text-2xl font-bold text-[#087531]">
          ${price.toLocaleString()}/month
        </p>

        <p className="mt-2">📍 {location}</p>

        <p className="mt-2">
          🛏 {bedrooms ?? 0} Beds • 🛁 {bathrooms ?? 0} Baths
        </p>

        <p className="mt-3 text-slate-600">
          {description}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          Posted {new Date(createdAt).toLocaleDateString()}
        </p>
        <div className="mt-4">
<Link
  href={`/post-ad/edit/${id}`}
  className="inline-block rounded-lg bg-[#087531] px-4 py-2 font-semibold text-white hover:bg-[#064d2b]"
>
  Edit Listing
</Link>
</div>
      </div>
    </div>
  );
}