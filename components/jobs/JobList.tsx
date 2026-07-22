"use client";

import { useMemo, useState } from "react";
import type { Job } from "@/types/job";
import JobCard from "./JobCard";
import JobFilters, { type JobFilterValues } from "./JobFilters";

type JobListProps = {
  jobs: Job[];
};

const initialFilters: JobFilterValues = {
  search: "",
  category: "All",
  employmentType: "All",
};

export default function JobList({ jobs }: JobListProps) {
  const [filters, setFilters] = useState<JobFilterValues>(initialFilters);

  const filteredJobs = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        searchText.length === 0 ||
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText);

      const matchesCategory =
        filters.category === "All" || job.category === filters.category;

      const matchesEmploymentType =
        filters.employmentType === "All" ||
        job.employmentType === filters.employmentType;

      return matchesSearch && matchesCategory && matchesEmploymentType;
    });
  }, [filters, jobs]);

  return (
    <>
      <JobFilters values={filters} onChange={setFilters} />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-black text-[#064d2b]">Latest Jobs</h2>
        <p className="text-sm font-semibold text-slate-600">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
        </p>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h3 className="text-xl font-black text-slate-900">No jobs found</h3>
          <p className="mt-2 text-slate-600">
            Try a different keyword, category, or employment type.
          </p>
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="mt-5 rounded-xl bg-[#087531] px-5 py-3 font-bold text-white transition hover:bg-[#064d2b]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
