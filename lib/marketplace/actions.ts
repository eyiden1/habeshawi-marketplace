"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

type MarketplaceStatus = "pending" | "approved" | "rejected";

export async function updateMarketplaceStatus(
  id: string,
  status: MarketplaceStatus,
) {
  const { error } = await supabaseAdmin
    .from("marketplace_listings")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update listing status: ${error.message}`);
  }

  revalidatePath("/admin/marketplace");
  revalidatePath("/marketplace");
  revalidatePath(`/marketplace/${id}`);
}

export async function toggleMarketplaceFeatured(
  id: string,
  currentFeatured: boolean,
) {
  const { error } = await supabaseAdmin
    .from("marketplace_listings")
    .update({
      featured: !currentFeatured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update featured status: ${error.message}`);
  }

  revalidatePath("/admin/marketplace");
  revalidatePath("/marketplace");
  revalidatePath(`/marketplace/${id}`);
}

export async function deleteMarketplaceListing(id: string) {
  const { error } = await supabaseAdmin
    .from("marketplace_listings")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to delete listing: ${error.message}`);
  }

  revalidatePath("/admin/marketplace");
  revalidatePath("/marketplace");
}