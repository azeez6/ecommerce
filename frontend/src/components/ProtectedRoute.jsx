import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, fetchCurrentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await fetchCurrentUser();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    checkUser();
  }, [fetchCurrentUser]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while checking authentication
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
  
};

export default ProtectedRoute;
