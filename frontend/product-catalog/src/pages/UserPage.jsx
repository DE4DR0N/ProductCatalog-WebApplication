import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserPage = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate('/');
    };

    if (user?.isBlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="bg-red-700 p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold mb-4">Your account is blocked</h2>
                    <p className="mb-4">Please contact support for more information.</p>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default UserPage;
