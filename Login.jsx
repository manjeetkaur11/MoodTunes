import React, { useState } from 'react';
import '../style/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const[name,setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      });

      alert(res.data.message);
      localStorage.setItem('email', email); // optional: for remembering user
      localStorage.setItem('name', res.data.name); 
      navigate('/dashboard');
    } catch (err) {
      alert("Invalid credentials ❌");
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="logo">🎵 MoodTunes</h1>
        <h2>Log In</h2>
        <p>Welcome back! Please enter your credentials.</p>

        <form onSubmit={handleLogin}>
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
          <button type="submit">Log In</button>
        </form>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
