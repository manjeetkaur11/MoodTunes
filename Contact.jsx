import React, { useState } from 'react';
import '../style/Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      alert('Thanks for reaching out! We’ll get back to you soon. 😊');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Oops! Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Got a question, feedback, or just want to say hi? We'd love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
