// Instruction: Build a form for providers to post a new service.
// Instruction: Fields: title, category, location, price, description, contact.
// Instruction: Add simple client-side validation and a submit button (UI only).

import { useState } from "react";

// Post service page: form for providers to submit a new service.
export default function PostService({ onAddService }) {
  // Form state for a new service (inputs + uploaded image).
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    price: "",
    description: "",
    contact: "",
    imageUrl: ""
  });
  // Local preview for the uploaded image (data URL).
  const [imagePreview, setImagePreview] = useState("");

  // Simple validation errors for required fields.
  const [errors, setErrors] = useState({});

  // Update form fields.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate and submit new service.
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    // Required fields check.
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.contact) newErrors.contact = "Contact info is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (onAddService) {
        // Map form data to service object.
        onAddService({
          name: formData.title,
          category: formData.category,
          location: formData.location,
          price: Number(formData.price),
          rating: 0,
          description: formData.description,
          imageUrl: formData.imageUrl || "/placeholder.svg"
        });
      }

      alert("Service submitted!");
      // Reset form after successful submit.
      setFormData({
        title: "",
        category: "",
        location: "",
        price: "",
        description: "",
        contact: "",
        imageUrl: ""
      });
      setImagePreview("");
    }
  };

  return (
    <main className="mx-auto max-w-md sm:max-w-lg lg:max-w-2xl pb-6">
      <div className="mt-5 rounded-2xl bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold text-zinc-900">Post a New Service</h2>
        <p className="mt-1 text-sm text-zinc-500">Share your service and reach more customers.</p>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          {/* Title */}
          <label className="text-xs font-semibold text-zinc-600">
            Title
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="e.g. Mobile Repair"
            />
            {errors.title && <span className="mt-1 block text-xs text-red-500">{errors.title}</span>}
          </label>

          {/* Category */}
          <label className="text-xs font-semibold text-zinc-600">
            Category
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="Food, Repair, Tutor..."
            />
            {errors.category && <span className="mt-1 block text-xs text-red-500">{errors.category}</span>}
          </label>

          {/* Location (dropdown) */}
          <label className="text-xs font-semibold text-zinc-600">
            Location
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
            >
              <option value="">Select location</option>
              <option value="Kandal">Kandal (កណ្តាល)</option>
              <option value="Kampot">Kampot (កំពត)</option>
              <option value="Kampong Cham">Kampong Cham (កំពង់ចាម)</option>
              <option value="Kampong Chhnang">Kampong Chhnang (កំពង់ឆ្នាំង)</option>
              <option value="Kampong Thom">Kampong Thom (កំពង់ធំ)</option>
              <option value="Kampong Speu">Kampong Speu (កំពង់ស្ពឺ)</option>
              <option value="Koh Kong">Koh Kong (កោះកុង)</option>
              <option value="Kratie">Kratié (ក្រចេះ)</option>
              <option value="Kep">Kep (កែប)</option>
              <option value="Takeo">Takéo (តាកែវ)</option>
              <option value="Tboung Khmum">Tboung Khmum (ត្បូងឃ្មុំ)</option>
              <option value="Battambang">Battambang (បាត់ដំបង)</option>
              <option value="Banteay Meanchey">Banteay Meanchey (បន្ទាយមានជ័យ)</option>
              <option value="Pailin">Pailin (ប៉ៃលិន)</option>
              <option value="Pursat">Pursat (ពោធិ៍សាត់)</option>
              <option value="Preah Vihear">Preah Vihear (ព្រះវិហារ)</option>
              <option value="Preah Sihanouk">Preah Sihanouk (ព្រះសីហនុ)</option>
              <option value="Prey Veng">Prey Veng (ព្រៃវែង)</option>
              <option value="Phnom Penh">Phnom Penh (ភ្នំពេញ)</option>
              <option value="Mondulkiri">Mondulkiri (មណ្ឌលគិរី)</option>
              <option value="Ratanakiri">Ratanakiri (រតនគិរី)</option>
              <option value="Siem Reap">Siem Reap (សៀមរាប)</option>
              <option value="Stung Treng">Stung Treng (ស្ទឹងត្រែង)</option>
              <option value="Svay Rieng">Svay Rieng (ស្វាយរៀង)</option>
              <option value="Oddar Meanchey">Oddar Meanchey (ឧត្តរមានជ័យ)</option>
            </select>
            {errors.location && <span className="mt-1 block text-xs text-red-500">{errors.location}</span>}
          </label>

          {/* Price */}
          <label className="text-xs font-semibold text-zinc-600">
            Price (USD)
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="10"
            />
            {errors.price && <span className="mt-1 block text-xs text-red-500">{errors.price}</span>}
          </label>

          {/* Description */}
          <label className="text-xs font-semibold text-zinc-600">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="Describe what you offer..."
            />
            {errors.description && <span className="mt-1 block text-xs text-red-500">{errors.description}</span>}
          </label>

          {/* Contact */}
          <label className="text-xs font-semibold text-zinc-600">
            Contact
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
              placeholder="Phone or Telegram"
            />
            {errors.contact && <span className="mt-1 block text-xs text-red-500">{errors.contact}</span>}
          </label>

          {/* Image upload + preview */}
          <label className="text-xs font-semibold text-zinc-600">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                // Read the image file as a data URL for preview + storage.
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const result = typeof reader.result === "string" ? reader.result : "";
                  setFormData((prev) => ({ ...prev, imageUrl: result }));
                  setImagePreview(result);
                };
                reader.readAsDataURL(file);
              }}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-accent focus:outline-none"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-28 w-full rounded-2xl object-cover"
              />
            ) : (
              <p className="mt-2 text-xs text-zinc-500">Upload a photo to preview it here.</p>
            )}
          </label>

          <button
            type="submit"
            className="mt-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:scale-[0.98]"
          >
            Submit Service
          </button>
        </form>
      </div>
    </main>
  );
}
