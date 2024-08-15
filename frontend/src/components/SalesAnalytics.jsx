import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const SalesAnalytics = () => {
  const [dailySales, setDailySales] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [dailySalesRes, productSalesRes, bestSellersRes, topProductsRes] = await Promise.all([
          axios.get('/analytics/daily-sales'),
          axios.get('/analytics/product-sales'),
          axios.get('/analytics/best-sellers'),
          axios.get('/analytics/top-products'),
        ]);

        setDailySales(dailySalesRes.data);
        setProductSales(productSalesRes.data);
        setBestSellers(bestSellersRes.data);
        setTopProducts(topProductsRes.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    console.log(dailySales);

    fetchAnalyticsData();
  }, []);
  
  const dailySalesChartData = {
    labels: dailySales.map(sale => sale._id),
    datasets: [{
      label: 'Daily Sales Volume',
      data: dailySales.map(sale => sale.totalSales),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const productSalesPieData = {
    labels: productSales.map(product => product._id),
    datasets: [{
      label: 'Product Sales',
      data: productSales.map(product => product.totalSold),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
    }],
  };

  const bestSellersChartData = {
    labels: bestSellers.map(product => product._id),
    datasets: [{
      label: 'Top 5 Best Sellers',
      data: bestSellers.map(product => product.totalSold),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  const topProductsPieData = {
    labels: topProducts.map(product => product._id),
    datasets: [{
      label: 'Top 3 Best Selling Products',
      data: topProducts.map(product => product.totalSold),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Sales Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-2 shadow-md rounded-lg h-64">
          <h3 className="text-base font-semibold text-center mb-2">Daily Sales Volume</h3>
          <Bar data={dailySalesChartData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-2 shadow-md rounded-lg h-64">
          <h3 className="text-base font-semibold text-center mb-2">Product Sales Distribution</h3>
          <Pie data={productSalesPieData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-2 shadow-md rounded-lg h-64">
          <h3 className="text-base font-semibold text-center mb-2">Top 5 Best Sellers</h3>
          <Bar data={bestSellersChartData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="bg-white p-2 shadow-md rounded-lg h-64">
          <h3 className="text-base font-semibold text-center mb-2">Top 3 Best Selling Products</h3>
          <Pie data={topProductsPieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
