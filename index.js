const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

// Prefix all user-related routes with /users
router.use('/users', userRoutes);



module.exports = router;
