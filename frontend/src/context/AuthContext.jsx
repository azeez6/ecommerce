import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//   const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/auth/profile');
      setUser(response.data);
    } catch (error) {
      setUser(null); // Clear user state if there's an error
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post('/auth/login', { email, password });
      await fetchCurrentUser(); // Fetch user after login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    //   navigate('/login')
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const createProduct = async (data) => {
    try {
      await axios.post('/products', data);
    } catch (error) {
      console.error('Create product error:', error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register, fetchCurrentUser, createProduct }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
