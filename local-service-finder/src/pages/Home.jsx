// Instruction: Add a hero section with title + short description.
// Instruction: Include the SearchBar component.
// Instruction: Add categories (Food, Repair, Tutor, Transport).
// Instruction: Show 3 featured services using ServiceCard.

import SearchBar from "../components/SearchBar";
import ServiceCard from "../components/ServiceCard";


function Home({ services = [] }) {
    return (
        <main className="mx-auto max-w-md pb-6">
            {/* Instruction: Hero title + short description */}
            <section className="mt-5">
              <h1 className="text-2xl font-semibold">Find local services near you</h1>
              <p className="mt-2 text-sm text-zinc-600">
                Search trusted providers for food, repair, tutoring, and more.
              </p>
            </section>


            {/* Instruction: Insert <SearchBar /> here */}
            <section className="search">
                <SearchBar />
            </section>


            {/* Instruction: Categories section (Food, Repair, Tutor, Transport) */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Categories</h2>
                <button className="text-xs font-semibold text-accent">See all</button>
              </div>
              <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                {[
                  { label: "Food", icon: "FD" },
                  { label: "Home", icon: "HM" },
                  { label: "Repair", icon: "RP" },
                  { label: "Tutor", icon: "TR" },
                  { label: "Transport", icon: "TP" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="min-w-[96px] rounded-2xl bg-white px-3 py-4 text-center shadow-lg"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-xs font-semibold text-white">
                      {item.icon}
                    </div>
                    <p className="mt-2 text-xs font-semibold text-zinc-700">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>


            {/* Instruction: Featured services list (3 cards using ServiceCard) */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Featured Services</h2>
                <button className="text-xs font-semibold text-accent">View more</button>
              </div>
              <div className="mt-3 grid gap-4">
                {services.slice(0, 3).map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            </section>


        </main>
    );
}

export default Home;
