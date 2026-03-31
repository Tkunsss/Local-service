// Instruction: Load the selected service by ID.
// Instruction: Show full details (name, category, location, price, description).
// Instruction: Add contact buttons (call/chat UI) and reviews section.
// Instruction: Provide a back link to the Services list.

import {useParams,Link} from "react-router-dom";

const allServices = [
  { id: "1", name: "Plumbing", category: "Repair", location: "Phnom Penh", price: 20, rating: 4.5, description: "Fix leaks and pipes", imageUrl: "https://via.placeholder.com/150" },
  { id: "2", name: "Math Tutor", category: "Tutor", location: "Siem Reap", price: 15, rating: 4.8, description: "One-on-one tutoring", imageUrl: "https://via.placeholder.com/150" },
  { id: "3", name: "Food Delivery", category: "Food", location: "Battambang", price: 5, rating: 4.2, description: "Local meals delivered", imageUrl: "https://via.placeholder.com/150" },
];



export default function ServiceDetail() {
    const{id}=useParams();
    const service=allServices.find(s=>s.id === id);

    if (!service) {
    return (
      <main className="service-detail">
        <p>Service not found.</p>
        <Link to="/services">← Back to Services</Link>
      </main>
    );
  }


    return (
        <main className="service-detail">
            {/* Instruction: Back link to Services list */}
             <Link to="/services">← Back to Services</Link>

            {/* Instruction: Full service info (name, category, location, price, description) */}
            <h2>{service.name}</h2>
            <img src={service.imageUrl} alt={service.name} />
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Location:</strong> {service.location}</p>
            <p><strong>Price:</strong> ${service.price}</p>
            <p><strong>Rating:</strong> {service.rating}</p>
            <p>{service.description}</p>


            {/* Instruction: Contact buttons (call / chat UI) */}
        <div className="contact-buttons">
            <button>📞 Call</button>
            <button>💬 Chat</button>
        </div>

            {/* Instruction: Reviews section */}
         {/* Reviews section */}
      <section className="reviews">
        <h3>Reviews</h3>
        <ul>
          <li>⭐️⭐️⭐️⭐️⭐️ Great service, fixed my sink quickly!</li>
          <li>⭐️⭐️⭐️⭐️ Very helpful and polite.</li>
          <li>⭐️⭐️⭐️ Average, but got the job done.</li>
        </ul>
      </section>

        </main>
    );
}
