// Instruction: Search bar should support service + location inputs as per Home page.
// Instruction: Wire to state later and use for filtering service cards.
// Instruction: Provide a clear/reset action and a visible search button.

import { useState } from "react";

export default function SearchBar(){
    const [service, setService] = useState("");
    const [location, setLocation] = useState("");

    
    const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${service} in ${location}`);

    const handleClear = () => {
    setService("");
    setLocation("");
  };

  };

    return(
        <form onSubmit={handleSearch} className="searchbar">
      {/* Service keyword input */}
      <input
        type="text"
        placeholder="Search service..."
        value={service}
        onChange={(e) => setService(e.target.value)}
      />

      {/* Location dropdown */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Select location</option>
        <option value="Phnom Penh">Phnom Penh</option>
        <option value="Siem Reap">Siem Reap</option>
        <option value="Battambang">Battambang</option>
        <option value="Kampot">Kampot</option>
      </select>

      {/* Search + Clear buttons */}
      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>

    )
}



