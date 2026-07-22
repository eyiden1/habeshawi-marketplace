import { supabase } from "@/lib/supabase";
import type { Job, JobRow } from "@/types/job";

function formatPostedAt(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const differenceMs = Math.max(0, now.getTime() - created.getTime());
  const days = Math.floor(differenceMs / 86_400_000);

  if (days === 0) return "Posted today";
  if (days === 1) return "Posted 1 day ago";
  if (days < 30) return `Posted ${days} days ago`;

  return `Posted ${created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

export function mapJobRow(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    category: row.category,
    employmentType: row.employment_type,
    location: row.location,
    pay: row.pay ?? undefined,
    description: row.description,
    requirements: row.requirements ?? [],
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone ?? undefined,
    applyUrl: row.apply_url ?? undefined,
    postedAt: formatPostedAt(row.created_at),
    createdAt: row.created_at,
  };
}

export async function getApprovedJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as JobRow[]).map(mapJobRow);
}

export async function getApprovedJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapJobRow(data as JobRow) : null;
}
