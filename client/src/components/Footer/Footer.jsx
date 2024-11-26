import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/svgs/Quality-Academy.svg";
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <img className="logo" src={logo} alt="logo" />
        <p className="footer-text">Bring your Education to Next level</p>
        <p className="copyright">Copyright 2024 @ Quality Academy All rights reserved.</p>
      </div>
      <div className="center">
        <h2 className="heading">Company</h2>
        <ul className='footer-menu'>
          <li>Home</li>
          <li>Terms</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="right">
        <h2 className="heading heading-sub">Subscribe & Connect</h2>
        <form>
          <label className='newsletter-label' htmlFor="newsletter">Subscribe to our newsletter</label>
          <input className='newsletter-email' type="email" id="newsletter" />
          <button className='newsletter' type="submit"></button>
        </form>

        <p className="social-heading">Social Media</p>

        <div className="socials">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18.5" fill="black" stroke="black" />
          </svg>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18.5" fill="black" stroke="black" />
          </svg>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19" cy="19" r="18.5" fill="black" stroke="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Footer;
