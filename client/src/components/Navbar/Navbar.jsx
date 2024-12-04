import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from "../../assets/svgs/Quality-Academy.svg";
import userIcon from "../../assets/images/catLogo.png";
import adminIcon from "../../assets/images/email.png"; // Add the admin icon image
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking a token in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // Fetch user data to check if the user is an admin
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await response.json();
          if (userData.role === 1) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav-container">
      <div className="logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>

      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links */}
      <ul className={`list ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/#overview">Overview</Link></li>
        <li><Link to="/#features">Features</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/#testimonials">Testimonials</Link></li>
        <li><Link to="/#get-started">Get Started</Link></li>
      </ul>

      {/* Call to Action Buttons */}
      <div className="cta">
        {isLoggedIn ? (
          <div className="user-section">
            {isAdmin && <Link to="/admin/requests"><img src={adminIcon} alt="Admin Icon" className="admin-icon" /></Link>} {/* Conditionally render admin icon */}
            <Link to="/user"><img src={userIcon} alt="User Icon" className="user-icon" /></Link>
          </div>
        ) : (
          <>
            <button className="btn-login"><Link to="/login">Login</Link></button>
            <button className="btn-signup"><Link to="/signup">Signup</Link></button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;