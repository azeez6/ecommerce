const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const { items, totalCost, deliveryAddress } = req.body;
  const userId = req.user.id;

  try {
    const newOrder = new Order({
      items,
      totalCost,
      deliveryAddress,
      userId,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).exec();
    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders for user:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});
router.get('/all', authMiddleware, verifyAdmin, async (req, res) => {
  

  try {
    const orders = await Order.find().populate('userId', 'name');
    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders for user:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

module.exports = router;
