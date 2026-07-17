import EditRentalForm from "@/components/housing/EditRentalForm";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditListingPage({ params }: Props) {
  const { id } = await params;

  const { data: rental, error } = await supabase
    .from("rentals")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !rental) {
    return (
      <main className="p-8">
        <p>Unable to load listing: {error?.message ?? "Listing not found"}</p>
      </main>
    );
  }

return (
  <main className="min-h-screen bg-[#f7f8f5] p-8">
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold text-[#064d2b]">
        Edit Listing
      </h1>

      <EditRentalForm rental={rental} />
    </div>
  </main>
);
}