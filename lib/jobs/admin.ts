import { supabase } from "@/lib/supabase";
import type { JobStatus } from "@/components/admin/JobStatusBadge";

export type AdminJob = {
  id: string;
  title: string;
  company: string;
  category: string;
  employment_type: string;
  location: string;
  pay: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  status: JobStatus;
  created_at: string;
};

export async function getAdminJobs(): Promise<AdminJob[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "id,title,company,category,employment_type,location,pay,contact_name,contact_email,contact_phone,status,created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminJob[];
}

export async function updateAdminJobStatus(
  jobId: string,
  status: JobStatus,
): Promise<void> {
  const { error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteAdminJob(jobId: string): Promise<void> {
  const { error } = await supabase.from("jobs").delete().eq("id", jobId);

  if (error) {
    throw new Error(error.message);
  }
}
