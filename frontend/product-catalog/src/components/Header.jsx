import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-indigo-700 text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4">
                <div className="flex items-center space-x-8">
                    <h1 className="text-3xl font-bold">
                        <Link to="/" className="text-white hover:text-gray-300">Product Catalog</Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/products" className="text-lg text-white hover:text-gray-300 transition duration-200">Products</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-lg text-white hover:text-gray-300 transition duration-200">Categories</Link>
                            </li>
                            {isAuthenticated && (user.role === 'AdvancedUser' || user.role === 'Admin') && (
                                <li>
                                    <Link to="/manage-categories" className="text-lg text-white hover:text-gray-300 transition duration-200">Manage Categories</Link>
                                </li>
                            )}
                            {isAuthenticated && user.role === 'Admin' && (
                                <li>
                                    <Link to="/manage-users" className="text-lg text-white hover:text-gray-300 transition duration-200">Manage Users</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/create-product" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200">Create Product</Link>
                            <button onClick={handleLogout} className="text-lg text-white hover:text-gray-300 transition duration-200">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-lg text-white hover:text-gray-300 transition duration-200">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
