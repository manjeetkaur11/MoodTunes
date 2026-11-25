import React, { useState } from 'react';
import '../style/Signup.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();          
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        password
      });

      alert(res.data.message);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      navigate("/");
    } catch (err) {
      alert("Signup failed ❌");
      console.log(err);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1 className="logo">🎵 MoodTunes</h1>
        <h2>Sign Up</h2>
        <p>Create an account to personalize your experience.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="password-field">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span className="eye-icon">👁️</span>
          </div>
          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
