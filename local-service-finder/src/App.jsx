import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import PostService from './pages/PostService.jsx'
import './index.css'

function App() {
  // ✅ State must be here, at the top of the component
  const [services, setServices] = useState([
    { id: 1, name: "Plumbing", category: "Repair", location: "Phnom Penh", price: 20, rating: 4.5, description: "Fix leaks and pipes", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Math Tutor", category: "Tutor", location: "Siem Reap", price: 15, rating: 4.8, description: "One-on-one tutoring", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Food Delivery", category: "Food", location: "Battambang", price: 5, rating: 4.2, description: "Local meals delivered", imageUrl: "https://via.placeholder.com/150" },
  ]);

  const addService = (newService) => {
    setServices([...services, { ...newService, id: services.length + 1 }]);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services services={services} />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/post-service" element={<PostService onAddService={addService} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);



export default App;
