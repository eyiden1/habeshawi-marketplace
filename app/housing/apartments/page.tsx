import RentalCard from "@/components/housing/RentalCard";
import SearchFilters from "@/components/housing/SearchFilters";
import { Suspense } from "react";

export default function ApartmentsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
<h1 className="text-4xl font-bold text-[#064d2b]">
  Apartments
</h1>

<Suspense
  fallback={
    <div className="mt-6 rounded-xl bg-slate-100 p-6 text-center text-slate-600">
      Loading search filters...
    </div>
  }
>
  <SearchFilters />
</Suspense>

<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
<RentalCard
  id="apartment-1"
  image="/housing/apartments/apartment1.jpg"
  title="Luxury Apartment"
  price="$2,250/month"
  location="Silver Spring, MD"
  description="Modern apartment with spacious rooms and convenient access to shopping and transportation."
/>
<RentalCard
  id="apartment-2"
  image="/housing/apartments/apartment2.jpg"
  title="Modern Two-Bedroom Apartment"
  price="$1,950/month"
  location="Hyattsville, MD"
  description="Comfortable two-bedroom apartment in a convenient location."
/>
        </div>
      </div>
    </main>
  );
}