import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/svgs/Quality-Academy.svg";
import './Footer.css';
import Notification from '../Notification/Notification';
import facebook from '../../assets/svgs/facebook.svg';
import instagram from '../../assets/svgs/Instagram.svg';
import linkedin from '../../assets/svgs/Linkedin.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const handleEnter = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      setNotification({ message: 'Thank you for subscribing!', type: 'success', visible: true });
      setEmail('');
    } else {
      setNotification({ message: 'Please enter a valid email address.', type: 'error', visible: true });
    }
  };

  return (
    <>
      <div className="footer">
        <div className="left">
          <img className="logo" src={logo} alt="logo" />
          <p className="footer-text">Bring your Learning to Next level</p>
          <p className="copyright">Copyright 2024 @ Quality Academy All rights reserved.</p>
        </div>
        <div className="center">
          <h2 className="heading">Company</h2>
          <ul className='footer-menu'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="right">
          <h2 className="heading heading-sub">Subscribe & Connect</h2>
          <form>
            <label className='newsletter-label' htmlFor="newsletter">Subscribe to our newsletter</label>
            <div className='newsletter-form'>
              <input className='newsletter-email' type="email" id="newsletter" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className='newsletter' type="submit" onClick={handleEnter}>Enter</button>
            </div>
          </form>

          <p className="social-heading">Social Media</p>

          <div className="socials">
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
            <img src={linkedin} alt="LinkedIn" />
          </div>
        </div>
      </div>
      <hr />
      <div className='footer-bottom' onClick={() => { window.location.href = "https://tarlose.com" }}>
        Designed & Developed By Tarlose
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
    </>
  );
}

export default Footer;