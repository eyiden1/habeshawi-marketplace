import RentalCard from "@/components/housing/RentalCard";

export default function HousesPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black text-[#064d2b]">
          Houses for Rent
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Browse houses available for rent.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RentalCard
            image="/housing/houses/house1.jpg"
            title="Beautiful Family House"
            price="$3,200/month"
            location="Silver Spring, MD"
            description="4 Bed • 3 Bath • Garage • Backyard"
          />
        </div>
      </div>
    </main>
  );
}