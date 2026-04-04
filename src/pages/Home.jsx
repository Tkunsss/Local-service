// Instruction: Add a hero section with title + short description.
// Instruction: Include the SearchBar component.
// Instruction: Add categories (Food, Repair, Tutor, Transport).
// Instruction: Show 3 featured services using ServiceCard.

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";

// Home page: hero + search + categories + featured + recent views.
function Home({ services = [], currentLocation }) {
    const navigate = useNavigate();
    // Loading state is used only to show skeleton animation.
    const [loading, setLoading] = useState(true);

    // Filter featured services by current location (if set).
    const filteredServices = currentLocation
      ? services.filter((service) => service.location === currentLocation)
      : services;

    // Read recent views from localStorage.
    const recentViews = useMemo(() => {
      try {
        const stored = localStorage.getItem("lsf_recent");
        if (!stored) return [];
        const ids = JSON.parse(stored);
        if (!Array.isArray(ids)) return [];
        return ids
          .map((id) => services.find((s) => s.id === id))
          .filter(Boolean);
      } catch {
        return [];
      }
    }, [services]);

    useEffect(() => {
      // Short loading delay for skeleton animation.
      const timer = setTimeout(() => setLoading(false), 450);
      return () => clearTimeout(timer);
    }, []);

    return (
        <main className="mx-auto max-w-md sm:max-w-lg lg:max-w-3xl pb-6">
            {/* Instruction: Hero title + short description */}
            <section className="mt-5">
              <h1 className="text-2xl font-semibold">Find local services near you</h1>
              <p className="mt-2 text-sm text-zinc-600">
                Search trusted providers for food, repair, tutoring, and more.
              </p>
            </section>


            {/* Instruction: Insert <SearchBar /> here */}
            <section className="search">
                <SearchBar
                  initialLocation={currentLocation}
                  // On Home, search navigates to Services page.
                  onSearch={({ service, location }) => {
                    navigate("/services", { state: { service, location } });
                  }}
                />
            </section>


            {/* Instruction: Categories section (Food, Repair, Tutor, Transport) */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Categories</h2>
                <button
                  className="text-xs font-semibold text-accent"
                  type="button"
                  // Navigate to Services list.
                  onClick={() => navigate("/services")}
                >
                  See all
                </button>
              </div>
              {/* Horizontal scroll of category pills */}
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {[
                  { label: "Food", icon: "FD" },
                  { label: "Home", icon: "HM" },
                  { label: "Repair", icon: "RP" },
                  { label: "Tutor", icon: "TR" },
                  { label: "Transport", icon: "TP" }
                ].map((item) => (
                  <button
                    key={item.label}
                    className="min-w-[96px] rounded-2xl bg-white px-3 py-4 text-center shadow-lg"
                    type="button"
                    // Jump to Services with category filter applied.
                    onClick={() => navigate("/services", { state: { category: item.label } })}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-xs font-semibold text-white">
                      {item.icon}
                    </div>
                    <p className="mt-2 text-xs font-semibold text-zinc-700">{item.label}</p>
                  </button>
                ))}
              </div>
            </section>


            {/* Instruction: Featured services list (3 cards using ServiceCard) */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Featured Services</h2>
                <button
                  className="text-xs font-semibold text-accent"
                  type="button"
                  // Navigate to Services list.
                  onClick={() => navigate("/services")}
                >
                  View more
                </button>
              </div>
              {/* Featured list: skeletons while loading, cards after */}
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`featured-skeleton-${i}`}
                      className="h-48 rounded-2xl bg-white shadow-lg animate-pulse"
                    />
                  ))
                ) : filteredServices.length > 0 ? (
                  filteredServices.slice(0, 3).map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      {...service}
                      style={{ animationDelay: `${index * 60}ms` }}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl bg-white p-6 text-center text-sm text-zinc-500 shadow-lg">
                    No services available in this location yet.
                  </div>
                )}
              </div>
            </section>

            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Recent Views</h2>
              </div>
              {/* Recent views are loaded from localStorage */}
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {recentViews.length === 0 ? (
                  <div className="rounded-2xl bg-white p-4 text-sm text-zinc-500 shadow-lg">
                    You have not viewed any services yet.
                  </div>
                ) : (
                  recentViews.slice(0, 4).map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      {...service}
                      style={{ animationDelay: `${index * 60}ms` }}
                    />
                  ))
                )}
              </div>
            </section>


        </main>
    );
}

export default Home;
