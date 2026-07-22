"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Advertisement = {
  id: string;
  business_name: string;
  title: string;
  package: string;
  price: number;
  status: string;
  payment_status: string;
  clicks: number;
  impressions: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};

type CurrentUser = {
  id: string;
  email: string | null;
};

export default function PromotionDashboardPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!currentUser) {
        setUser(null);
        setAdvertisements([]);
        return;
      }

      setUser({
        id: currentUser.id,
        email: currentUser.email || null,
      });

      const { data, error } = await supabase
        .from("advertisements")
        .select(
          `
            id,
            business_name,
            title,
            package,
            price,
            status,
            payment_status,
            clicks,
            impressions,
            start_date,
            end_date,
            created_at
          `
        )
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      setAdvertisements((data || []) as Advertisement[]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to load your promotion dashboard.";

      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const totals = useMemo(() => {
    const totalImpressions = advertisements.reduce(
      (sum, advertisement) =>
        sum + Number(advertisement.impressions || 0),
      0
    );

    const totalClicks = advertisements.reduce(
      (sum, advertisement) =>
        sum + Number(advertisement.clicks || 0),
      0
    );

    return {
      total: advertisements.length,

      active: advertisements.filter(
        (advertisement) => advertisement.status === "active"
      ).length,

      pending: advertisements.filter(
        (advertisement) =>
          advertisement.status === "pending" ||
          advertisement.status === "approved"
      ).length,

      unpaid: advertisements.filter(
        (advertisement) =>
          advertisement.payment_status === "unpaid" ||
          advertisement.payment_status === "pending"
      ).length,

      totalImpressions,
      totalClicks,
    };
  }, [advertisements]);

  function formatDate(value: string | null) {
    if (!value) {
      return "Not set";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  }

  function statusStyle(status: string) {
    const styles: Record<string, string> = {
      draft: "bg-slate-100 text-slate-700",
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      rejected: "bg-red-200 text-red-900",
    };

    return styles[status] || "bg-slate-100 text-slate-700";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#087531]" />

          <p className="mt-5 font-bold text-slate-700">
            Loading promotion dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">📣</div>

          <h1 className="mt-6 text-3xl font-black text-slate-900">
            Sign In Required
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Sign in to manage your advertisements, payments, and promotion
            analytics.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-[#087531] px-6 py-3 font-black text-white transition hover:bg-[#064d2b]"
            >
              Sign In
            </Link>

            <Link
              href="/promotion"
              className="rounded-xl border border-slate-300 px-6 py-3 font-black text-slate-700 transition hover:bg-slate-50"
            >
              Return to Promotion
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const recentAdvertisements = advertisements.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-[#064d2b] px-6 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wider text-black">
              Advertiser Account
            </span>

            <h1 className="mt-5 text-4xl font-black sm:text-5xl">
              Promotion Dashboard
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-green-100">
              Manage your advertisements, review payment status, and track
              customer engagement.
            </p>

            {user.email && (
              <p className="mt-3 text-sm font-bold text-green-200">
                Signed in as {user.email}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/promotion/post"
              className="rounded-xl bg-yellow-400 px-6 py-3 font-black text-black transition hover:bg-yellow-300"
            >
              Create Advertisement
            </Link>

            <button
              type="button"
              onClick={loadDashboard}
              className="rounded-xl border border-white px-6 py-3 font-black text-white transition hover:bg-white hover:text-[#064d2b]"
            >
              Refresh Dashboard
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {message && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 font-bold text-red-700">
            {message}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Advertisements"
            value={totals.total}
            description="All advertisements created"
            icon="📣"
            href="/promotion/my-ads"
          />

          <DashboardCard
            title="Active Advertisements"
            value={totals.active}
            description="Currently visible to customers"
            icon="✅"
            href="/promotion/my-ads"
          />

          <DashboardCard
            title="Pending Review"
            value={totals.pending}
            description="Waiting for approval or activation"
            icon="⏳"
            href="/promotion/my-ads"
          />

          <DashboardCard
            title="Payment Required"
            value={totals.unpaid}
            description="Unpaid or awaiting verification"
            icon="💳"
            href="/promotion/my-ads"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-5 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  Recent Advertisements
                </h2>

                <p className="mt-2 text-slate-600">
                  Review the most recently submitted promotions.
                </p>
              </div>

              <Link
                href="/promotion/my-ads"
                className="w-fit rounded-xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-[#087531]"
              >
                View All Ads
              </Link>
            </div>

            {recentAdvertisements.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-6xl">📭</div>

                <h3 className="mt-5 text-2xl font-black text-slate-900">
                  No Advertisements Yet
                </h3>

                <p className="mt-3 text-slate-600">
                  Create your first advertisement to promote your business.
                </p>

                <Link
                  href="/promotion/post"
                  className="mt-6 inline-flex rounded-xl bg-[#087531] px-6 py-3 font-black text-white"
                >
                  Create Advertisement
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentAdvertisements.map((advertisement) => (
                  <div
                    key={advertisement.id}
                    className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-black text-slate-900">
                          {advertisement.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black uppercase ${statusStyle(
                            advertisement.status
                          )}`}
                        >
                          {advertisement.status}
                        </span>
                      </div>

                      <p className="mt-2 font-bold text-slate-600">
                        {advertisement.business_name}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                        <span className="capitalize">
                          {advertisement.package} package
                        </span>

                        <span>
                          Payment:{" "}
                          <strong className="capitalize">
                            {advertisement.payment_status}
                          </strong>
                        </span>

                        <span>
                          Created: {formatDate(advertisement.created_at)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/promotion/my-ads/${advertisement.id}`}
                      className="w-fit rounded-xl bg-[#087531] px-5 py-3 font-black text-white transition hover:bg-[#064d2b]"
                    >
                      Manage
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-lg">
              <span className="inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                Performance Summary
              </span>

              <h2 className="mt-5 text-2xl font-black">
                Customer Engagement
              </h2>

              <div className="mt-7 grid gap-5">
                <PerformanceRow
                  label="Total impressions"
                  value={totals.totalImpressions}
                />

                <PerformanceRow
                  label="Contact clicks"
                  value={totals.totalClicks}
                />

                <PerformanceRow
                  label="Active campaigns"
                  value={totals.active}
                />
              </div>

              <Link
                href="/promotion/analytics"
                className="mt-8 block rounded-xl bg-[#087531] px-6 py-4 text-center font-black text-white transition hover:bg-[#0b8f3d]"
              >
                Open Analytics
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900">
                Quick Actions
              </h2>

              <div className="mt-6 grid gap-3">
                <QuickLink
                  href="/promotion/post"
                  icon="➕"
                  label="Create New Advertisement"
                />

                <QuickLink
                  href="/promotion/my-ads"
                  icon="📋"
                  label="Manage My Advertisements"
                />

                <QuickLink
                  href="/promotion/analytics"
                  icon="📊"
                  label="View Analytics"
                />

                <QuickLink
                  href="/promotion/pricing"
                  icon="💰"
                  label="View Promotion Packages"
                />
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-10 rounded-3xl bg-yellow-400 p-7 text-black shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-black">
                Reach More Customers
              </h2>

              <p className="mt-3 max-w-3xl text-lg leading-8">
                Promote your restaurant, store, event, service, or community
                organization to Ethiopian and Eritrean customers throughout
                the DMV area.
              </p>
            </div>

            <Link
              href="/promotion/post"
              className="w-fit rounded-xl bg-[#064d2b] px-7 py-4 font-black text-white transition hover:bg-[#087531]"
            >
              Start New Promotion
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function DashboardCard({
  title,
  value,
  description,
  icon,
  href,
}: {
  title: string;
  value: number;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-black text-slate-600">{title}</p>

        <span className="text-3xl">{icon}</span>
      </div>

      <p className="mt-6 text-5xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-3 leading-6 text-slate-500">
        {description}
      </p>

      <span className="mt-5 inline-flex font-black text-[#087531]">
        View details →
      </span>
    </Link>
  );
}

function PerformanceRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-700 pb-4 last:border-none last:pb-0">
      <span className="text-slate-300">{label}</span>

      <span className="text-2xl font-black text-yellow-400">
        {value}
      </span>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 font-black text-slate-800 transition hover:bg-green-50 hover:text-[#064d2b]"
    >
      <span className="text-2xl">{icon}</span>

      <span>{label}</span>
    </Link>
  );
}