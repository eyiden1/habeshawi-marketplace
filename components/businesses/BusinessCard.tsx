import Link from "next/link";
import type { Business } from "@/types/business";

type BusinessCardProps = {
  business: Business;
};

export default function BusinessCard({ business }: BusinessCardProps) {
  const initials = business.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#064d2b] text-2xl font-black text-white shadow-md">
          {initials}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-black text-[#064d2b]">
              {business.category}
            </span>
            <h2 className="mt-3 text-xl font-black text-slate-900">
              {business.name}
            </h2>
          </div>

          {business.featured ? (
            <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">
              Featured
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          {business.city}, {business.state}
        </p>

        <p className="mt-4 line-clamp-3 min-h-[72px] leading-6 text-slate-600">
          {business.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            {typeof business.rating === "number" ? (
              <p className="text-sm font-bold text-slate-800">
                <span className="text-yellow-500">★</span>{" "}
                {business.rating.toFixed(1)}
                <span className="font-medium text-slate-500">
                  {" "}({business.reviewCount ?? 0})
                </span>
              </p>
            ) : (
              <p className="text-sm font-semibold text-slate-500">New listing</p>
            )}

            <p
              className={`mt-1 text-xs font-bold ${
                business.openNow ? "text-green-700" : "text-slate-500"
              }`}
            >
              {business.openNow ? "Open now" : "Hours unavailable"}
            </p>
          </div>

          <Link
            href={`/businesses/${business.id}`}
            className="rounded-xl bg-[#064d2b] px-4 py-2.5 text-sm font-black text-white transition group-hover:bg-[#0a6b3c]"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
