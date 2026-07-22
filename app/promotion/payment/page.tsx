"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Advertisement = {
  id: string;
  user_id: string;
  business_name: string;
  title: string;
  package: string;
  price: number;
  duration_days: number;
  status: string;
  payment_status: string;
  payment_reference: string | null;
};

const packageNames: Record<string, string> = {
  free: "Free Community",
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

function PromotionPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const advertisementId = searchParams.get("id");

  const [advertisement, setAdvertisement] =
    useState<Advertisement | null>(null);

  const [paymentMethod, setPaymentMethod] = useState("manual");
  const [paymentReference, setPaymentReference] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"error" | "success" | "">("");

  useEffect(() => {
    async function loadAdvertisement() {
      setIsLoading(true);
      setMessage("");
      setMessageType("");

      if (!advertisementId) {
        setMessage("Advertisement ID is missing.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          setMessage(
            "You must sign in to continue with advertisement payment."
          );
          setMessageType("error");
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("advertisements")
          .select(
            `
              id,
              user_id,
              business_name,
              title,
              package,
              price,
              duration_days,
              status,
              payment_status,
              payment_reference
            `
          )
          .eq("id", advertisementId)
          .eq("user_id", user.id)
          .single();

        if (error) {
          throw new Error(
            `Unable to load the advertisement: ${error.message}`
          );
        }

        if (!data) {
          throw new Error("Advertisement not found.");
        }

        setAdvertisement(data as Advertisement);
        setPaymentReference(data.payment_reference || "");
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unable to load payment information.";

        setMessage(errorMessage);
        setMessageType("error");
      } finally {
        setIsLoading(false);
      }
    }

    loadAdvertisement();
  }, [advertisementId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!advertisement) {
      return;
    }

    setMessage("");
    setMessageType("");

    if (!paymentReference.trim()) {
      setMessage(
        "Please enter your payment confirmation or transaction reference."
      );
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error(
          "Your session has expired. Please sign in again."
        );
      }

      const combinedReference = `${paymentMethod.toUpperCase()}: ${paymentReference.trim()}`;

      const { error: updateError } = await supabase
        .from("advertisements")
        .update({
          payment_status: "pending",
          payment_reference: combinedReference,
          status: "pending",
          updated_at: new Date().toISOString(),
        })
        .eq("id", advertisement.id)
        .eq("user_id", user.id);

      if (updateError) {
        throw new Error(
          `Unable to submit payment information: ${updateError.message}`
        );
      }

      router.push(
        `/promotion/success?id=${encodeURIComponent(
          advertisement.id
        )}&package=${encodeURIComponent(advertisement.package)}`
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting payment information.";

      setMessage(errorMessage);
      setMessageType("error");
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <LoadingPaymentPage />;
  }

  if (!advertisement) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-5 text-3xl font-black text-slate-900">
            Payment Information Unavailable
          </h1>

          <p className="mt-4 leading-7 text-red-700">
            {message || "The advertisement could not be found."}
          </p>

          <Link
            href="/promotion/my-ads"
            className="mt-7 inline-flex rounded-xl bg-[#087531] px-6 py-3 font-black text-white"
          >
            View My Advertisements
          </Link>
        </div>
      </main>
    );
  }

  const formattedPrice = `$${Number(advertisement.price).toFixed(2)}`;
  const packageDisplayName =
    packageNames[advertisement.package] || advertisement.package;

  const paymentAlreadySubmitted =
    advertisement.payment_status === "pending" ||
    advertisement.payment_status === "paid";

  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <section className="bg-[#064d2b] px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/promotion/my-ads"
            className="font-bold text-yellow-400 hover:text-yellow-300"
          >
            ← My Advertisements
          </Link>

          <h1 className="mt-5 text-4xl font-black sm:text-5xl">
            Advertisement Payment
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-green-50">
            Submit your payment transaction reference for administrative
            verification.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >
          <span className="font-black uppercase tracking-wider text-[#087531]">
            Payment Verification
          </span>

          <h2 className="mt-2 text-3xl font-black text-slate-900">
            Submit Payment Information
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            This page currently uses manual payment verification. Your
            advertisement will not become active until an administrator
            confirms the payment and approves the advertisement.
          </p>

          {paymentAlreadySubmitted ? (
            <div className="mt-8 rounded-3xl border border-yellow-300 bg-yellow-50 p-6">
              <h3 className="text-xl font-black text-slate-900">
                Payment Information Already Submitted
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                Current payment status:
                <span className="ml-2 font-black capitalize">
                  {advertisement.payment_status}
                </span>
              </p>

              {advertisement.payment_reference && (
                <div className="mt-4 rounded-xl bg-white p-4">
                  <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Payment Reference
                  </p>

                  <p className="mt-2 break-all font-bold text-slate-800">
                    {advertisement.payment_reference}
                  </p>
                </div>
              )}

              <Link
                href="/promotion/my-ads"
                className="mt-6 inline-flex rounded-xl bg-[#087531] px-6 py-3 font-black text-white"
              >
                View My Advertisements
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <label className="block">
                  <span className="mb-3 block font-black text-slate-800">
                    Payment Method
                  </span>

                  <select
                    value={paymentMethod}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="manual">
                      Manual payment or other method
                    </option>

                    <option value="zelle">Zelle</option>

                    <option value="cashapp">Cash App</option>

                    <option value="paypal">PayPal</option>

                    <option value="bank">Bank transfer</option>
                  </select>
                </label>
              </div>

              <div className="mt-6">
                <label className="block">
                  <span className="mb-3 block font-black text-slate-800">
                    Transaction or Confirmation Reference
                    <span className="ml-1 text-red-600">*</span>
                  </span>

                  <input
                    type="text"
                    value={paymentReference}
                    onChange={(event) =>
                      setPaymentReference(event.target.value)
                    }
                    placeholder="Enter the payment confirmation number or reference"
                    className={inputClass}
                    maxLength={200}
                    required
                  />
                </label>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Do not enter a bank account number, credit card number, PIN,
                  or password.
                </p>
              </div>

              <div className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <h3 className="font-black text-blue-900">
                  Payment Instructions
                </h3>

                <p className="mt-2 leading-7 text-blue-800">
                  Complete payment using the payment instructions provided by
                  Habeshawi Marketplace, and then enter the transaction
                  confirmation above.
                </p>
              </div>

              {message && (
                <div
                  className={`mt-7 rounded-2xl border p-4 font-bold ${
                    messageType === "error"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 w-full rounded-xl bg-[#087531] px-7 py-4 text-lg font-black text-white transition hover:bg-[#064d2b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Submitting Payment Information..."
                  : "Submit Payment for Verification"}
              </button>
            </>
          )}
        </form>

        <aside>
          <div className="sticky top-6 rounded-3xl bg-slate-900 p-7 text-white shadow-lg">
            <span className="inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-black">
              Payment Summary
            </span>

            <h2 className="mt-5 text-2xl font-black">
              {advertisement.business_name}
            </h2>

            <p className="mt-2 leading-7 text-slate-300">
              {advertisement.title}
            </p>

            <div className="my-6 border-t border-slate-700" />

            <div className="grid gap-4">
              <SummaryRow
                label="Package"
                value={packageDisplayName}
              />

              <SummaryRow
                label="Duration"
                value={`${advertisement.duration_days} days`}
              />

              <SummaryRow label="Total" value={formattedPrice} />

              <SummaryRow
                label="Payment status"
                value={advertisement.payment_status}
              />

              <SummaryRow
                label="Advertisement status"
                value={advertisement.status}
              />
            </div>

            <div className="mt-7 rounded-2xl bg-slate-800 p-5">
              <p className="text-sm leading-6 text-slate-300">
                Payment submission does not automatically publish the
                advertisement. Payment verification and administrative
                approval are required.
              </p>
            </div>

            <Link
              href={`/promotion/my-ads/${advertisement.id}`}
              className="mt-6 block rounded-xl border border-white px-5 py-3 text-center font-black text-white transition hover:bg-white hover:text-slate-900"
            >
              View Advertisement
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <span className="text-slate-400">{label}</span>

      <span className="text-right font-black capitalize">{value}</span>
    </div>
  );
}

function LoadingPaymentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#087531]" />

        <p className="mt-5 font-bold text-slate-700">
          Loading payment information...
        </p>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#087531] focus:ring-2 focus:ring-green-100";

export default function PromotionPaymentPage() {
  return (
    <Suspense fallback={<LoadingPaymentPage />}>
      <PromotionPaymentContent />
    </Suspense>
  );
}