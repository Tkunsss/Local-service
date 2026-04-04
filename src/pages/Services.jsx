// Instruction: Render a list of all services using ServiceCard.
// Instruction: Add filters for price, rating, and category.
// Instruction: Support live search and location filter from SearchBar.


import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";

// Services page: filters + search + list of service cards.
export default function Services({ services = [], currentLocation }) {
  const location = useLocation();
  // Search/filter state
  const [serviceQuery, setServiceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  // UI controls
  const [showFilters, setShowFilters] = useState(true);
  const [sortMode, setSortMode] = useState("rating");
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read incoming search/category state from Home page navigation.
    const state = location.state || {};
    if (state.service) setServiceQuery(state.service);
    if (state.location) setLocationQuery(state.location);
    if (state.category) setCategoryFilter(state.category);
  }, [location.state]);

  // Decide which location filter to use (current location vs. "all").
  const effectiveLocationQuery = useMemo(() => {
    if (showAllLocations) return "";
    if (locationQuery) return locationQuery;
    if (serviceQuery.trim()) return "";
    return currentLocation || "";
  }, [locationQuery, serviceQuery, currentLocation, showAllLocations]);

  // Build category dropdown dynamically from services list.
  const categoryOptions = Array.from(
    new Set(
      services
        .map((s) => s.category)
        .filter((value) => typeof value === "string" && value.trim() !== "")
        .map((value) => value.trim())
    )
  );

  if (categoryFilter && !categoryOptions.includes(categoryFilter)) {
    categoryOptions.unshift(categoryFilter);
  }

  // Apply all filters + sort.
  const filteredServices = services.filter(s => {
    const matchesService = s.name.toLowerCase().includes(serviceQuery.toLowerCase());
    const matchesLocation =
      effectiveLocationQuery === "" || s.location === effectiveLocationQuery;
    const matchesCategory = categoryFilter === "" || s.category === categoryFilter;
    const matchesPrice = priceFilter === "" || s.price <= parseFloat(priceFilter);
    const matchesRating = ratingFilter === "" || s.rating >= parseFloat(ratingFilter);

    return matchesService && matchesLocation && matchesCategory && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortMode === "price") return a.price - b.price;
    if (sortMode === "rating") return b.rating - a.rating;
    return 0;
  });

  useEffect(() => {
    // Short loading delay for skeleton animation.
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto max-w-md sm:max-w-lg lg:max-w-3xl pb-6">
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">All Services</h2>
          <p className="text-sm text-zinc-500">{filteredServices.length} results</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600 shadow-sm hover:border-zinc-300"
            // Toggle sort mode between rating and price.
            onClick={() => setSortMode((prev) => (prev === "rating" ? "price" : "rating"))}
          >
            Sort: {sortMode === "rating" ? "Rating" : "Price"}
          </button>
          <button
            type="button"
            className="rounded-2xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-zinc-800"
            // Show/hide filters on smaller screens.
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
      <div className="mt-4 grid gap-3 rounded-2xl bg-white p-4 shadow-lg sm:grid-cols-2">
        <label className="text-xs font-semibold text-zinc-600">
          Category
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
          >
            <option value="">All</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-3">
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
      )}

      {/* Search + location filter */}
      <SearchBar
        service={serviceQuery}
        setService={setServiceQuery}
        location={effectiveLocationQuery}
        setLocation={(value) => {
          // When user selects a location manually, turn off "show all".
          setLocationQuery(value);
          setShowAllLocations(false);
        }}
        initialLocation={currentLocation}
        onSearch={() => {
          // When searching by text, ignore location filter to show all results.
          if (serviceQuery.trim()) {
            setLocationQuery("");
          }
          setShowAllLocations(false);
          setShowFilters(false);
        }}
        onClear={() => {
          // Clear filters and show all locations.
          setServiceQuery("");
          setLocationQuery(currentLocation || "");
          setCategoryFilter("");
          setPriceFilter("");
          setRatingFilter("");
          setShowAllLocations(true);
        }}
      />

      {/* Services list */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {loading ? (
          // Skeleton loading state
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`service-skeleton-${i}`}
              className="h-52 rounded-2xl bg-white shadow-lg animate-pulse"
            />
          ))
        ) : filteredServices.length > 0 ? (
          // Render service cards
          filteredServices.map((s, index) => (
            <ServiceCard
              key={s.id}
              {...s}
              style={{ animationDelay: `${index * 60}ms` }}
            />
          ))
        ) : (
          // Empty state when no results
          <div className="sm:col-span-2 rounded-2xl bg-white p-6 text-center shadow-lg">
            <img
              src="/empty.svg"
              alt="No results"
              className="mx-auto h-32 w-32"
            />
            <p className="mt-3 text-sm text-zinc-500">
              No services found. Try a different search or clear filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
