import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from "../../assets/svgs/Quality-Academy.svg";
import userIcon from "../../assets/images/catLogo.png";
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking a token in localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
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
          <Link to="/user"><img src={userIcon} alt="User Icon" className="user-icon" /></Link>
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