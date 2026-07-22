import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  deleteBusiness,
  toggleBusinessFeatured,
  updateBusinessStatus,
} from "@/lib/businesses/actions";

type BusinessStatus = "pending" | "approved" | "rejected";

type AdminBusiness = {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  featured: boolean;
  status: BusinessStatus;
  created_at: string;
};

type AdminBusinessesPageProps = {
  searchParams: Promise<{
    status?: string;
  }>;
};

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getStatusClasses(status: BusinessStatus) {
  if (status === "approved") {
    return "bg-green-100 text-green-800";
  }

  if (status === "rejected") {
    return "bg-red-100 text-red-800";
  }

  return "bg-yellow-100 text-yellow-900";
}

export default async function AdminBusinessesPage({
  searchParams,
}: AdminBusinessesPageProps) {
  const params = await searchParams;

  const requestedStatus = params.status ?? "all";

  const activeStatus = statusOptions.some(
    (option) => option.value === requestedStatus,
  )
    ? requestedStatus
    : "all";

  let query = supabaseAdmin
    .from("businesses")
    .select(
      `
        id,
        name,
        category,
        description,
        address,
        city,
        state,
        zip_code,
        phone,
        email,
        website,
        featured,
        status,
        created_at
      `,
    )
    .order("created_at", { ascending: false });

  if (activeStatus !== "all") {
    query = query.eq("status", activeStatus);
  }

  const { data, error } = await query;

  const businesses = (data ?? []) as AdminBusiness[];

  const { count: pendingCount } = await supabaseAdmin
    .from("businesses")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "pending");

  const { count: approvedCount } = await supabaseAdmin
    .from("businesses")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "approved");

  const { count: rejectedCount } = await supabaseAdmin
    .from("businesses")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "rejected");

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-[#064d2b] p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
                Habeshawi Marketplace Admin
              </p>

              <h1 className="mt-3 text-3xl font-black md:text-4xl">
                Business Administration
              </h1>

              <p className="mt-3 max-w-2xl text-green-100">
                Review, approve, reject, feature, edit, and remove business
                listings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="rounded-xl border border-white/30 px-5 py-3 font-black text-white transition hover:bg-white/10"
              >
                Admin Home
              </Link>

              <Link
                href="/businesses"
                className="rounded-xl bg-yellow-400 px-5 py-3 font-black text-black transition hover:bg-yellow-300"
              >
                Public Directory
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard label="All businesses" value={
            (pendingCount ?? 0) +
            (approvedCount ?? 0) +
            (rejectedCount ?? 0)
          } />

          <DashboardCard
            label="Pending review"
            value={pendingCount ?? 0}
          />

          <DashboardCard
            label="Approved"
            value={approvedCount ?? 0}
          />

          <DashboardCard
            label="Rejected"
            value={rejectedCount ?? 0}
          />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isActive = activeStatus === option.value;

              const href =
                option.value === "all"
                  ? "/admin/businesses"
                  : `/admin/businesses?status=${option.value}`;

              return (
                <Link
                  key={option.value}
                  href={href}
                  className={`rounded-xl px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-[#064d2b] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </section>

        {error ? (
          <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-black text-red-900">
              Unable to load businesses
            </h2>

            <p className="mt-2 text-red-800">{error.message}</p>
          </section>
        ) : null}

        {!error && businesses.length === 0 ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">
              No businesses found
            </h2>

            <p className="mt-2 text-slate-600">
              There are currently no business listings in this category.
            </p>
          </section>
        ) : null}

        {!error && businesses.length > 0 ? (
          <section className="mt-6 space-y-5">
            {businesses.map((business) => (
              <article
                key={business.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${getStatusClasses(
                          business.status,
                        )}`}
                      >
                        {business.status}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                        {business.category}
                      </span>

                      {business.featured ? (
                        <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-4 text-2xl font-black text-slate-950">
                      {business.name}
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      Submitted {formatDate(business.created_at)}
                    </p>

                    <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                      {business.description}
                    </p>

                    <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                      <p>
                        <span className="font-black">Location:</span>{" "}
                        {business.address}, {business.city}, {business.state}{" "}
                        {business.zip_code ?? ""}
                      </p>

                      {business.phone ? (
                        <p>
                          <span className="font-black">Phone:</span>{" "}
                          {business.phone}
                        </p>
                      ) : null}

                      {business.email ? (
                        <p className="break-all">
                          <span className="font-black">Email:</span>{" "}
                          {business.email}
                        </p>
                      ) : null}

                      {business.website ? (
                        <p className="break-all">
                          <span className="font-black">Website:</span>{" "}
                          {business.website}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex min-w-48 flex-col gap-3">
                    {business.status !== "approved" ? (
                      <form action={updateBusinessStatus}>
                        <input type="hidden" name="id" value={business.id} />
                        <input
                          type="hidden"
                          name="status"
                          value="approved"
                        />

                        <button
                          type="submit"
                          className="w-full rounded-xl bg-[#087531] px-5 py-3 font-black text-white transition hover:bg-[#064d2b]"
                        >
                          Approve
                        </button>
                      </form>
                    ) : null}

                    {business.status !== "rejected" ? (
                      <form action={updateBusinessStatus}>
                        <input type="hidden" name="id" value={business.id} />
                        <input
                          type="hidden"
                          name="status"
                          value="rejected"
                        />

                        <button
                          type="submit"
                          className="w-full rounded-xl border border-red-300 bg-red-50 px-5 py-3 font-black text-red-800 transition hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </form>
                    ) : null}

                    {business.status !== "pending" ? (
                      <form action={updateBusinessStatus}>
                        <input type="hidden" name="id" value={business.id} />
                        <input
                          type="hidden"
                          name="status"
                          value="pending"
                        />

                        <button
                          type="submit"
                          className="w-full rounded-xl border border-yellow-300 bg-yellow-50 px-5 py-3 font-black text-yellow-900 transition hover:bg-yellow-100"
                        >
                          Move to Pending
                        </button>
                      </form>
                    ) : null}

                    <form action={toggleBusinessFeatured}>
                      <input type="hidden" name="id" value={business.id} />
                      <input
                        type="hidden"
                        name="featured"
                        value={String(business.featured)}
                      />

                      <button
                        type="submit"
                        className="w-full rounded-xl border border-slate-300 px-5 py-3 font-black text-slate-800 transition hover:bg-slate-50"
                      >
                        {business.featured
                          ? "Remove Featured"
                          : "Mark Featured"}
                      </button>
                    </form>

                    <Link
                      href={`/admin/edit/${business.id}`}
                      className="w-full rounded-xl border border-blue-300 bg-blue-50 px-5 py-3 text-center font-black text-blue-800 transition hover:bg-blue-100"
                    >
                      Edit
                    </Link>

                    {business.status === "approved" ? (
                      <Link
                        href={`/businesses/${business.id}`}
                        className="w-full rounded-xl border border-[#087531] px-5 py-3 text-center font-black text-[#087531] transition hover:bg-green-50"
                      >
                        View Public Page
                      </Link>
                    ) : null}

                    <form action={deleteBusiness}>
                      <input type="hidden" name="id" value={business.id} />

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-slate-900 px-5 py-3 font-black text-white transition hover:bg-black"
                      >
                        Delete Permanently
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}

function DashboardCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black text-[#064d2b]">{value}</p>
    </div>
  );
}