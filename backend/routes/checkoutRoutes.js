const express = require('express');
const router = express.Router();
const Checkout = require('../models/Checkout');
const Cart = require('../models/CartItem');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

// Checkout endpoint
router.post('/', authMiddleware, async (req, res) => {
  const { items, totalCost } = req.body;
  const userId = req.user.id;

  try {
    // Save order details to the database
    const newCheckout = new Checkout({
      items,
      totalCost,
      userId,
    });

    await newCheckout.save();

    // Clear the cart items for the user
    await Cart.deleteMany({ user:userId });

    res.status(201).json({ message: 'Checkout successful', checkout: newCheckout });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Checkout failed' });
  }
});

//Fetch the latest checkout for the logged-in user
router.get('/latest', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const latestCheckout = await Checkout.findOne({ userId }).sort({ createdAt: -1 }).exec();
    if (!latestCheckout) {
      return res.status(404).json({ message: 'No checkout found' });
    }
    res.json(latestCheckout);
  } catch (error) {
    console.error('Error fetching latest checkout:', error);
    res.status(500).json({ message: 'Failed to fetch latest checkout' });
  }
});

router.delete('/clear', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    await Checkout.deleteMany({ userId });
    res.status(200).json({ message: 'Checkout cleared' });
  } catch (error) {
    console.error('Error clearing checkout:', error);
    res.status(500).json({ message: 'Failed to clear checkout' });
  }
});





module.exports = router;
