// Instruction: Add a hero section with title + short description.
// Instruction: Include the SearchBar component.
// Instruction: Add categories (Food, Repair, Tutor, Transport).
// Instruction: Show 3 featured services using ServiceCard.

import SearchBar from"../components/SearchBar";
import ServiceCard from "../components/ServiceCard";


function Home() {
    return (
        <main className="home">
            {/* Instruction: Hero title + short description */}
            <section className="hero">
            <h1> Find Local Service Near You</h1>
            <p>Quickly discover food, repair, tutoring, and transport services in your ares. </p>
            </section>


            {/* Instruction: Insert <SearchBar /> here */}
            <section className="search">
                <SearchBar />
            </section>


            {/* Instruction: Categories section (Food, Repair, Tutor, Transport) */}
            <section className="categories">
                <h2>Categories</h2>
                <ul>
                    <li>Food</li>
                    <li>Repair</li>
                    <li>Tutor</li>
                    <li>Transport</li>
                </ul>
            </section>


            {/* Instruction: Featured services list (3 cards using ServiceCard) */}
            <section className="featured">
                <h2>Featured Services</h2>
                <div className="featured-list">
                    <ServiceCard title="Plumbing Help" description="Fix leaks and pipes fast" />
                    <ServiceCard title="Math Tutor" description="One-on-one tutoring sessions" />
                    <ServiceCard title="Food Delivery" description="Local meals delivered to your door" />
                </div>
            </section>


        </main>
    );
}

export default Home;
