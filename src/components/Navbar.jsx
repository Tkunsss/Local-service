// Instruction: Update the brand name to your project name (e.g., "Local Service Finder").
// Instruction: Keep links aligned to the main pages listed in the project brief.
// Instruction: Use React Router <Link> later; for now <a> is fine for static UI.
// Instruction: Add icons, hover effects, and dark/light mode styles in your CSS/Tailwind.
import React from "react";
import { Home, Tooltip, Info, PlusCircle, User, Moon, Sun } from 'lucide-react';
import './Navbar.css';
function Navbar() {
    return (
        <nav className="navbar">
            {/* Instruction: Brand / logo text or icon */}
            <div className="navbar-brand">
                <span className="logo-icon">🔍</span>
                <h1>Local Service Finder</h1>
            </div>
            {/* Instruction: Main nav links (Home, Services, Detail, Post, Auth) */}
            <ul className="navbar-links">
                <li><a href="/"><Home size={18} /> Home</a></li>
                <li><a href="/services"><Tooltip size={18} /> Services</a></li>
                <li><a href="/detail"><Info size={18} /> Detail</a></li>
                <li><a href="/post"><PlusCircle size={18} /> Post Service</a></li>
            </ul>
            {/* Instruction: Actions (theme toggle + CTA button) */}
            <div className="navbar-actions">
                <button className="theme-toggle" title="Toggle Theme">
                    <Moon size={20} className="dark-icon" />
                    {/* <Sun size={20} className="light-icon" /> */}
                </button>

                <a href="/login" className="cta-button">
                    <User size={18} /> Login
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
