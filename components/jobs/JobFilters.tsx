"use client";

import type { EmploymentType, JobCategory } from "@/types/job";

export type JobFilterValues = {
  search: string;
  category: "All" | JobCategory;
  employmentType: "All" | EmploymentType;
};

type JobFiltersProps = {
  values: JobFilterValues;
  onChange: (values: JobFilterValues) => void;
};

const categories: Array<"All" | JobCategory> = [
  "All",
  "Restaurant & Hospitality",
  "Driving & Delivery",
  "Cleaning",
  "Retail & Grocery",
  "Healthcare",
  "Information Technology",
  "Office & Administration",
  "Accounting & Finance",
  "Construction",
  "Security",
  "Childcare & Home Care",
  "Education",
  "Other",
];

const employmentTypes: Array<"All" | EmploymentType> = [
  "All",
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
];

export default function JobFilters({ values, onChange }: JobFiltersProps) {
  return (
    <section className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Search jobs
          </span>
          <input
            type="search"
            value={values.search}
            onChange={(event) =>
              onChange({ ...values, search: event.target.value })
            }
            placeholder="Job title, company, or location"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#087531] focus:ring-2 focus:ring-green-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Category
          </span>
          <select
            value={values.category}
            onChange={(event) =>
              onChange({
                ...values,
                category: event.target.value as JobFilterValues["category"],
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#087531] focus:ring-2 focus:ring-green-100"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All categories" : category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Employment type
          </span>
          <select
            value={values.employmentType}
            onChange={(event) =>
              onChange({
                ...values,
                employmentType: event.target
                  .value as JobFilterValues["employmentType"],
              })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#087531] focus:ring-2 focus:ring-green-100"
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All employment types" : type}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
