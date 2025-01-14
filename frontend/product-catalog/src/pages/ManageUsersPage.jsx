import { useState, useEffect } from 'react';
import { fetchUsers, blockUser, deleteUser, updateUser, addUser } from '../api';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', password: '', role: 'User' });
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);
        };

        getUsers();
    }, []);

    const handleBlockUser = async (userId, isBlocked) => {
        const user = users.find(u => u.id === userId);
        if (user.role !== 'Admin') {
            await blockUser(userId, isBlocked);
            setUsers(users.map(user => user.id === userId ? { ...user, isBlocked } : user));
        } else {
            alert("You cannot block an Admin.");
        }
    };

    const handleDeleteUser = async (userId) => {
        const user = users.find(u => u.id === userId);
        if (user.role !== 'Admin') {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } else {
            alert("You cannot delete an Admin.");
        }
    };

    const handleChangePassword = (userId) => {
        setCurrentUserId(userId);
        setIsPasswordModalOpen(true);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword) {
            const user = users.find(u => u.id === currentUserId);
            const updatedUser = { ...user, password: newPassword };
            await updateUser(currentUserId, updatedUser);
            setIsPasswordModalOpen(false);
            setNewPassword('');
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const addedUser = await addUser(newUser);
            setUsers([...users, addedUser]);
            setNewUser({ email: '', password: '', role: 'User' });
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-8">Manage Users</h2>
            <form onSubmit={handleAddUser} className="mb-8">
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Role</label>
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="User">User</option>
                        <option value="AdvancedUser">AdvancedUser</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">Add User</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="mb-4 p-4 border rounded shadow-sm hover:shadow-lg">
                        <p className="text-lg font-semibold text-gray-700"><strong>Email:</strong> {user.email}</p>
                        <p className="text-md font-medium text-gray-600"><strong>Role:</strong> {user.role}</p>
                        <div className="flex space-x-4 mt-4">
                            <button onClick={() => handleChangePassword(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">Change Password</button>
                            <button onClick={() => handleBlockUser(user.id, !user.isBlocked)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">
                                {user.isBlocked ? "Unblock User" : "Block User"}
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">Delete User</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isPasswordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Change Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Save</button>
                                <button type="button" onClick={() => setIsPasswordModalOpen(false)} className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsersPage;
