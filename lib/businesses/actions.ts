"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-admin";

const allowedStatuses = ["pending", "approved", "rejected"] as const;

type BusinessStatus = (typeof allowedStatuses)[number];

function getRequiredId(formData: FormData): string {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Business ID is required.");
  }

  return id;
}

function refreshBusinessPages(id?: string) {
  revalidatePath("/admin/businesses");
  revalidatePath("/businesses");

  if (id) {
    revalidatePath(`/businesses/${id}`);
  }
}

export async function updateBusinessStatus(formData: FormData) {
  const id = getRequiredId(formData);
  const status = String(formData.get("status") ?? "").trim();

  if (!allowedStatuses.includes(status as BusinessStatus)) {
    throw new Error("Invalid business status.");
  }

  const { error } = await supabaseAdmin
    .from("businesses")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update business status: ${error.message}`);
  }

  refreshBusinessPages(id);
}

export async function toggleBusinessFeatured(formData: FormData) {
  const id = getRequiredId(formData);
  const featured = String(formData.get("featured") ?? "") === "true";

  const { error } = await supabaseAdmin
    .from("businesses")
    .update({
      featured: !featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update featured status: ${error.message}`);
  }

  refreshBusinessPages(id);
}

export async function deleteBusiness(formData: FormData) {
  const id = getRequiredId(formData);

  const { error } = await supabaseAdmin
    .from("businesses")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to delete business: ${error.message}`);
  }

  refreshBusinessPages();
}