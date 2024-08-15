import { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders/user');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Order ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Image</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Title</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Price</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Quantity</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Total Cost</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Delivery Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => 
              order.items.map((item, index) => (
                <tr key={`${order._id}-${index}`}>
                  <td className="py-2 px-4 border-b border-gray-200">{order._id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.quantity}</td>
                  <td className="py-2 px-4 border-b border-gray-200">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{order.deliveryAddress}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTab;
