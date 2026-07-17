"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchFilters() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSearch() {
    const path = propertyType
      ? `/housing/${propertyType}`
      : "/housing";

    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    const query = params.toString();

    router.push(query ? `${path}?${query}` : path);
  }

  return (
    <div className="mt-8 grid gap-4 rounded-2xl bg-white p-5 shadow md:grid-cols-4">
      <input
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Search by city or neighborhood"
        className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]"
      />

      <select
        value={propertyType}
        onChange={(event) => setPropertyType(event.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]"
      >
        <option value="">Property type</option>
        <option value="apartments">Apartment</option>
        <option value="houses">House</option>
        <option value="rooms">Room</option>
        <option value="roommates">Roommate</option>
      </select>

      <select
        value={maxPrice}
        onChange={(event) => setMaxPrice(event.target.value)}
        className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#087531]"
      >
        <option value="">Maximum price</option>
        <option value="800">$800</option>
        <option value="1200">$1,200</option>
        <option value="1800">$1,800</option>
        <option value="2500">$2,500</option>
      </select>

      <button
        type="button"
        onClick={handleSearch}
        className="rounded-lg bg-[#087531] px-5 py-3 font-semibold text-white hover:bg-[#064d2b]"
      >
        Search Housing
      </button>
    </div>
  );
}