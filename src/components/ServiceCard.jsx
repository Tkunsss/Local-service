// Instruction: Show image, name, rating, price, and short info (list page).
// Instruction: Link to Service Detail page and include favorite button (UI only).
// Instruction: Handle missing data by showing safe placeholders.

import {Link} from "react-router-dom";

export default function ServiceCard({
  id,
  name = "Unknown Service",
  category = "Uncategorized",
  location = "Unknown Location",
  price = 0,
  rating = "N/A",
  description = "No description available",
  imageUrl = "https://via.placeholder.com/150"
}) {
    
    return (
        <article className="service-card">
            {/* Instruction: Place image + favorite button here */}
            <div className="card-header">
                <img src={imageUrl} alt={name}/>
                <button className="facorite-btn">❤️</button>
            </div>
            {/* Instruction: Place name, rating, price, and short description here */}
            <h3>{name}</h3>
                <p><strong>Rating:</strong> {rating}</p>
                <p><strong>Price:</strong> ${price}</p>
                <p>{description.substring(0, 60)}...</p>

            {/* Instruction: Add link/button to open Service Detail page */}
             <Link to={`/services/${id}`}>View Details</Link>

        </article>
    );
}


