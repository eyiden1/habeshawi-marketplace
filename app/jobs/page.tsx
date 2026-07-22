import Link from "next/link";
import JobList from "@/components/jobs/JobList";
import { getApprovedJobs } from "@/lib/jobs/queries";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await getApprovedJobs();

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-3xl bg-[#064d2b] px-6 py-10 text-white shadow-lg md:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
                Free Community Job Board
              </span>
              <h1 className="mt-5 text-4xl font-black md:text-5xl">
                Find Jobs in Our Community
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-green-50">
                Discover approved job opportunities shared for Ethiopian,
                Eritrean, and DMV community members. Employers can post openings
                at no cost.
              </p>
            </div>

            <Link
              href="/jobs/post"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-yellow-400 px-6 py-4 text-lg font-black text-black transition hover:bg-yellow-300"
            >
              Post a Job — Free
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-sm leading-6 text-green-950">
          <strong>Community safety:</strong> Every submitted job is reviewed
          before it is published. Job seekers should never pay money to apply
          for a job.
        </section>

        <JobList jobs={jobs} />
      </div>
    </main>
  );
}
