const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contact'); // import the model

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(200).json({ message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
