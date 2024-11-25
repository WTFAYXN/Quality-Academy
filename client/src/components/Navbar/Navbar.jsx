import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/svgs/Quality-Academy.svg";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo"><img src={logo} alt="Logo" /></div>
      <ul className="list">
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/get-started">Get Started</Link></li>
      </ul>
      <div className="cta">
        <button className="btn-login"><Link to="/login">Login</Link></button>
        <button className="btn-signup"><Link to="/signup">Signup</Link></button>
      </div>
    </div>
  );
};

export default Navbar;