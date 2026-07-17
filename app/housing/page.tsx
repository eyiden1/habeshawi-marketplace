import HousingCard from "@/components/housing/HousingCard";

export default function HousingPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-[#064d2b]">
          Housing
        </h1>

        <p className="mt-4 text-xl text-slate-600">
          Find rooms, apartments, houses, and roommate opportunities.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <HousingCard
            href="/housing/apartments"
            image="/housing/apartments/apartment1.jpg"
            title="🏢 Apartments"
            description="Find apartments across DC, Maryland, and Virginia."
          />

          <HousingCard
            href="/housing/houses"
            image="/housing/houses/house1.jpg"
            title="🏠 Houses"
            description="Browse single-family homes and townhouses."
          />

          <HousingCard
            href="/housing/rooms"
            image="/housing/rooms/room1.jpg"
            title="🛏️ Rooms for Rent"
            description="Private rooms, shared rooms, and basement rooms."
          />

          <HousingCard
            href="/housing/roommates"
            image="/housing/roommates/room-share1.jpg"
            title="👥 Roommates"
            description="Find roommates and shared housing opportunities."
          />
        </div>
      </div>
    </main>
  );
}