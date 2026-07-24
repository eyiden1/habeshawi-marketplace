import JobCard from "@/components/jobs/JobCard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getApprovedJobs } from "@/lib/jobs/queries";

export default async function LatestJobs() {
  const jobs = await getApprovedJobs();
  const latestJobs = jobs.slice(0, 4);

  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Community Opportunities"
        title="Latest Jobs"
        description="Discover the newest approved job opportunities shared by our community throughout Washington, DC, Maryland, and Virginia."
        amharic="አዳዲስ የስራ እድሎች"
        actionHref="/jobs"
        actionLabel="View All Jobs"
      />

      {latestJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {latestJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <Card
          padding="lg"
          className="border-dashed bg-slate-50 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
            <span aria-hidden="true">💼</span>
          </div>

          <h3 className="mt-5 text-2xl font-black text-slate-900">
            No Jobs Available Yet
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Be the first to post a job opportunity for the Habeshawi community.
          </p>

          <div className="mt-6 flex justify-center">
            <Button href="/jobs/post" variant="primary">
              Post a Job
            </Button>
          </div>
        </Card>
      )}

      <Card
        padding="lg"
        className="mt-12 border-0 bg-[#064d2b] text-white shadow-lg"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-yellow-300">
              Employers
            </p>

            <h3 className="mt-2 text-2xl font-black">
              Are You Hiring?
            </h3>

            <p className="mt-2 max-w-2xl text-green-50">
              Post your opportunity and connect with qualified job seekers
              across the DMV Habeshawi community.
            </p>
          </div>

          <Button
            href="/jobs/post"
            variant="secondary"
            size="md"
            className="shrink-0"
          >
            Post a Job
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </Card>
    </Section>
  );
}