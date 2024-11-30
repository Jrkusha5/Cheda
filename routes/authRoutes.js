const express = require('express');
const { registerUser, loginUser, logoutUser, updateUserProfile } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Logout a user
router.post('/logout', logoutUser);

// Update user profile
router.put('/profile', verifyToken, updateUserProfile);

module.exports = router;

