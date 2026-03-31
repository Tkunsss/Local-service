// Instruction: Render a list of all services using ServiceCard.
// Instruction: Add filters for price, rating, and category.
// Instruction: Support live search and location filter from SearchBar.


import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";

const allServices = [
  { id: 1, name: "Plumbing", category: "Repair", location: "Phnom Penh", price: 20, rating: 4.5, description: "Fix leaks and pipes", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "Math Tutor", category: "Tutor", location: "Siem Reap", price: 15, rating: 4.8, description: "One-on-one tutoring", imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Food Delivery", category: "Food", location: "Battambang", price: 5, rating: 4.2, description: "Local meals delivered", imageUrl: "https://via.placeholder.com/150" },
];

export default function Services({ services }) {
  const [serviceQuery, setServiceQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const filteredServices = Services.filter(s => {
    const matchesService = s.name.toLowerCase().includes(serviceQuery.toLowerCase());
    const matchesLocation = locationQuery === "" || s.location === locationQuery;
    const matchesCategory = categoryFilter === "" || s.category === categoryFilter;
    const matchesPrice = priceFilter === "" || s.price <= parseFloat(priceFilter);
    const matchesRating = ratingFilter === "" || s.rating >= parseFloat(ratingFilter);

    return matchesService && matchesLocation && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <main className="services">
      <h2>Available Services</h2>

      {/* Filters */}
      <div className="filters">
        <label>
          Category:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Repair">Repair</option>
            <option value="Tutor">Tutor</option>
            <option value="Transport">Transport</option>
          </select>
        </label>

        <label>
          Max Price:
          <input
            type="number"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            placeholder="e.g. 20"
          />
        </label>

        <label>
          Min Rating:
          <input
            type="number"
            step="0.1"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            placeholder="e.g. 4.0"
          />
        </label>
      </div>

      {/* Search + location filter */}
      <SearchBar
        service={serviceQuery}
        setService={setServiceQuery}
        location={locationQuery}
        setLocation={setLocationQuery}
      />

      {/* Services list */}
      <div className="service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map(s => <ServiceCard key={s.id} {...s} />)
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </main>
  );
}