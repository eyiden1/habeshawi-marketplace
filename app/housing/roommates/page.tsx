import RentalCard from "@/components/housing/RentalCard";

export default function RoommatesPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-[#f7f8f5]">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-[#064d2b]">
          Find a Roommate
        </h1>

        <p className="mt-4 text-slate-600">
          Connect with roommates looking to share a home or apartment in the DMV area.
        </p>

        {/* Search */}
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="City or ZIP code"
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <select className="rounded-xl border border-slate-300 px-4 py-3">
              <option>Gender Preference</option>
              <option>Male</option>
              <option>Female</option>
              <option>No Preference</option>
            </select>

            <select className="rounded-xl border border-slate-300 px-4 py-3">
              <option>Monthly Budget</option>
              <option>Under $700</option>
              <option>$700 - $1,000</option>
              <option>$1,000+</option>
            </select>

            <button className="rounded-xl bg-[#087531] px-6 py-3 font-semibold text-white hover:bg-[#065f28]">
              Search
            </button>
          </div>
        </div>

        {/* Listings */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RentalCard
            image="/housing/room-share.jpg"
            title="Looking for a Female Roommate"
            price="$700/month"
            location="Hyattsville, MD"
            description="Private bedroom • Shared kitchen • Utilities included • Available now"
          />

          <RentalCard
            image="/housing/room-share.jpg"
            title="Male Roommate Wanted"
            price="$850/month"
            location="Silver Spring, MD"
            description="Private room • Parking • Near Metro • No smoking"
          />

          <RentalCard
            image="/housing/room-share.jpg"
            title="Shared Apartment"
            price="$900/month"
            location="Washington, DC"
            description="2-bedroom apartment • Looking for one roommate • Furnished"
          />
        </div>
      </div>
    </main>
  );
}