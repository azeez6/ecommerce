// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, logoutUser, getAllUsers, updateUserRole } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/authMiddleware');
const upload = require('../config/multer');


// router.post('/register', registerUser);
router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getProfile);
router.post('/logout', logoutUser);
router.get('/users', verifyAdmin, getAllUsers);
router.put('/update-role', verifyAdmin, updateUserRole); // Admin can update user role

module.exports = router;
