import { useAuth } from '../context/AuthContext';

const UserPage = ({ children }) => {
    const { user } = useAuth();

    if (user?.isBlocked) {
        return (
            <div className="bg-red-500 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Your account is blocked</h2>
                <p>Please contact support for more information.</p>
            </div>
        );
    }

    return children;
};

export default UserPage;
