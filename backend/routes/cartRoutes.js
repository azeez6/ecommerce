// routes/cart.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

// Add item to cart
router.post('/add', authMiddleware, cartController.addItemToCart);

// Get all cart items
router.get('/', authMiddleware, cartController.getCartItems);

// Remove item from cart
router.delete('/remove/:id', authMiddleware, cartController.removeItemFromCart);

module.exports = router;

