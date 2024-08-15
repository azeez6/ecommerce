const express = require('express');
const router = express.Router();
const { 
  getDailySales, 
  getProductSales, 
  getTopBestSellers, 
  getTopBestSellingProducts 
} = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/authMiddleware');

router.get('/daily-sales', authMiddleware, verifyAdmin, getDailySales);
router.get('/product-sales', authMiddleware, verifyAdmin, getProductSales);
router.get('/best-sellers', authMiddleware, verifyAdmin, getTopBestSellers);
router.get('/top-products', authMiddleware, verifyAdmin, getTopBestSellingProducts);

module.exports = router;
