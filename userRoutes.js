const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// POST /api/users/signup
router.post('/signup', registerUser);

router.post('/login', loginUser);

module.exports = router;
