import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { register } from '../api';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegisterSubmit = async (data) => {
        try {
            await register(data.email, data.password);
            navigate('/login');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">Register</h2>
            <RegisterForm onSubmit={handleRegisterSubmit} />
        </div>
    );
};

export default RegisterPage;
