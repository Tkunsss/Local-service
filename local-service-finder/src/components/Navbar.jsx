import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-zinc-900 text-white rounded-b-3xl shadow-lg">
      <div className="mx-auto max-w-md px-4 pt-5 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300">Current Location</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <h1 className="text-lg font-semibold">Phnom Penh</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/20 active:bg-white/30"
              title="Notifications"
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
