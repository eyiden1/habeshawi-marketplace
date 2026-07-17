import RentalCard from "@/components/housing/RentalCard";

export default function ApartmentsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black text-[#064d2b]">
          Apartments
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Apartments available throughout the DMV area.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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