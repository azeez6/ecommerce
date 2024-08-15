// import { useContext, useState, useEffect } from 'react';
// import AuthContext from '../context/AuthContext';
// import axios from 'axios';

// const ProductsTab = () => {
//   const { user, createProduct } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     cost: ''
//   });
//   const [image, setImage] = useState(null);
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     if (user) {
//       try {
//         const response = await axios.get(`/products/user`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('seller', user._id);
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('cost', formData.cost);
//     data.append('image', image);

//     try {
//       await createProduct(data);
//       setFormData({ title: '', description: '', cost: '' });
//       setImage(null);
//       // Refresh products
//     //   const response = await axios.get(`/products/user`);
//     //   setProducts(response.data);
//     fetchProducts();


//     } catch (error) {
//       console.error('Error creating product:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/products/${id}`);
//       setProducts(products.filter((product) => product._id !== id));
//     } catch (error) {
//       console.error('Failed to delete product', error);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-xl font-bold mb-4">Add Product</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-6">
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Cost</label>
//           <input
//             type="number"
//             name="cost"
//             value={formData.cost}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Product Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             accept="image/*"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
//         >
//           Add Product
//         </button>
//       </form>
//       <h2 className="text-xl font-bold mb-4">Your Products</h2>
//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <ul>
//           {products.map((product) => (
//             <li key={product._id} className="mb-4">
//               <h3 className="text-lg font-bold">{product.title}</h3>
//               <p>{product.description}</p>
//               <p>${product.cost}</p>
//               <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
//               <button
//               onClick={() => handleDelete(product._id)}
//               className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//             >
//               Delete
//             </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };

// export default ProductsTab;

import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Modal from 'react-modal';

const ProductsTab = () => {
  const { user, createProduct } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cost: ''
  });
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: '',
    title: '',
    description: '',
    cost: '',
    image: null,
  });

  const fetchProducts = async () => {
    if (user) {
      try {
        const response = await axios.get(`/products/user`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('seller', user._id);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('cost', formData.cost);
    data.append('image', image);

    try {
      await createProduct(data);
      setFormData({ title: '', description: '', cost: '' });
      setImage(null);
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', updateData.title);
    data.append('description', updateData.description);
    data.append('cost', updateData.cost);
    if (updateData.image) {
      data.append('image', updateData.image);
    }

    try {
      await axios.put(`/products/${updateData.id}`, data);
      fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  const openModal = (product) => {
    setUpdateData({
      id: product._id,
      title: product.title,
      description: product.description,
      cost: product.cost,
      image: null
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdateImageChange = (e) => {
    setUpdateData({ ...updateData, image: e.target.files[0] });
  };

  return (
    <>
    <div className="max-w-md ">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-6 ">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Cost</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Add Product
        </button>
      </form>
      </div>
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="mb-4 max-w-200 flex gap-24 flex-row">
          {products.map((product) => (
            <li key={product._id} className="mb-4  ">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p>${product.cost}</p>
              <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Delete
              </button>
              <button
                onClick={() => openModal(product)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 ml-2"
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Product"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Update Product</h2>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={updateData.title}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={updateData.description}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Cost</label>
              <input
                type="number"
                name="cost"
                value={updateData.cost}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Image</label>
              <input
                type="file"
                name="image"
                onChange={handleUpdateImageChange}
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Update Product
            </button>
            <button
              onClick={closeModal}
              className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 mt-4"
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
      
    </>
  );
};

export default ProductsTab;



