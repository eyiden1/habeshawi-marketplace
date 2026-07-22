"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Advertisement = {
  id: string;
  business_name: string;
  title: string;
  description: string;
  category: string;
  package: string;
  price: number;
  duration_days: number;
  image_url: string | null;
  website: string | null;
  phone: string;
  email: string;
  status: string;
  payment_status: string;
  payment_reference: string | null;
  clicks: number;
  impressions: number;
  created_at: string;
};

export default function AdvertisementDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [ad, setAd] = useState<Advertisement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdvertisement();
  }, []);

  async function loadAdvertisement() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("advertisements")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    setAd(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!ad) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Advertisement not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5]">

      <section className="bg-[#064d2b] text-white py-14">

        <div className="max-w-7xl mx-auto px-6">

          <Link
            href="/promotion/my-ads"
            className="text-yellow-400 font-bold"
          >
            ← Back
          </Link>

          <h1 className="mt-5 text-5xl font-black">
            Advertisement Details
          </h1>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-[420px_1fr] gap-10">

        <div>

          {ad.image_url ? (

            <div className="relative h-[320px] rounded-3xl overflow-hidden">

              <Image
                src={ad.image_url}
                alt={ad.title}
                fill
                className="object-cover"
              />

            </div>

          ) : (

            <div className="h-[320px] rounded-3xl bg-slate-200 flex items-center justify-center text-7xl">
              🖼️
            </div>

          )}

        </div>

        <div className="bg-white rounded-3xl shadow border p-8">

          <h2 className="text-4xl font-black">
            {ad.title}
          </h2>

          <p className="mt-2 text-slate-600">
            {ad.business_name}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <Info title="Category" value={ad.category} />
            <Info title="Package" value={ad.package} />
            <Info title="Price" value={`$${ad.price}`} />
            <Info title="Duration" value={`${ad.duration_days} days`} />
            <Info title="Status" value={ad.status} />
            <Info title="Payment" value={ad.payment_status} />
            <Info title="Clicks" value={String(ad.clicks)} />
            <Info title="Impressions" value={String(ad.impressions)} />

          </div>

          <h3 className="mt-10 text-2xl font-black">
            Description
          </h3>

          <p className="mt-4 leading-8 text-slate-700">
            {ad.description}
          </p>

          <div className="mt-10 border-t pt-8">

            <h3 className="text-2xl font-black">
              Contact
            </h3>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <Info title="Phone" value={ad.phone} />
              <Info title="Email" value={ad.email} />
              <Info title="Website" value={ad.website || "-"} />

              <Info
                title="Payment Reference"
                value={ad.payment_reference || "-"}
              />

            </div>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href={`/promotion/my-ads/${ad.id}/edit`}
              className="bg-yellow-400 px-6 py-3 rounded-xl font-black"
            >
              Edit Advertisement
            </Link>

            {ad.payment_status === "unpaid" && (

              <Link
                href={`/promotion/payment?id=${ad.id}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black"
              >
                Complete Payment
              </Link>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-sm text-slate-500">
        {title}
      </div>

      <div className="font-black mt-1">
        {value}
      </div>
    </div>
  );
}