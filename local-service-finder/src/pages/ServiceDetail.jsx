// Instruction: Load the selected service by ID.
// Instruction: Show full details (name, category, location, price, description).
// Instruction: Add contact buttons (call/chat UI) and reviews section.
// Instruction: Provide a back link to the Services list.

import { useParams, Link } from "react-router-dom";

export default function ServiceDetail({ services = [] }) {
  const { id } = useParams();
  const numericId = Number(id);
  const service = services.find((s) => s.id === numericId);

  if (!service) {
    return (
      <main className="service-detail">
        <p>Service not found.</p>
        <Link to="/services">Back to Services</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md pb-6">
      {/* Instruction: Back link to Services list */}
      <Link to="/services" className="mt-4 inline-flex text-sm font-semibold text-zinc-600">
        Back to Services
      </Link>

      {/* Instruction: Full service info (name, category, location, price, description) */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-lg">
        <img src={service.imageUrl} alt={service.name} className="h-56 w-full object-cover" />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
              {service.rating} rating
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            {service.category} · {service.location}
          </p>
          <p className="mt-2 text-sm text-zinc-600">{service.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-zinc-900">${service.price}</p>
            <button className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:scale-[0.98]">
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Instruction: Reviews section */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-lg">
        <h3 className="text-base font-semibold">Reviews</h3>
        <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
          <li>5/5 Great service, fixed my sink quickly!</li>
          <li>4/5 Very helpful and polite.</li>
          <li>3/5 Average, but got the job done.</li>
        </ul>
      </section>
    </main>
  );
}
