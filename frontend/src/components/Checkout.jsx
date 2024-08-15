

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const navigate  =  useNavigate();


  const fetchCheckoutDetails = async () => {
    try {
      const response = await axios.get('/checkout/latest');
      setCheckoutDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching checkout details:', error);
      setLoading(false);
    }
  };

  const handleOrderSubmit = async () => {
    try {
      const orderData = {
        items: checkoutDetails.items,
        totalCost: checkoutDetails.totalCost,
        deliveryAddress
      };
      const response = await axios.post('/orders', orderData);
      alert('Order placed successfully!');
      navigate('/profile/orders')

      // Optionally, redirect to a confirmation page or clear checkout details
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  useEffect(() => {
    fetchCheckoutDetails();

    return () => {
      axios.delete('/checkout/clear')
      .then(response => {
        console.log('Checkout data cleared:', response.data);
      })
      .catch(error => {
        console.error('Error clearing checkout data:', error);
      });
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!checkoutDetails) {
    return <div>No recent checkout found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout Summary</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Image</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Title</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Price</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Quantity</th>
              <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {checkoutDetails.items.map((item, index) => (
              <tr key={index}>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <p className="text-lg font-bold">Total: ${checkoutDetails.totalCost.toFixed(2)}</p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleOrderSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
