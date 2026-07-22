"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PromotionSuccessContent() {
  const searchParams = useSearchParams();

  const advertisementId = searchParams.get("id");
  const selectedPackage = searchParams.get("package");

  const isFreePackage = selectedPackage === "free";

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-[#064d2b] px-6 py-12 text-center text-white sm:px-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 text-5xl text-black">
              ✓
            </div>

            <h1 className="mt-7 text-4xl font-black sm:text-5xl">
              Advertisement Submitted
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-green-50">
              Your advertisement was successfully submitted to Habeshawi
              Promotion.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="rounded-3xl border border-green-200 bg-green-50 p-6">
              <h2 className="text-2xl font-black text-[#064d2b]">
                What Happens Next?
              </h2>

              <div className="mt-6 grid gap-5">
                <StatusStep
                  number="1"
                  title="Advertisement received"
                  description="Your advertisement information and promotional image have been saved."
                />

                <StatusStep
                  number="2"
                  title="Administrative review"
                  description="The Habeshawi team will review the advertisement before publishing it."
                />

                <StatusStep
                  number="3"
                  title="Advertisement activation"
                  description={
                    isFreePackage
                      ? "After approval, your Free Community advertisement will become active for 7 days."
                      : "After payment confirmation and approval, your advertisement will become active for 60 days."
                  }
                />
              </div>
            </div>

            {advertisementId && (
              <div className="mt-7 rounded-2xl bg-slate-100 p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Advertisement Reference
                </p>

                <p className="mt-2 break-all font-mono text-sm font-bold text-slate-800">
                  {advertisementId}
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/promotion/my-ads"
                className="rounded-xl bg-[#087531] px-6 py-4 text-center font-black text-white transition hover:bg-[#064d2b]"
              >
                View My Advertisements
              </Link>

              <Link
                href="/promotion"
                className="rounded-xl border-2 border-[#087531] px-6 py-4 text-center font-black text-[#087531] transition hover:bg-green-50"
              >
                Return to Promotion
              </Link>
            </div>

            <Link
              href="/promotion/post"
              className="mt-4 block rounded-xl bg-slate-900 px-6 py-4 text-center font-black text-white transition hover:bg-slate-800"
            >
              Create Another Advertisement
            </Link>

            <p className="mt-7 text-center text-sm leading-6 text-slate-500">
              You can review the approval and payment status from the My
              Advertisements page.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#087531] font-black text-white">
        {number}
      </div>

      <div>
        <h3 className="text-lg font-black text-slate-900">{title}</h3>

        <p className="mt-1 leading-7 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function LoadingSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f5] px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#087531]" />

        <p className="mt-5 font-bold text-slate-700">
          Loading advertisement confirmation...
        </p>
      </div>
    </main>
  );
}

export default function PromotionSuccessPage() {
  return (
    <Suspense fallback={<LoadingSuccessPage />}>
      <PromotionSuccessContent />
    </Suspense>
  );
}