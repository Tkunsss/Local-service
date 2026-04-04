import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import PostService from './pages/PostService.jsx';
import ReportIssue from './pages/ReportIssue.jsx';
import servicesData from './data/services.js';
import './index.css';
import BottomNav from './components/BottomNav.jsx';

// Root app component: holds global state and routes.
function App() {
  // Services list is persisted in localStorage to feel "real" between refreshes.
  const [services, setServices] = useState(() => {
    try {
      const stored = localStorage.getItem("lsf_services");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage errors and fall back to seed data.
    }
    return servicesData;
  });
  // Current location controls default filtering across the app.
  const [currentLocation, setCurrentLocation] = useState("Phnom Penh");

  // Add a new service to the list (used by PostService form).
  const addService = (newService) => {
    // Simple ID strategy: append after current list.
    setServices([...services, { ...newService, id: services.length + 1 }]);
  };

  // Persist services to localStorage whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem("lsf_services", JSON.stringify(services));
    } catch {
      // Ignore storage errors.
    }
  }, [services]);

    return (
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="min-h-screen bg-zinc-100 text-zinc-900 pb-20 sm:pb-24">
          {/* Top header with current location picker */}
          <Navbar
            currentLocation={currentLocation}
            onChangeLocation={setCurrentLocation}
          />
        <main className="px-4 sm:px-6 pb-6">
          {/* App routes: each page gets the data it needs */}
          <Routes>
            <Route
              path="/"
              element={<Home services={services} currentLocation={currentLocation} />}
            />
            <Route
              path="/services"
              element={<Services services={services} currentLocation={currentLocation} />}
            />
            <Route path="/services/:id" element={<ServiceDetail services={services} />} />
            <Route path="/post-service" element={<PostService onAddService={addService} />} />
            <Route path="/report" element={<ReportIssue />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
