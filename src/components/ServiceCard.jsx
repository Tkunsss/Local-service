// Instruction: Show image, name, rating, price, and short info (list page).
// Instruction: Link to Service Detail page and include favorite button (UI only).
// Instruction: Handle missing data by showing safe placeholders.

import { useState } from "react";
import { Link } from "react-router-dom";

// Service card component: image, meta, CTA, and save toggle.
export default function ServiceCard({
  id,
  name = "Unknown Service",
  category = "Uncategorized",
  location = "Unknown Location",
  price = 0,
  rating = "N/A",
  distance = "1.2 km",
  description = "No description available",
  imageUrl = "/placeholder.svg",
  style
}) {
  // Simple local "save" state (not persisted).
  const [saved, setSaved] = useState(false);
  // Shorten description to keep cards compact.
  const shortDescription =
    description.length > 60 ? `${description.substring(0, 60)}...` : description;

  return (
    <article
      className="rounded-2xl bg-white p-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
      style={style}
    >
      {/* Instruction: Place image + favorite button here */}
      <div className="relative">
        {/* Service image with fallback */}
        <img
          src={imageUrl}
          alt={name}
          className="h-36 w-full rounded-2xl object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        {/* Local save toggle (UI-only) */}
        <button
          className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-700 shadow"
          type="button"
          // Toggle local save state.
          onClick={() => setSaved((prev) => !prev)}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      {/* Instruction: Place name, rating, price, and short description here */}
      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-900">{name}</h3>
        <span className="text-xs text-zinc-500">{distance}</span>
      </div>
      <p className="mt-1 text-sm text-zinc-500">{category} · {location}</p>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-zinc-900">${price}</span>
        <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
          {rating} rating
        </span>
      </div>
      <p className="mt-3 text-sm text-zinc-600">{shortDescription}</p>

      {/* Instruction: Add link/button to open Service Detail page */}
      <Link
        to={`/services/${id}`}
        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 active:scale-[0.98]"
      >
        View Details
      </Link>
    </article>
  );
}
