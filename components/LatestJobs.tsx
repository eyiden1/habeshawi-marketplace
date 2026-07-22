import Link from "next/link";

const jobs = [
  {
    id: 1,
    title: "Data Engineer",
    company: "Technology Consulting Company",
    location: "Arlington, Virginia",
    type: "Full-time",
    salary: "$105,000–$135,000",
    icon: "💻",
    description:
      "Build ETL pipelines, manage databases and support cloud data platforms.",
  },
  {
    id: 2,
    title: "Restaurant Server",
    company: "Habesha Restaurant",
    location: "Silver Spring, Maryland",
    type: "Part-time",
    salary: "$18–$25 per hour",
    icon: "🍽️",
    description:
      "Provide friendly customer service in a busy Ethiopian restaurant.",
  },
  {
    id: 3,
    title: "Delivery Driver",
    company: "Local Delivery Service",
    location: "Washington, DC",
    type: "Flexible Schedule",
    salary: "$20–$28 per hour",
    icon: "🚗",
    description:
      "Deliver local orders throughout the DMV area using your own vehicle.",
  },
  {
    id: 4,
    title: "Accounting Assistant",
    company: "DMV Tax & Accounting",
    location: "Alexandria, Virginia",
    type: "Full-time",
    salary: "$50,000–$65,000",
    icon: "📊",
    description:
      "Support bookkeeping, tax preparation and small-business accounting.",
  },
];

export default function LatestJobs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-bold uppercase tracking-wider text-[#087531]">
              Community Opportunities
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#064d2b] sm:text-4xl">
              Latest Jobs
            </h2>

            <p className="mt-2 max-w-2xl text-slate-600">
              Find professional, hospitality, delivery and community job
              opportunities throughout the DMV area.
            </p>

            <p className="mt-2 font-semibold text-[#087531]">
              አዳዲስ የስራ እድሎች
            </p>
          </div>

          <Link
            href="/jobs"
            className="font-bold text-[#087531] transition hover:text-[#064d2b] hover:underline"
          >
            View All Jobs →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="group rounded-3xl border border-slate-200 bg-[#f7f8f5] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  {job.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 font-bold text-[#087531]">
                        {job.company}
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#087531] shadow-sm">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
                    <span>📍 {job.location}</span>
                    <span>💵 {job.salary}</span>
                  </div>

                  <p className="mt-4 leading-6 text-slate-600">
                    {job.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/jobs"
                      className="inline-flex items-center justify-center rounded-xl bg-[#087531] px-5 py-3 font-bold text-white transition hover:bg-[#064d2b]"
                    >
                      View Job
                    </Link>

                    <Link
                      href="/jobs"
                      className="inline-flex items-center justify-center rounded-xl border border-[#087531] px-5 py-3 font-bold text-[#087531] transition hover:bg-green-50"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-[#064d2b] px-6 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 lg:px-10">
          <div>
            <h3 className="text-2xl font-black">
              Are You Hiring?
            </h3>

            <p className="mt-2 max-w-2xl text-white/75">
              Post your opportunity and connect with job seekers in the
              Ethiopian and Eritrean community.
            </p>
          </div>

          <Link
            href="/jobs"
            className="mt-6 inline-flex shrink-0 items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 font-black text-[#064d2b] transition hover:bg-yellow-300 sm:mt-0"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
}