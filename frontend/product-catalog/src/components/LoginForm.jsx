import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit({ email, password });
        } catch (err) {
            setError('Ошибка логинации. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            <p className="mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
        </form>
    );
};

export default LoginForm;
