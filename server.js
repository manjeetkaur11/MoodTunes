require('dotenv').config();             // Loads secret variables from .env file
const express = require('express');    // Loads Express framework (for creating APIs)
const mongoose = require('mongoose'); // Loads Mongoose to connect to MongoDB
const cors = require('cors');        // Allows frontend to talk to backend

const app = express();      // Creates your express server app
app.use(cors());           // Enables frontend & backend connection
app.use(express.json());  // Allows backend to read JSON (e.g., form data)

// Import Routes

// Use the master route file
const routes = require('./routes');
app.use('/api', routes);  // Final path: /api/users/signup

const moodRoutes = require('./routes/moodRoutes');
app.use('/api/mood', moodRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contact', contactRoutes); // ✅ This must be present


// Connect MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected ✅"))   // Shows success message
.catch(err => console.log(err));                  // Shows error if connection fails


// Start server
const PORT = process.env.PORT || 5000;  // Your server will run on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
