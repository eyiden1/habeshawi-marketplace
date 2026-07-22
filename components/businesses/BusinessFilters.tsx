"use client";

import type { BusinessCategory } from "@/types/business";

export type BusinessFilterValues = {
  search: string;
  category: string;
  city: string;
};

type BusinessFiltersProps = {
  values: BusinessFilterValues;
  categories: BusinessCategory[];
  cities: string[];
  onChange: (values: BusinessFilterValues) => void;
  onClear: () => void;
};

export default function BusinessFilters({
  values,
  categories,
  cities,
  onChange,
  onClear,
}: BusinessFiltersProps) {
  const hasFilters = Boolean(values.search || values.category || values.city);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Search businesses
          </span>
          <input
            type="search"
            value={values.search}
            onChange={(event) =>
              onChange({ ...values, search: event.target.value })
            }
            placeholder="Name, category, or service"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#0a6b3c] focus:ring-2 focus:ring-green-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Category
          </span>
          <select
            value={values.category}
            onChange={(event) =>
              onChange({ ...values, category: event.target.value })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#0a6b3c] focus:ring-2 focus:ring-green-100"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-slate-700">
            City
          </span>
          <select
            value={values.city}
            onChange={(event) =>
              onChange({ ...values, city: event.target.value })
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#0a6b3c] focus:ring-2 focus:ring-green-100"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasFilters}
          className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear
        </button>
      </div>
    </section>
  );
}
