import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCart = async () => {
    try {
      const response = await axios.post('/cart/add', { productId: id });
      alert('Product added to cart!');
      navigate('/cart');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Product already in cart');
      } else {
        console.error('Error adding product to cart:', error);
        alert('Error adding product to cart');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 center">
      <h1 className="text-3xl font-bold mb-8">{product.title}</h1>
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-48 h-48 object-cover mb-4"
      />
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-gray-600">${product.cost}</p>
      <button
        onClick={addToCart}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
