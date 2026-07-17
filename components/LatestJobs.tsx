const jobs = [
  {
    title: "Restaurant Server",
    company: "Habesha Restaurant",
    location: "Silver Spring, MD",
  },
  {
    title: "Delivery Driver",
    company: "Local Delivery Service",
    location: "Washington, DC",
  },
  {
    title: "IT Support Specialist",
    company: "Technology Solutions",
    location: "Rockville, MD",
  },
];

export default function LatestJobs() {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-3xl font-black text-[#064d2b]">
          Latest Jobs
        </h2>

        <button className="font-bold text-[#087531]">
          View All
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {jobs.map((job) => (
          <article
            key={job.title}
            className="border-b p-5 last:border-b-0"
          >
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-black">{job.title}</h3>
                <p className="text-sm text-slate-600">{job.company}</p>
                <p className="text-sm text-slate-500">{job.location}</p>
              </div>

              <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-[#087531]">
                Full-time
              </span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}