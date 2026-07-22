"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JobTable from "@/components/admin/JobTable";

type RentalStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected";

type PaymentStatus = "unpaid" | "paid" | "refunded";

type Rental = {
  id: string;
  title: string;
  price: number | null;
  status: RentalStatus;
  payment_status: PaymentStatus;
  property_type: string | null;
  location: string | null;
  created_at: string;
};

const sections: Array<{
  status: RentalStatus;
  title: string;
  description: string;
}> = [
  {
    status: "pending",
    title: "Pending Approval",
    description: "Paid listings waiting for your review.",
  },
  {
    status: "approved",
    title: "Approved Listings",
    description: "Listings currently approved for publication.",
  },
  {
    status: "rejected",
    title: "Rejected Listings",
    description: "Listings that were not approved.",
  },
  {
    status: "draft",
    title: "Draft / Unpaid",
    description: "Listings whose payment has not been completed.",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState<"rentals" | "jobs">("rentals");

  const loadRentals = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("rentals")
      .select(
        `
          id,
          title,
          price,
          status,
          payment_status,
          property_type,
          location,
          created_at
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      alert(`Unable to load listings: ${error.message}`);
      setLoading(false);
      return;
    }

    setRentals((data ?? []) as Rental[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      await loadRentals();
    }

    void checkAdmin();
  }, [loadRentals, router]);

  const filteredRentals = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return rentals;
    }

    return rentals.filter((rental) => {
      const searchableText = [
        rental.title,
        rental.location,
        rental.property_type,
        rental.status,
        rental.payment_status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [rentals, search]);

  const counts = useMemo(
    () => ({
      pending: rentals.filter((rental) => rental.status === "pending")
        .length,
      approved: rentals.filter(
        (rental) => rental.status === "approved"
      ).length,
      rejected: rentals.filter(
        (rental) => rental.status === "rejected"
      ).length,
      draft: rentals.filter((rental) => rental.status === "draft")
        .length,
    }),
    [rentals]
  );

async function updateStatus(
  rentalId: string,
  newStatus: RentalStatus
) {
  const rental = rentals.find((item) => item.id === rentalId);

  if (!rental) {
    alert("Listing not found.");
    return;
  }

  if (
    newStatus === "approved" &&
    rental.payment_status !== "paid"
  ) {
    alert("An unpaid listing cannot be approved.");
    return;
  }

  let rejectionReason = "";

  if (newStatus === "rejected") {
    const enteredReason = prompt(
      "Enter an optional rejection reason:"
    );

    if (enteredReason === null) {
      return;
    }

    rejectionReason = enteredReason.trim();
  }

  setWorkingId(rentalId);

  try {
    /*
     * Approved and rejected listings go through the API route.
     * The API updates Supabase and sends the customer email.
     */
    if (
      newStatus === "approved" ||
      newStatus === "rejected"
    ) {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        alert(
          "Your admin session has expired. Please log in again."
        );
        router.replace("/login");
        return;
      }

      const response = await fetch(
        "/api/send-listing-status-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            rentalId,
            status: newStatus,
            rejectionReason,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to update the listing status."
        );
      }

      setRentals((currentRentals) =>
        currentRentals.map((item) =>
          item.id === rentalId
            ? {
                ...item,
                status: newStatus,
                rejection_reason:
                  newStatus === "rejected"
                    ? rejectionReason ||
                      "The listing requires changes."
                    : null,
              }
            : item
        )
      );

      if (result.emailSent) {
        alert(
          newStatus === "approved"
            ? "Listing approved and customer notified."
            : "Listing rejected and customer notified."
        );
      } else {
        alert(
          result.message ??
            "Listing updated, but the customer email was not sent."
        );
      }

      return;
    }

    /*
     * Restoring a listing to pending does not send an email.
     */
    if (newStatus === "pending") {
      const { error } = await supabase
        .from("rentals")
        .update({
          status: "pending",
          approved_at: null,
          rejection_reason: null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", rentalId);

      if (error) {
        throw new Error(error.message);
      }

      setRentals((currentRentals) =>
        currentRentals.map((item) =>
          item.id === rentalId
            ? {
                ...item,
                status: "pending",
                rejection_reason: null,
              }
            : item
        )
      );
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to update the listing.";

    alert(message);
  } finally {
    setWorkingId(null);
  }
}

  async function deleteListing(rentalId: string) {
    const confirmed = confirm(
      "Permanently delete this listing? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setWorkingId(rentalId);

    const { error } = await supabase
      .from("rentals")
      .delete()
      .eq("id", rentalId);

    if (error) {
      alert(`Unable to delete listing: ${error.message}`);
      setWorkingId(null);
      return;
    }

    setRentals((currentRentals) =>
      currentRentals.filter((rental) => rental.id !== rentalId)
    );

    setWorkingId(null);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#064d2b]">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-slate-600">
              Review and manage Habeshawi housing listings and community jobs.
            </p>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveSection("rentals")}
            className={`border-b-4 px-5 py-3 font-bold transition ${
              activeSection === "rentals"
                ? "border-[#087531] text-[#064d2b]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Housing Listings
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("jobs")}
            className={`border-b-4 px-5 py-3 font-bold transition ${
              activeSection === "jobs"
                ? "border-[#087531] text-[#064d2b]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Community Jobs
          </button>
        </div>

        {activeSection === "rentals" ? (
          <>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Pending"
            count={counts.pending}
            description="Needs review"
          />

          <SummaryCard
            title="Approved"
            count={counts.approved}
            description="Published listings"
          />

          <SummaryCard
            title="Rejected"
            count={counts.rejected}
            description="Not approved"
          />

          <SummaryCard
            title="Draft / Unpaid"
            count={counts.draft}
            description="Payment incomplete"
          />
        </div>

        <div className="mt-8 rounded-xl bg-white p-4 shadow-sm">
          <label
            htmlFor="admin-search"
            className="mb-2 block font-semibold text-slate-700"
          >
            Search listings
          </label>

          <input
            id="admin-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, location or property type"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]"
          />
        </div>

        {loading ? (
          <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
            <p>Loading listings...</p>
          </div>
        ) : (
          <div className="mt-8 space-y-10">
            {sections.map((section) => {
              const sectionRentals = filteredRentals.filter(
                (rental) => rental.status === section.status
              );

              return (
                <section key={section.status}>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-[#064d2b]">
                      {section.title} ({sectionRentals.length})
                    </h2>

                    <p className="text-slate-600">
                      {section.description}
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
                    <table className="w-full min-w-[900px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-left">
                          <th className="border-b p-3">Listing</th>
                          <th className="border-b p-3">Type</th>
                          <th className="border-b p-3">Price</th>
                          <th className="border-b p-3">Status</th>
                          <th className="border-b p-3">Payment</th>
                          <th className="border-b p-3">Submitted</th>
                          <th className="border-b p-3">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sectionRentals.map((rental) => {
                          const isWorking =
                            workingId === rental.id;

                          return (
                            <tr
                              key={rental.id}
                              className="align-top hover:bg-slate-50"
                            >
                              <td className="border-b p-3">
                                <p className="font-semibold text-slate-900">
                                  {rental.title}
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                  {rental.location ||
                                    "Location not provided"}
                                </p>
                              </td>

                              <td className="border-b p-3">
                                {rental.property_type ||
                                  "Not specified"}
                              </td>

                              <td className="border-b p-3 font-semibold">
                                {formatPrice(rental.price)}
                              </td>

                              <td className="border-b p-3">
                                <StatusBadge
                                  status={rental.status}
                                />
                              </td>

                              <td className="border-b p-3">
                                <PaymentBadge
                                  status={rental.payment_status}
                                />
                              </td>

                              <td className="border-b p-3">
                                {formatDate(rental.created_at)}
                              </td>

                              <td className="border-b p-3">
                                <div className="flex flex-wrap gap-2">
                                  <Link
                                    href={`/admin/edit/${rental.id}`}
                                    className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                                  >
                                    Review
                                  </Link>

                                  {rental.status !== "approved" &&
                                    rental.payment_status ===
                                      "paid" && (
                                      <button
                                        type="button"
                                        disabled={isWorking}
                                        onClick={() =>
                                          updateStatus(
                                            rental.id,
                                            "approved"
                                          )
                                        }
                                        className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
                                      >
                                        Approve
                                      </button>
                                    )}

                                  {rental.status !== "rejected" &&
                                    rental.payment_status ===
                                      "paid" && (
                                      <button
                                        type="button"
                                        disabled={isWorking}
                                        onClick={() =>
                                          updateStatus(
                                            rental.id,
                                            "rejected"
                                          )
                                        }
                                        className="rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
                                      >
                                        Reject
                                      </button>
                                    )}

                                  {rental.status === "rejected" && (
                                    <button
                                      type="button"
                                      disabled={isWorking}
                                      onClick={() =>
                                        updateStatus(
                                          rental.id,
                                          "pending"
                                        )
                                      }
                                      className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                                    >
                                      Restore
                                    </button>
                                  )}

                                  {rental.status === "approved" && (
                                    <button
                                      type="button"
                                      disabled={isWorking}
                                      onClick={() =>
                                        updateStatus(
                                          rental.id,
                                          "pending"
                                        )
                                      }
                                      className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                                    >
                                      Unpublish
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    disabled={isWorking}
                                    onClick={() =>
                                      deleteListing(rental.id)
                                    }
                                    className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-50"
                                  >
                                    {isWorking
                                      ? "Working..."
                                      : "Delete"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}

                        {sectionRentals.length === 0 && (
                          <tr>
                            <td
                              colSpan={7}
                              className="p-8 text-center text-slate-500"
                            >
                              No listings in this section.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}
          </div>
        )}
          </>
        ) : (
          <div className="mt-8">
            <JobTable />
          </div>
        )}
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  count,
  description,
}: {
  title: string;
  count: number;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="font-semibold text-slate-600">{title}</p>

      <p className="mt-2 text-4xl font-bold text-[#064d2b]">
        {count}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: RentalStatus }) {
  const styles: Record<RentalStatus, string> = {
    draft: "bg-slate-100 text-slate-700",
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({
  status,
}: {
  status: PaymentStatus;
}) {
  const styles: Record<PaymentStatus, string> = {
    unpaid: "bg-slate-100 text-slate-700",
    paid: "bg-green-100 text-green-800",
    refunded: "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function formatPrice(price: number | null) {
  if (price === null || Number.isNaN(Number(price))) {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}