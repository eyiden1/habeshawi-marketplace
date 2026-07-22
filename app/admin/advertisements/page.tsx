"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";


type Advertisement = {
  id: string;
  business_name: string;
  title: string;
  package: string;
  status: string;
  payment_status: string;
  price: number;
  created_at: string;
};

export default function AdminAdvertisementsPage() {
  const searchParams = useSearchParams();

  const statusFilter = searchParams.get("status") || "all";

  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  async function loadAdvertisements() {
    setLoading(true);

    const { data } = await supabase
      .from("advertisements")
      .select(`
        id,
        business_name,
        title,
        package,
        status,
        payment_status,
        price,
        created_at
      `)
      .order("created_at", { ascending: false });

    setAds(data || []);
    setLoading(false);
  }

  const filteredAds = useMemo(() => {
    if (statusFilter === "all") return ads;
    return ads.filter((ad) => ad.status === statusFilter);
  }, [ads, statusFilter]);

  function badge(status: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-slate-100 text-slate-700";
      case "expired":
        return "bg-red-100 text-red-700";
      case "rejected":
        return "bg-red-200 text-red-800";
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
    <main className="min-h-screen bg-slate-100">

      <section className="bg-[#064d2b] text-white py-14 px-6">

        <div className="max-w-7xl mx-auto">

          <Link
            href="/admin/dashboard"
            className="text-yellow-400 font-bold"
          >
            ← Dashboard
          </Link>

          <h1 className="mt-5 text-5xl font-black">
            Advertisement Management
          </h1>

          <p className="mt-4 text-green-100">
            Review and manage all advertisements.
          </p>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-wrap gap-3 mb-8">

          {[
            "all",
            "draft",
            "pending",
            "active",
            "expired",
            "rejected",
          ].map((status) => (

            <Link
              key={status}
              href={
                status === "all"
                  ? "/admin/advertisements"
                  : `/admin/advertisements?status=${status}`
              }
              className={`px-5 py-3 rounded-xl font-black transition ${
                statusFilter === status
                  ? "bg-[#087531] text-white"
                  : "bg-white"
              }`}
            >
              {status.toUpperCase()}
            </Link>

          ))}

        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow border">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-5">Business</th>

                <th className="text-left p-5">Package</th>

                <th className="text-left p-5">Price</th>

                <th className="text-left p-5">Status</th>

                <th className="text-left p-5">Payment</th>

                <th className="text-left p-5">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredAds.map((ad) => (

                <tr
                  key={ad.id}
                  className="border-t"
                >

                  <td className="p-5">

                    <div className="font-black">
                      {ad.business_name}
                    </div>

                    <div className="text-slate-500">
                      {ad.title}
                    </div>

                  </td>

                  <td className="p-5 capitalize">
                    {ad.package}
                  </td>

                  <td className="p-5">
                    ${ad.price}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-3 py-2 rounded-full text-sm font-black ${badge(ad.status)}`}
                    >
                      {ad.status}
                    </span>

                  </td>

                  <td className="p-5 capitalize">
                    {ad.payment_status}
                  </td>

                  <td className="p-5">

                    <Link
                      href={`/admin/advertisements/${ad.id}`}
                      className="bg-[#087531] text-white px-5 py-2 rounded-xl font-black"
                    >
                      Review
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}