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
        <header className="bg-indigo-700 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <h1 className="text-2xl font-bold">
                        <Link to="/">Product Catalog</Link>
                    </h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link to="/products" className="hover:underline">Products</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="hover:underline">Categories</Link>
                            </li>
                            {user && (user.role === 'AdvancedUser' || user.role === 'Admin') && (
                                <li>
                                    <Link to="/manage-categories" className="hover:underline">Manage Categories</Link>
                                </li>
                            )}
                            {user && user.role === 'Admin' && (
                                <li>
                                    <Link to="/manage-users" className="hover:underline">Manage Users</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    {user && ['Admin', 'AdvancedUser', 'User'].includes(user.role) && (
                        <Link to="/create-product" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create Product</Link>
                    )}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                    ) : (
                        <Link to="/login" className="hover:underline">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
