"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PricingContent() {
  const searchParams = useSearchParams();
  const rentalId = searchParams.get("rentalId");

  async function startCheckout(listingType: "housing" | "business") {
    if (!rentalId) {
      alert("Rental listing ID is missing.");
      return;
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingType,
        rentalId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Unable to start checkout.");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <main className="mx-auto max-w-4xl p-10">
      {/* Keep ALL of your existing JSX exactly as it is */}
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading pricing...</div>}>
      <PricingContent />
    </Suspense>
  );
}