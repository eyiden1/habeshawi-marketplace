"use client";

import { useMemo, useState } from "react";
import type { Business, BusinessCategory } from "@/types/business";
import BusinessCard from "./BusinessCard";
import BusinessFilters, { type BusinessFilterValues } from "./BusinessFilters";

type BusinessListProps = {
  businesses: Business[];
};

const emptyFilters: BusinessFilterValues = {
  search: "",
  category: "",
  city: "",
};

export default function BusinessList({ businesses }: BusinessListProps) {
  const [filters, setFilters] = useState<BusinessFilterValues>(emptyFilters);

  const categories = useMemo(
    () =>
      Array.from(new Set(businesses.map((business) => business.category))).sort() as BusinessCategory[],
    [businesses],
  );

  const cities = useMemo(
    () => Array.from(new Set(businesses.map((business) => business.city))).sort(),
    [businesses],
  );

  const filteredBusinesses = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return businesses.filter((business) => {
      const matchesSearch =
        !search ||
        business.name.toLowerCase().includes(search) ||
        business.category.toLowerCase().includes(search) ||
        business.description.toLowerCase().includes(search) ||
        business.city.toLowerCase().includes(search);

      const matchesCategory =
        !filters.category || business.category === filters.category;
      const matchesCity = !filters.city || business.city === filters.city;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [businesses, filters]);

  const featuredBusinesses = filteredBusinesses.filter(
    (business) => business.featured,
  );
  const regularBusinesses = filteredBusinesses.filter(
    (business) => !business.featured,
  );

  return (
    <div className="mt-8">
      <BusinessFilters
        values={filters}
        categories={categories}
        cities={cities}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-900">
          Community businesses
        </h2>
        <p className="text-sm font-bold text-slate-500">
          {filteredBusinesses.length}{" "}
          {filteredBusinesses.length === 1 ? "business" : "businesses"}
        </p>
      </div>

      {featuredBusinesses.length > 0 ? (
        <section className="mt-6">
          <h3 className="mb-4 text-lg font-black text-[#064d2b]">
            Featured businesses
          </h3>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </section>
      ) : null}

      {regularBusinesses.length > 0 ? (
        <section className="mt-8">
          {featuredBusinesses.length > 0 ? (
            <h3 className="mb-4 text-lg font-black text-slate-800">
              More local businesses
            </h3>
          ) : null}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {regularBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </section>
      ) : null}

      {filteredBusinesses.length === 0 ? (
        <section className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <h3 className="text-xl font-black text-slate-900">
            No businesses found
          </h3>
          <p className="mt-2 text-slate-600">
            Try a different search, category, or city.
          </p>
          <button
            type="button"
            onClick={() => setFilters(emptyFilters)}
            className="mt-5 rounded-xl bg-[#064d2b] px-5 py-3 font-black text-white"
          >
            Clear filters
          </button>
        </section>
      ) : null}
    </div>
  );
}
