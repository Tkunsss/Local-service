import { useState } from "react";
import { Link } from "react-router-dom";

// Location list shown in the header picker.
const locations = [
  { value: "Kandal", label: "Kandal (កណ្តាល)" },
  { value: "Kampot", label: "Kampot (កំពត)" },
  { value: "Kampong Cham", label: "Kampong Cham (កំពង់ចាម)" },
  { value: "Kampong Chhnang", label: "Kampong Chhnang (កំពង់ឆ្នាំង)" },
  { value: "Kampong Thom", label: "Kampong Thom (កំពង់ធំ)" },
  { value: "Kampong Speu", label: "Kampong Speu (កំពង់ស្ពឺ)" },
  { value: "Koh Kong", label: "Koh Kong (កោះកុង)" },
  { value: "Kratie", label: "Kratié (ក្រចេះ)" },
  { value: "Kep", label: "Kep (កែប)" },
  { value: "Takeo", label: "Takéo (តាកែវ)" },
  { value: "Tboung Khmum", label: "Tboung Khmum (ត្បូងឃ្មុំ)" },
  { value: "Battambang", label: "Battambang (បាត់ដំបង)" },
  { value: "Banteay Meanchey", label: "Banteay Meanchey (បន្ទាយមានជ័យ)" },
  { value: "Pailin", label: "Pailin (ប៉ៃលិន)" },
  { value: "Pursat", label: "Pursat (ពោធិ៍សាត់)" },
  { value: "Preah Vihear", label: "Preah Vihear (ព្រះវិហារ)" },
  { value: "Preah Sihanouk", label: "Preah Sihanouk (ព្រះសីហនុ)" },
  { value: "Prey Veng", label: "Prey Veng (ព្រៃវែង)" },
  { value: "Phnom Penh", label: "Phnom Penh (ភ្នំពេញ)" },
  { value: "Mondulkiri", label: "Mondulkiri (មណ្ឌលគិរី)" },
  { value: "Ratanakiri", label: "Ratanakiri (រតនគិរី)" },
  { value: "Siem Reap", label: "Siem Reap (សៀមរាប)" },
  { value: "Stung Treng", label: "Stung Treng (ស្ទឹងត្រែង)" },
  { value: "Svay Rieng", label: "Svay Rieng (ស្វាយរៀង)" },
  { value: "Oddar Meanchey", label: "Oddar Meanchey (ឧត្តរមានជ័យ)" }
];

// Header component: current location picker + quick actions.
export default function Navbar({ currentLocation, onChangeLocation }) {
  // Controls visibility of the location dropdown.
  const [showPicker, setShowPicker] = useState(false);

  return (
    <header className="bg-zinc-900 text-white rounded-b-3xl shadow-lg">
      <div className="mx-auto max-w-md sm:max-w-lg px-4 sm:px-6 pt-5 pb-6">
        {/* Top row: current location + quick actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300">Current Location</p>
            <button
              type="button"
              className="mt-1 flex items-center gap-2 text-left"
              // Toggle the location picker open/close.
              onClick={() => setShowPicker((prev) => !prev)}
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              <h1 className="text-lg font-semibold">
                {locations.find((loc) => loc.value === currentLocation)?.label ?? currentLocation}
              </h1>
            </button>
          </div>
          {/* Quick actions in header */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/20 active:bg-white/30"
              title="Notifications"
              // Demo action for alerts.
              onClick={() => {
                alert("No new alerts yet.");
              }}
            >
              Alerts
            </button>
            <Link
              to="/services"
              className="rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/20 active:bg-white/30"
            >
              Nearby
            </Link>
          </div>
        </div>
        {/* Location picker dropdown */}
        {showPicker && (
          <div className="mt-4 grid gap-2 rounded-2xl bg-white/10 p-3">
            {locations.map((loc) => (
              <button
                key={loc.value}
                type="button"
                onClick={() => {
                  // Update current location in App state.
                  onChangeLocation?.(loc.value);
                  setShowPicker(false);
                }}
                className={`rounded-2xl px-3 py-2 text-left text-sm ${
                  loc.value === currentLocation
                    ? "bg-accent text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        )}
        {/* Branding row */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300">Find services</p>
            <p className="text-xl font-semibold">Local Service Finder</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-accent text-center leading-10 text-sm font-semibold text-white">
            LSF
          </div>
        </div>
      </div>
    </header>
  );
}
