import RentalCard from "@/components/housing/RentalCard";

export default function RoommatesPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black text-[#064d2b]">
          Roommates
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Find roommates in Washington DC, Maryland, and Virginia.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RentalCard
            image="/housing/roommates/room-share1.jpg"
            title="Looking for a Roommate"
            price="$700/month"
            location="Hyattsville, MD"
            description="Private room • Shared kitchen • Utilities included"
          />
        </div>
      </div>
    </main>
  );
}