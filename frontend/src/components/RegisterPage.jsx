// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const cities = [
//     'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi',
//     'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
//     'Sukkur', 'Bahawalpur', 'Jhang', 'Kasur', 'Sheikhupura',
//     'Mardan', 'Chiniot', 'Hyderabad', 'Dera Ghazi Khan', 'Gujrat',
//     'Mirpur Khas', 'Sargodha', 'Sahiwal', 'Mianwali', 'Narowal'
// ];

// const RegisterPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [age, setAge] = useState('');
//     const [gender, setGender] = useState('');
//     const [city, setCity] = useState('');
//     const { register } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await register(name, email, password, age, gender, city);
//             navigate('/login');
//         } catch (error) {
//             console.error('Registration failed:', error);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
//             <h1 className="text-2xl font-bold mb-4">Register</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block text-gray-700">Name:</label>
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block text-gray-700">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="password" className="block text-gray-700">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="age" className="block text-gray-700">Age:</label>
//                     <input
//                         type="number"
//                         id="age"
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="gender" className="block text-gray-700">Gender:</label>
//                     <select
//                         id="gender"
//                         value={gender}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                         required
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="city" className="block text-gray-700">City:</label>
//                     <select
//                         id="city"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded"
//                         required
//                     >
//                         <option value="">Select a city</option>
//                         {cities.map((city, index) => (
//                             <option key={index} value={city}>{city}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default RegisterPage;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    city: '',
  });
  const [image, setImage] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('city', formData.city);
    data.append('image', image);

    try {
      await register(data); // Send form data including image
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Profile Image</label>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
