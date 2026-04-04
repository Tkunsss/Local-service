// Instruction: Search bar should support service + location inputs as per Home page.
// Instruction: Wire to state later and use for filtering service cards.
// Instruction: Provide a clear/reset action and a visible search button.

import { useState } from "react";

export default function SearchBar({
  service,
  setService,
  location,
  setLocation,
  onSearch,
  onClear
}) {
  const [localService, setLocalService] = useState("");
  const [localLocation, setLocalLocation] = useState("");

  const serviceValue = service ?? localService;
  const locationValue = location ?? localLocation;
  const setServiceValue = setService ?? setLocalService;
  const setLocationValue = setLocation ?? setLocalLocation;

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ service: serviceValue, location: locationValue });
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      setServiceValue("");
      setLocationValue("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="mt-4 flex gap-2">
      {/* Service keyword input */}
      <input
        type="text"
        placeholder="Search service..."
        value={serviceValue}
        onChange={(e) => setServiceValue(e.target.value)}
        className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none"
      />

      {/* Location dropdown */}
      <select
        value={locationValue}
        onChange={(e) => setLocationValue(e.target.value)}
        className="rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm shadow-sm focus:border-accent focus:outline-none"
      >
        <option value="">Select location</option>
        <option value="Phnom Penh">Phnom Penh</option>
        <option value="Siem Reap">Siem Reap</option>
        <option value="Battambang">Battambang</option>
        <option value="Kampot">Kampot</option>
      </select>

      {/* Search + Clear buttons */}
      <button
        type="submit"
        className="rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:scale-[0.98]"
      >
        Search
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-600 hover:border-zinc-300 active:scale-[0.98]"
      >
        Clear
      </button>
    </form>

  );
}



