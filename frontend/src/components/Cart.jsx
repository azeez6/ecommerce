import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('/cart');
      setCartItems(response.data.map(item => ({ ...item, quantity: 1 }))); // Initialize quantity to 1
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`/cart/remove/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id));
      alert('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart');
    }
  };

  const handleQuantityChange = (e
    // , itemId
) => {
    const newQuantity = Number(e.target.value);
    setCartItems(cartItems.map(item => 

    //   item._id === itemId ? 
      ({ ...item, quantity: newQuantity } )
    //   : item
    ));
  };

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.quantity * item.product.cost);
    }, 0);
  };

  const handleCheckout = async () => {
    const checkoutData = {
      items: cartItems.map(item => ({
        title: item.product.title,
        price: item.product.cost,
        image: item.product.imageUrl,
        quantity: item.quantity,
      })),
      totalCost: calculateTotalCost(),
    };

    

    try {
      await axios.post('/checkout', checkoutData);
      alert('Checkout successful');
      // Optionally, clear the cart or navigate to a different page
      setCartItems([]);
      navigate('/checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Image</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Title</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Cost</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Quantity</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Total Cost</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{item.product.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">${item.product.cost}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(e, item._id)}
                      className="border rounded w-full py-1 px-2"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    ${(item.quantity * item.product.cost).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <p className="text-lg font-bold">Total: ${calculateTotalCost().toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

