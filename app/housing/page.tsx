import SearchFilters from "@/components/housing/SearchFilters";
import ListingCard from "@/components/housing/ListingCard";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type HousingPageProps = {
  searchParams: Promise<{
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
  }>;
};

export default async function HousingPage({
  searchParams,
}: HousingPageProps) {
  const filters = await searchParams;

  const location = filters.location?.trim() ?? "";
  const propertyType = filters.type?.trim() ?? "";
  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);
  const bedrooms = Number(filters.bedrooms);

  let query = supabase
    .from("rentals")
    .select(`
      *,
      rental_images (
        image_url,
        display_order
      )
    `)
    .eq("payment_status", "paid")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (location) {
    query = query.ilike("location", `%${location}%`);
  }

  if (propertyType) {
    query = query.eq("property_type", propertyType);
  }

  if (!Number.isNaN(minPrice) && minPrice > 0) {
    query = query.gte("price", minPrice);
  }

  if (!Number.isNaN(maxPrice) && maxPrice > 0) {
    query = query.lte("price", maxPrice);
  }

  if (!Number.isNaN(bedrooms) && bedrooms > 0) {
    query = query.gte("bedrooms", bedrooms);
  }

  const { data: rentals, error } = await query;

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          Unable to load listings: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <p className="font-bold uppercase tracking-wide text-[#087531]">
          Find your next home
        </p>

        <h1 className="mt-1 text-3xl font-black text-[#064d2b] sm:text-4xl">
          Housing Listings
        </h1>

        <p className="mt-2 text-slate-600">
          Browse approved rooms, apartments, houses and other rentals.
        </p>
      </div>

      <div className="mt-6">
        <SearchFilters />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-semibold text-slate-700">
          {rentals?.length ?? 0}{" "}
          {rentals?.length === 1 ? "rental found" : "rentals found"}
        </p>
      </div>

      {!rentals || rentals.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            No matching rentals found
          </h2>

          <p className="mt-2 text-slate-600">
            Try changing the location, price or bedroom filters.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rentals.map((rental) => {
            const sortedImages = [...(rental.rental_images ?? [])].sort(
              (a, b) =>
                Number(a.display_order ?? 0) -
                Number(b.display_order ?? 0),
            );

            const image =
              sortedImages[0]?.image_url ||
              rental.image_url ||
              "/housing/apartments/apartment1.jpg";

            return (
              <ListingCard
                key={rental.id}
                id={rental.id}
                href={`/housing/${rental.id}`}
                image={image}
                title={rental.title}
                location={rental.location ?? "Location not provided"}
                price={Number(rental.price ?? 0)}
                bedrooms={rental.bedrooms}
                bathrooms={rental.bathrooms}
                description={rental.description ?? ""}
                propertyType={rental.property_type}
                createdAt={rental.created_at}
                phone={rental.phone}
                whatsapp={rental.whatsapp}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}