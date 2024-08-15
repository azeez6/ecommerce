// src/components/Admin.jsx
import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AllUsers from './AllUsers';
import AllProducts from './AllProducts';
import AllOrders from './AllOrders';
import SalesAnalytics from './SalesAnalytics';

const Admin = () => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex space-x-4">
                    <NavLink 
                        to="/admin/users" 
                        className={({ isActive }) => 
                            isActive ? "text-white font-bold" : "text-gray-400"} 
                        
                        
                    >
                        All Users
                    </NavLink>
                    <NavLink 
                        to="/admin/products" 
                        className={({ isActive }) => 
                            isActive ? "text-white font-bold" : "text-gray-400"
                        }
                    >
                        All Products
                    </NavLink>
                    <NavLink 
                        to="/admin/orders" 
                        className={({ isActive }) => 
                            isActive ? "text-white font-bold" : "text-gray-400"
                        }
                    >
                        All Orders
                    </NavLink>
                    <NavLink 
                        to="/admin/analytics" 
                        className={({ isActive }) => 
                            isActive ? "text-white font-bold" : "text-gray-400"
                        }
                    >
                        Analytics
                    </NavLink>
                </div>
            </nav>
            <Routes>
                <Route path="users" element={<AllUsers />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="orders" element={<AllOrders />} />
                <Route path="*" element={<AllUsers />} /> {/* Default to All Users */}
                <Route path="analytics" element={<SalesAnalytics />} />
            </Routes>
        </div>
    );
};

export default Admin;
