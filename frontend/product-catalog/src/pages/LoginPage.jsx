import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login as loginApi } from '../api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLoginSubmit = async (data) => {
        try {
            const response = await loginApi(data.email, data.password);
            login(response);
            navigate('/');
        } catch (error) {
            console.error('Ошибка логинации:', error);
            throw new Error('Неверный логин или пароль');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">Login</h2>
            <LoginForm onSubmit={handleLoginSubmit} />
        </div>
    );
};

export default LoginPage;
