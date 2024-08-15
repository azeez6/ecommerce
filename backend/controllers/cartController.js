// controllers/cartController.js
const CartItem = require('../models/CartItem');

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
  
    try {
      // Check if the product already exists in the user's cart
      const existingCartItem = await CartItem.findOne({ product: productId, user: userId });
  
      if (existingCartItem) {
        return res.status(400).json({ message: 'Product already in cart' });
      }
  
      const newCartItem = new CartItem({ product: productId, user: userId });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error });
    }
  };

// Get all cart items for the logged-in user
exports.getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await CartItem.find({ user: userId }).populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const cartItem = await CartItem.findOneAndDelete({ _id: id, user: userId });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    res.status(204).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};
