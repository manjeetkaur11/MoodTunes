import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';
import moodTunesLogo from '../images/logo blue.svg'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('email');

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={moodTunesLogo} alt="MoodTunes"  className="logo-img" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
