import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import PostService from './pages/PostService.jsx';
import servicesData from './data/services.js';
import './index.css';
import BottomNav from './components/BottomNav.jsx';

function App() {
  const [services, setServices] = useState(servicesData);

  const addService = (newService) => {
    setServices([...services, { ...newService, id: services.length + 1 }]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-zinc-100 text-zinc-900 pb-20">
        <Navbar />
        <main className="px-4 pb-6">
          <Routes>
            <Route path="/" element={<Home services={services} />} />
            <Route path="/services" element={<Services services={services} />} />
            <Route path="/services/:id" element={<ServiceDetail services={services} />} />
            <Route path="/post-service" element={<PostService onAddService={addService} />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
