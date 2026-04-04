// Instruction: Search bar should support service + location inputs as per Home page.
// Instruction: Wire to state later and use for filtering service cards.
// Instruction: Provide a clear/reset action and a visible search button.

import { useState } from "react";

// Reusable search form used on Home (uncontrolled) and Services (controlled).
export default function SearchBar({
  service,
  setService,
  location,
  setLocation,
  initialLocation,
  onSearch,
  onClear
}) {
  // Local state is used only when parent does not provide controlled props.
  // This lets the same SearchBar work in Home (uncontrolled) and Services (controlled).
  const [localService, setLocalService] = useState("");
  const [localLocation, setLocalLocation] = useState(initialLocation ?? "");

  // Prefer controlled props when available; fall back to local state.
  // serviceValue/locationValue are what we actually render in inputs.
  const serviceValue = service ?? localService;
  const locationValue = location ?? localLocation;
  // setServiceValue/setLocationValue point to the right setter (controlled or local).
  const setServiceValue = setService ?? setLocalService;
  const setLocationValue = setLocation ?? setLocalLocation;

  // Submit search (used on Home to navigate).
  const handleSearch = (e) => {
    e.preventDefault();
    // Only fire if parent provided an onSearch handler.
    if (onSearch) {
      onSearch({ service: serviceValue, location: locationValue });
    }
  };

  // Clear inputs (used on Services to reset filters).
  const handleClear = () => {
    // If parent wants custom clear behavior, call it.
    if (onClear) {
      onClear();
    } else {
      // Otherwise reset local or controlled state.
      setServiceValue("");
      setLocationValue("");
    }
  };

  return (
    // On mobile we stack inputs; on larger screens we show one row.
    <form onSubmit={handleSearch} className="mt-4 grid gap-2 sm:flex sm:gap-3">
      {/* Service keyword input */}
      <input
        type="text"
        placeholder="Search service..."
        value={serviceValue}
        onChange={(e) => setServiceValue(e.target.value)}
        className="w-full flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none"
      />

      {/* Location dropdown */}
      <select
        value={locationValue}
        onChange={(e) => setLocationValue(e.target.value)}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm shadow-sm focus:border-accent focus:outline-none sm:w-44"
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

      {/* Search + Clear buttons */}
      <button
        type="submit"
        className="w-full rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105 active:scale-[0.98] sm:w-auto"
      >
        Search
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-600 hover:border-zinc-300 active:scale-[0.98] sm:w-auto"
      >
        Clear
      </button>
    </form>

  );
}



