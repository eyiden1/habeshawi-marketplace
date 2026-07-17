import RentalCard from "@/components/housing/RentalCard";

export default function RoomsPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-[#064d2b]">
        Rooms for Rent
      </h1>

      <p className="mt-4">
        Find rooms available in the DMV area.
      </p>

      <div className="mt-10 max-w-md">
        <RentalCard
          image="/housing/rooms/room1.jpg"
          title="Private Room in Silver Spring"
          price="$850/month"
          location="Silver Spring, MD"
          description="Private room, shared kitchen, and utilities included."
        />
                <RentalCard
          image="/housing/rooms/room2.jpg"
          title="Private Room in Silver Spring"
          price="$700/month"
          location="Silver Spring, MD"
          description="Private room, shared kitchen, and utilities included."
        />
                <RentalCard
          image="/housing/rooms/room3.jpg"
          title="Private Room in Silver Spring"
          price="$750/month"
          location="Silver Spring, MD"
          description="Private room, shared kitchen, and utilities included."
        />
      </div>
    </main>
  );
}