// Instruction: Load the selected service by ID.
// Instruction: Show full details (name, category, location, price, description).
// Instruction: Add contact buttons (call/chat UI) and reviews section.
// Instruction: Provide a back link to the Services list.

import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Service detail page: shows full info, reviews, and rating form.
export default function ServiceDetail({ services = [] }) {
  const { id } = useParams();
  const numericId = Number(id);
  const service = services.find((s) => s.id === numericId);
  const [ratingInput, setRatingInput] = useState("5");
  const [commentInput, setCommentInput] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  // Local reviews list (no backend yet).
  const [reviews, setReviews] = useState([
    { id: 1, rating: 5, text: "Great service, fixed my sink quickly!" },
    { id: 2, rating: 4, text: "Very helpful and polite." },
    { id: 3, rating: 3, text: "Average, but got the job done." }
  ]);

  // Compute average rating from local reviews.
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return service?.rating ?? 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews, service]);

  useEffect(() => {
    // Save recent views to localStorage for Home page.
    if (!service) return;
    try {
      const stored = localStorage.getItem("lsf_recent");
      const parsed = stored ? JSON.parse(stored) : [];
      const next = Array.isArray(parsed) ? parsed.filter((id) => id !== service.id) : [];
      next.unshift(service.id);
      localStorage.setItem("lsf_recent", JSON.stringify(next.slice(0, 10)));
    } catch {
      // Ignore storage errors.
    }
  }, [service]);

  if (!service) {
    // Guard: if service ID is invalid, show a safe fallback.
    return (
      <main className="service-detail">
        <p>Service not found.</p>
        <Link to="/services">Back to Services</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md sm:max-w-lg lg:max-w-3xl pb-6">
      {/* Instruction: Back link to Services list */}
      <Link to="/services" className="mt-4 inline-flex text-sm font-semibold text-zinc-600">
        Back to Services
      </Link>

      {/* Instruction: Full service info (name, category, location, price, description) */}
      <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Main service image */}
        <img
          src={service.imageUrl || "/placeholder.svg"}
          alt={service.name}
          className="h-56 w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="p-4">
          {/* Title + rating badge */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
              {averageRating} rating
            </span>
          </div>
          {/* Meta info */}
          <p className="mt-1 text-sm text-zinc-500">
            {service.category} · {service.location}
          </p>
          {/* Description */}
          <p className="mt-2 text-sm text-zinc-600">{service.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-zinc-900">${service.price}</p>
            <div className="flex gap-2">
              <button
                className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:scale-[0.98]"
                type="button"
                // Demo call action.
                onClick={() => {
                  alert("Calling service provider...");
                }}
              >
                Call Now
              </button>
              <button
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-lg hover:border-zinc-300 active:scale-[0.98]"
                type="button"
                onClick={async () => {
                  try {
                    // Copy current URL to clipboard.
                    await navigator.clipboard.writeText(window.location.href);
                    setShareMessage("Link copied!");
                    setTimeout(() => setShareMessage(""), 2000);
                  } catch {
                    setShareMessage("Copy failed");
                    setTimeout(() => setShareMessage(""), 2000);
                  }
                }}
              >
                Share
              </button>
            </div>
          </div>
          {shareMessage && (
            <p className="mt-2 text-xs text-zinc-500">{shareMessage}</p>
          )}
        </div>
      </div>

      {/* Instruction: Reviews section */}
      <section className="mt-6 rounded-2xl bg-white p-4 shadow-lg">
        <h3 className="text-base font-semibold">Reviews</h3>
        <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
          {/* Render each review line */}
          {reviews.map((review) => (
            <li key={review.id}>
              {review.rating}/5 {review.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-4 shadow-lg">
        <h3 className="text-base font-semibold">Leave a rating</h3>
        <form
          className="mt-3 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!commentInput.trim()) return;
            // Add a new review to the top of the list.
            setReviews((prev) => [
              { id: Date.now(), rating: Number(ratingInput), text: commentInput.trim() },
              ...prev
            ]);
            setCommentInput("");
            setRatingInput("5");
          }}
        >
          <label className="text-xs font-semibold text-zinc-600">
            Rating
            <select
              value={ratingInput}
              onChange={(e) => setRatingInput(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Okay</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Bad</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-zinc-600">
            Feedback
            <textarea
              rows={3}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Share your experience..."
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 active:scale-[0.98]"
          >
            Submit Review
          </button>
        </form>
      </section>
    </main>
  );
}
