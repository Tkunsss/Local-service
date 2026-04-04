import { useState } from "react";

// Report issue page: simple form for users to report problems.
export default function ReportIssue() {
  // Form state for reporting a problem.
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    issue: "",
    details: ""
  });
  // Simple submitted state to show confirmation message.
  const [submitted, setSubmitted] = useState(false);

  // Update form fields.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple client-side submit (no backend yet).
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issue.trim() || !formData.details.trim()) return;
    setSubmitted(true);
    setFormData({ name: "", contact: "", issue: "", details: "" });
  };

  return (
    <main className="mx-auto max-w-md sm:max-w-lg lg:max-w-2xl pb-6">
      <div className="mt-5 rounded-2xl bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold text-zinc-900">Report a Problem</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Tell us what went wrong and we will fix it quickly.
        </p>

        {/* Report form */}
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          {/* Name */}
          <label className="text-xs font-semibold text-zinc-600">
            Your Name (optional)
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="Your name"
            />
          </label>

          {/* Contact */}
          <label className="text-xs font-semibold text-zinc-600">
            Contact (optional)
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="Phone or email"
            />
          </label>

          {/* Issue type */}
          <label className="text-xs font-semibold text-zinc-600">
            Issue Type
            <select
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
            >
              <option value="">Select an issue</option>
              <option value="Bug">Bug</option>
              <option value="Payment">Payment</option>
              <option value="Account">Account</option>
              <option value="Performance">Performance</option>
              <option value="Other">Other</option>
            </select>
          </label>

          {/* Details */}
          <label className="text-xs font-semibold text-zinc-600">
            Details
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="Describe the problem..."
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:scale-[0.98]"
          >
            Send Report
          </button>
          {submitted && (
            <p className="text-sm text-green-600">
              Thanks! Your report has been received.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
