import { useState, useEffect } from 'react';
import { fetchUsers, blockUser, deleteUser, updateUser, addUser } from '../api';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', password: '', role: 'User' });

    useEffect(() => {
        const getUsers = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData);
        };

        getUsers();
    }, []);

    const handleBlockUser = async (userId, isBlocked) => {
        await blockUser(userId, isBlocked);
        setUsers(users.map(user => user.id === userId ? { ...user, isBlocked } : user));
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
    };

    const handleChangePassword = async (userId) => {
        const newPassword = prompt("Enter new password:");
        if (newPassword) {
            const user = users.find(u => u.id === userId);
            const updatedUser = { ...user, password: newPassword };
            await updateUser(userId, updatedUser);
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
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">Manage Users</h2>
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
                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Add User</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="mb-4 p-4 border rounded">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <div>
                            <button onClick={() => handleChangePassword(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Change Password</button>
                            <button onClick={() => handleBlockUser(user.id, !user.isBlocked)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2">
                                {user.isBlocked ? "Unblock User" : "Block User"}
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete User</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageUsersPage;
