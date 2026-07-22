"use client";

import Link from "next/link";
import { useEffect } from "react";

type MarketplaceErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function MarketplaceError({
  error,
  reset,
}: MarketplaceErrorProps) {
  useEffect(() => {
    console.error("Marketplace error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-5xl">
          ⚠️
        </div>

        <p className="mt-6 font-bold uppercase tracking-wider text-red-600">
          Something Went Wrong
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Marketplace Error
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          We could not load this marketplace page. Please try again or return
          to the marketplace.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Try Again
          </button>

          <Link
            href="/marketplace"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back to Marketplace
          </Link>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block font-medium text-green-700 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}