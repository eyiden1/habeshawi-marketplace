"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Advertisement = {
  id: string;
  title: string;
  business_name: string;
  package: string;
  status: string;
  payment_status: string;
  price: number;
  image_url: string | null;
  created_at: string;
  clicks: number;
  impressions: number;
};

export default function MyAdvertisementsPage() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAds();
  }, []);

  async function loadAds() {
    setLoading(true);

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
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setAds(data || []);
    setLoading(false);
  }

  function badgeColor(status: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading advertisements...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5]">

      <section className="bg-[#064d2b] text-white py-14 px-6">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-black">
              My Advertisements
            </h1>

            <p className="mt-4 text-green-100">
              Manage your promotions and payments.
            </p>

          </div>

          <Link
            href="/promotion/post"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-black"
          >
            New Advertisement
          </Link>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">

        {ads.length === 0 && (

          <div className="bg-white rounded-3xl shadow p-12 text-center">

            <div className="text-7xl">
              📣
            </div>

            <h2 className="text-3xl font-black mt-6">
              No Advertisements Yet
            </h2>

            <p className="mt-3 text-slate-600">
              Create your first promotion to advertise your business.
            </p>

            <Link
              href="/promotion/post"
              className="inline-block mt-8 bg-[#087531] text-white px-7 py-4 rounded-xl font-black"
            >
              Create Advertisement
            </Link>

          </div>

        )}

        <div className="grid gap-8">

          {ads.map((ad) => (

            <div
              key={ad.id}
              className="bg-white rounded-3xl shadow border p-6 flex flex-col lg:flex-row gap-6"
            >

              <div className="w-full lg:w-72">

                {ad.image_url ? (

                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="rounded-2xl h-48 w-full object-cover"
                  />

                ) : (

                  <div className="rounded-2xl h-48 bg-slate-200 flex items-center justify-center text-5xl">
                    🖼️
                  </div>

                )}

              </div>

              <div className="flex-1">

                <div className="flex justify-between flex-wrap gap-4">

                  <div>

                    <h2 className="text-2xl font-black">
                      {ad.title}
                    </h2>

                    <p className="mt-1 text-slate-600">
                      {ad.business_name}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-black ${badgeColor(ad.status)}`}
                  >
                    {ad.status.toUpperCase()}
                  </span>

                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                  <Info
                    title="Package"
                    value={ad.package}
                  />

                  <Info
                    title="Price"
                    value={`$${ad.price}`}
                  />

                  <Info
                    title="Clicks"
                    value={String(ad.clicks)}
                  />

                  <Info
                    title="Impressions"
                    value={String(ad.impressions)}
                  />

                </div>

                <div className="mt-8 flex flex-wrap gap-4">

                  <Link
                    href={`/promotion/my-ads/${ad.id}`}
                    className="bg-[#087531] text-white px-5 py-3 rounded-xl font-black"
                  >
                    View
                  </Link>

                  <Link
                    href={`/promotion/my-ads/${ad.id}/edit`}
                    className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-black"
                  >
                    Edit
                  </Link>

                  {ad.payment_status === "unpaid" && (

                    <Link
                      href={`/promotion/payment?id=${ad.id}`}
                      className="bg-blue-600 text-white px-5 py-3 rounded-xl font-black"
                    >
                      Pay Now
                    </Link>

                  )}

                </div>

              </div>

            </div>

          ))}

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

      <div className="text-xl font-black mt-1">
        {value}
      </div>

    </div>
  );
}