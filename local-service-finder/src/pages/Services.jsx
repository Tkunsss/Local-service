// Instruction: Render a list of all services using ServiceCard.
// Instruction: Add filters for price, rating, and category.
// Instruction: Support live search and location filter from SearchBar.


import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";

export default function Services({ services = [] }) {
  const [serviceQuery, setServiceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const filteredServices = services.filter(s => {
    const matchesService = s.name.toLowerCase().includes(serviceQuery.toLowerCase());
    const matchesLocation = locationQuery === "" || s.location === locationQuery;
    const matchesCategory = categoryFilter === "" || s.category === categoryFilter;
    const matchesPrice = priceFilter === "" || s.price <= parseFloat(priceFilter);
    const matchesRating = ratingFilter === "" || s.rating >= parseFloat(ratingFilter);

    return matchesService && matchesLocation && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <main className="mx-auto max-w-md pb-6">
      <div className="mt-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">All Services</h2>
          <p className="text-sm text-zinc-500">{filteredServices.length} results</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 shadow-sm hover:border-zinc-300">
            Sort
          </button>
          <button className="rounded-2xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-zinc-800">
            Filter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 grid gap-3 rounded-2xl bg-white p-4 shadow-lg">
        <label className="text-xs font-semibold text-zinc-600">
          Category
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
          >
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Repair">Repair</option>
            <option value="Home">Home</option>
            <option value="Tutor">Tutor</option>
            <option value="Transport">Transport</option>
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs font-semibold text-zinc-600">
            Max Price
            <input
              type="number"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              placeholder="e.g. 20"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
          </label>

          <label className="text-xs font-semibold text-zinc-600">
            Min Rating
            <input
              type="number"
              step="0.1"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              placeholder="e.g. 4.0"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
          </label>
        </div>
      </div>

      {/* Search + location filter */}
      <SearchBar
        service={serviceQuery}
        setService={setServiceQuery}
        location={locationQuery}
        setLocation={setLocationQuery}
        onClear={() => {
          setServiceQuery("");
          setLocationQuery("");
        }}
      />

      {/* Services list */}
      <div className="mt-4 grid gap-4">
        {filteredServices.length > 0 ? (
          filteredServices.map(s => <ServiceCard key={s.id} {...s} />)
        ) : (
          <p className="text-sm text-zinc-500">No services found.</p>
        )}
      </div>
    </main>
  );
}
