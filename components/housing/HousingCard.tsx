import Image from "next/image";
import Link from "next/link";

type HousingCardProps = {
  href: string;
  image: string;
  title: string;
  description: string;
};

export default function HousingCard({
  href,
  image,
  title,
  description,
}: HousingCardProps) {
  return (
    <Link
      href={href}
      className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
    >
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold text-[#064d2b]">
          {title}
        </h2>

        <p className="mt-2 text-slate-600">
          {description}
        </p>

        <p className="mt-5 font-semibold text-[#087531]">
          Browse →
        </p>
      </div>
    </Link>
  );
}