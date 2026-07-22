export type JobStatus = "pending" | "approved" | "rejected" | "expired";

const statusStyles: Record<JobStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  expired: "bg-slate-200 text-slate-700",
};

export default function JobStatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
