import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

type MarketplaceListing = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  condition: string | null;
  city: string;
  state: string;
  seller_name: string;
  seller_email: string;
  seller_phone: string;
  image_url: string | null;
  featured: boolean;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getImage(url: string | null) {
  if (!url) {
    return "/eth.png";
  }

  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return "/eth.png";
}

export default async function MarketplaceListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("marketplace_listings")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error || !data) {
    notFound();
  }

  const listing = data as MarketplaceListing;

  const image = getImage(listing.image_url);

  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <div className="mx-auto max-w-7xl px-4 py-10">

        <Link
          href="/marketplace"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#087531] hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow">

            <Image
              src={image}
              alt={listing.title}
              width={900}
              height={700}
              priority
              className="h-full w-full object-cover"
            />

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow">

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-800">
                {listing.category}
              </span>

              {listing.condition && (
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800">
                  {listing.condition}
                </span>
              )}

              {listing.featured && (
                <span className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-bold text-black">
                  ⭐ Featured
                </span>
              )}

            </div>

            <h1 className="mt-6 text-4xl font-black text-slate-900">
              {listing.title}
            </h1>

            <p className="mt-5 text-5xl font-black text-[#087531]">
              {formatPrice(listing.price)}
            </p>

            <p className="mt-8 leading-8 text-slate-700">
              {listing.description}
            </p>

            <div className="mt-10 space-y-4 rounded-2xl bg-slate-50 p-6">
                              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <span className="font-semibold text-slate-500">
                  Location
                </span>

                <span className="text-right font-bold text-slate-900">
                  {listing.city}, {listing.state}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <span className="font-semibold text-slate-500">
                  Condition
                </span>

                <span className="text-right font-bold text-slate-900">
                  {listing.condition || "Not specified"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="font-semibold text-slate-500">
                  Posted
                </span>

                <span className="text-right font-bold text-slate-900">
                  {formatDate(listing.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#087531]">
                Seller Information
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {listing.seller_name}
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Contact the seller directly to ask questions, confirm
                availability, and arrange payment or pickup.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={`tel:${listing.seller_phone}`}
                className="inline-flex min-w-52 items-center justify-center rounded-xl bg-[#087531] px-6 py-3 font-black text-white transition hover:bg-[#064d2b]"
              >
                Call Seller
              </a>

              <a
                href={`mailto:${listing.seller_email}?subject=${encodeURIComponent(
                  `Question about ${listing.title}`
                )}`}
                className="inline-flex min-w-52 items-center justify-center rounded-xl border border-[#087531] px-6 py-3 font-black text-[#087531] transition hover:bg-green-50"
              >
                Email Seller
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-slate-200 pt-7 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">
                Phone
              </p>

              <a
                href={`tel:${listing.seller_phone}`}
                className="mt-2 block break-all text-lg font-black text-slate-900 hover:text-[#087531]"
              >
                {listing.seller_phone}
              </a>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">
                Email
              </p>

              <a
                href={`mailto:${listing.seller_email}`}
                className="mt-2 block break-all text-lg font-black text-slate-900 hover:text-[#087531]"
              >
                {listing.seller_email}
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-black text-amber-900">
            Marketplace Safety
          </h2>

          <p className="mt-2 leading-7 text-amber-800">
            Confirm the item and seller before making payment. Meet in a
            safe public location when possible, and never send money
            before confirming the listing is legitimate.
          </p>
        </section>
      </div>
    </main>
  );
}