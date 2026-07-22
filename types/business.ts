export type BusinessCategory =
  | "Restaurant"
  | "Grocery Store"
  | "Coffee Shop"
  | "Auto Repair"
  | "Real Estate"
  | "Tax Service"
  | "Legal Service"
  | "Beauty & Barber"
  | "Healthcare"
  | "Home Service"
  | "Technology"
  | "Other";

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  city: string;
  state: string;
  description: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  openNow?: boolean;
  imageUrl?: string;
};
