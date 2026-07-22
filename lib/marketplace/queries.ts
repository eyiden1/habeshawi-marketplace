import { supabase } from "@/lib/supabase";

export type MarketplaceListing = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  condition: string | null;
  city: string;
  state: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  imageUrl: string | null;
  featured: boolean;
  createdAt: string;
};

function mapListing(row: any): MarketplaceListing {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    price: Number(row.price),
    condition: row.condition ?? null,
    city: row.city,
    state: row.state,
    sellerName: row.seller_name,
    sellerEmail: row.seller_email,
    sellerPhone: row.seller_phone,
    imageUrl: row.image_url ?? null,
    featured: row.featured ?? false,
    createdAt: row.created_at,
  };
}

export async function getMarketplaceListings(): Promise<
  MarketplaceListing[]
> {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Unable to load marketplace listings:", error);
    return [];
  }

  return data.map(mapListing);
}

export async function getMarketplaceListingById(
  id: string,
): Promise<MarketplaceListing | null> {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapListing(data);
}

export async function getSimilarMarketplaceListings(
  listing: MarketplaceListing,
  limit = 4,
): Promise<MarketplaceListing[]> {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("status", "approved")
    .eq("category", listing.category)
    .neq("id", listing.id)
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map(mapListing);
}