const Order = require('../models/Order');

// Fetch daily sales volume
const getDailySales = async (req, res) => {
  try {
    const dailySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalCost" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.status(200).json(dailySales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily sales data', error });
  }
};

// Fetch products sold
const getProductSales = async (req, res) => {
  try {
    const productSales = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.title",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
    ]);
    res.status(200).json(productSales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product sales data', error });
  }
};

// Fetch top 5 best sellers
const getTopBestSellers = async (req, res) => {
  try {
    const bestSellers = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.title",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json(bestSellers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching best sellers data', error });
  }
};

// Fetch top 3 best selling products for pie chart
const getTopBestSellingProducts = async (req, res) => {
  try {
    const bestSellingProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.title",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json(bestSellingProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching best selling products data', error });
  }
};

module.exports = { getDailySales, getProductSales, getTopBestSellers, getTopBestSellingProducts };
