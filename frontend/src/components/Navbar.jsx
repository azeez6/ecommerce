import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">Home</Link>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="mr-4">Profile</Link>
              {user.role === 'admin' && (
                                <Link 
                                    to="/admin" 
                                    className="mr-4"
                                >
                                    Admin
                                </Link>
                            )}
              <Link to="/cart" className="mr-4">Cart</Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
