import { Link, useLocation } from "react-router-dom";

// Bottom navigation items and routes.
const items = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Post", to: "/post-service" },
  { label: "Report", to: "/report" }
];

// Bottom navigation bar for primary routes.
export default function BottomNav() {
  // Use current location to highlight the active tab.
  const location = useLocation();

  return (
    // Fixed bottom nav for mobile UX.
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-zinc-200">
      <div className="mx-auto max-w-md sm:max-w-lg px-6 py-3">
        <div className="flex items-center justify-between">
          {items.map((item) => {
            // Active state is based on current path.
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 text-xs ${
                  active ? "text-accent" : "text-zinc-500"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    active ? "bg-accent" : "bg-zinc-300"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
