import Link from "next/link";
import type { Job } from "@/types/job";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#087531]">{job.category}</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            {job.title}
          </h2>
          <p className="mt-1 font-semibold text-slate-700">{job.company}</p>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-[#087531]">
          {job.employmentType}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <p>📍 {job.location}</p>
        {job.pay && <p>💵 {job.pay}</p>}
        <p>🕒 {job.postedAt}</p>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {job.description}
      </p>

      <Link
        href={`/jobs/${job.id}`}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#087531] px-4 py-3 font-bold text-white transition hover:bg-[#064d2b]"
      >
        View Details
      </Link>
    </article>
  );
}
