import RentalCard from "@/components/housing/RentalCard";
import SearchFilters from "@/components/housing/SearchFilters";

export default function ApartmentsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
<h1 className="text-4xl font-bold text-[#064d2b]">
  Apartments
</h1>

<SearchFilters />

<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RentalCard
            image="/housing/apartments/apartment1.jpg"
            title="Luxury Apartment"
            price="$2,250/month"
            location="Washington, DC"
            description="2 Bed • 2 Bath • Garage • Gym"
          />
        </div>
      </div>
    </main>
  );
}