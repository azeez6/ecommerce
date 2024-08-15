

// import { useContext, useEffect, useState } from 'react';
// import AuthContext from '../context/AuthContext';

// const ProfilePage = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [userInfo, setUserInfo] = useState(null); // Initialize with null to check loading state

//   useEffect(() => {
//     if (user) {
//       setUserInfo(user);
//     }
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       {userInfo ? (
//         <>
//           <div className="mb-4">
//             <strong>Name:</strong> {userInfo.name}
//           </div>
//           <div className="mb-4">
//             <strong>Email:</strong> {userInfo.email}
//           </div>
//           {userInfo.imageUrl && (
//             <div className="mb-4">
//               <img
//                 src={userInfo.imageUrl}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover"
//               />
//             </div>
//           )}
//           <button
//             onClick={logout}
//             className="bg-red-500 text-white px-4 py-2 rounded-full"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import { useContext, useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AccountTab from './AccountTab';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    //   navigate('/profile/account'); // Redirect to Account by default
    } else {
      navigate('/login');
    }
  }, [
    user, 
    // navigate
]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <nav className="mb-6">
        <NavLink
          to="/profile/account"
          className={({ isActive }) => isActive ? "mr-4 text-blue-600 font-semibold" : "mr-4"}
        >
          Account
        </NavLink>
        <NavLink
          to="/profile/products"
          className={({ isActive }) => isActive ? "mr-4 text-blue-600 font-semibold" : "mr-4"}
        >
          Products
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}
        >
          My Orders
        </NavLink>
      </nav>
      <Routes>
        <Route path="account" element={<AccountTab userInfo={userInfo} logout={logout} />} />
        <Route path="products" element={<ProductsTab />} />
        <Route path="orders" element={<OrdersTab />} />
        <Route path="*" element={<AccountTab userInfo={userInfo} logout={logout} />} /> 
      </Routes>
    </div>
  );
};

export default ProfilePage;
