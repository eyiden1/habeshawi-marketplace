"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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

function AdvertisementsLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-2xl bg-white px-8 py-6 font-bold text-slate-700 shadow">
        Loading advertisements...
      </div>
    </main>
  );
}

function AdminAdvertisementsContent() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadAdvertisements() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("advertisements")
        .select(
          `
            id,
            business_name,
            title,
            package,
            status,
            payment_status,
            price,
            created_at
          `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load advertisements:", error);
        setAds([]);
        setErrorMessage(
          "Advertisements could not be loaded. Please try again."
        );
      } else {
        setAds(data || []);
      }

      setLoading(false);
    }

    void loadAdvertisements();
  }, []);

  const filteredAds = useMemo(() => {
    if (statusFilter === "all") {
      return ads;
    }

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
    return <AdvertisementsLoading />;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-[#064d2b] px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin/dashboard"
            className="font-bold text-yellow-400 transition hover:text-yellow-300"
          >
            ← Dashboard
          </Link>

          <h1 className="mt-5 text-4xl font-black sm:text-5xl">
            Advertisement Management
          </h1>

          <p className="mt-4 text-green-100">
            Review and manage all advertisements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap gap-3">
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
              className={`rounded-xl px-5 py-3 font-black transition ${
                statusFilter === status
                  ? "bg-[#087531] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {status.toUpperCase()}
            </Link>
          ))}
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-6 py-4 font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="overflow-x-auto rounded-3xl border bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-5 text-left">Business</th>
                <th className="p-5 text-left">Package</th>
                <th className="p-5 text-left">Price</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-left">Payment</th>
                <th className="p-5 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAds.map((ad) => (
                <tr key={ad.id} className="border-t">
                  <td className="p-5">
                    <div className="font-black">{ad.business_name}</div>

                    <div className="text-slate-500">{ad.title}</div>
                  </td>

                  <td className="p-5 capitalize">{ad.package}</td>

                  <td className="p-5">${Number(ad.price).toLocaleString()}</td>

                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-2 text-sm font-black ${badge(
                        ad.status
                      )}`}
                    >
                      {ad.status}
                    </span>
                  </td>

                  <td className="p-5 capitalize">{ad.payment_status}</td>

                  <td className="p-5">
                    <Link
                      href={`/admin/advertisements/${ad.id}`}
                      className="inline-flex rounded-xl bg-[#087531] px-5 py-2 font-black text-white transition hover:bg-[#065f28]"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredAds.length === 0 && !errorMessage && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center font-semibold text-slate-500"
                  >
                    No advertisements found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default function AdminAdvertisementsPage() {
  return (
    <Suspense fallback={<AdvertisementsLoading />}>
      <AdminAdvertisementsContent />
    </Suspense>
  );
}