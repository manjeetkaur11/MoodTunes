import React from 'react';
import '../style/Home.css';
import { FaSmile, FaMusic, FaUserAlt, FaTools, FaThumbsUp, FaChartLine, FaQuoteLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import moodTunesLogo from '../images/logo blue.svg'; 

const Home = () => {
  const navigate = useNavigate();

  const handleTapVibe = () => {
    const token = localStorage.getItem('email'); // ✅ Check login status

    if (token) {
      navigate('/dashboard'); // ✅ Logged in → go to dashboard
    } else {
      navigate('/signup'); // ❌ Not logged in → go to signup
    }
  };
  return (
    <div className="homepage">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Mood. Your Music.<br />Productivity, Amplified.</h1>
          <p>A personalized block coating touches the symphony of basics at your fingertips.</p>
          <button className="hero-btn" onClick={handleTapVibe}>Tap a Vibe</button>
        </div>
      </section>

      {/* Why MoodTunes */}
      <section className="features">
        <h2>Why MoodTunes?</h2>
        <div className="feature-cards">
          <div className="card">
            <FaSmile className="icon" />
            <h3>Mood Detection</h3>
            <p>Read emotions and offer curated experiences to elevate your vibe.</p>
          </div>
          <div className="card">
            <FaMusic className="icon" />
            <h3>Music Matching</h3>
            <p>Smart suggestions tailored to uplift, relax or energize your mood.</p>
          </div>
          <div className="card">
            <FaUserAlt className="icon" />
            <h3>Analyze Sound</h3>
            <p>Smart tracking to personalize your audio journey over time.</p>
          </div>
          <div className="card">
            <FaTools className="icon" />
            <h3>Productivity Tools</h3>
            <p>Tools to stay focused, beat procrastination, and work better.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <FaSmile className="icon" />
            <h3>Select Your Mood</h3>
            <p>Pick how you feel and let the system do the magic.</p>
          </div>
          <div className="step">
            <FaThumbsUp className="icon" />
            <h3>Get Matched Music</h3>
            <p>AI matches you with music based on your mood.</p>
          </div>
          <div className="step">
            <FaChartLine className="icon" />
            <h3>Boost Productivity</h3>
            <p>Feel focused and flow through your day effortlessly.</p>
          </div>
        </div>
      </section>

     <section className="testimonials">
  <h2 className="testimonials-title">Testimonials</h2>
  <div className="testimonial-box">
    <div className="quote-icon">❝</div>
    <p>
      <strong>MoodTunes</strong> has transformed my work from hot spots to cool
      flow. The mood-based playlists are spot on and help me focus like never before!
    </p>
    <div className="testimonial-author">— Happy User</div>
  </div>
</section>
 <footer className="footer">
      <div className="footer-container">
        <img src={moodTunesLogo} alt="MoodTunes"  className="logo-img" />
        <p className="footer-tagline">Your mood, your music. Amplified productivity & positivity.</p>
        
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/features">Features</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <p className="footer-bottom">© {new Date().getFullYear()} MoodTunes. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
};

export default Home;
