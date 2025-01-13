import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { createProduct } from '../api';

const CreateProductPage = () => {
    const navigate = useNavigate();

    const handleCreateProduct = async (productData) => {
        try {
            await createProduct(productData);
            navigate('/products');
        } catch (error) {
            console.error('Ошибка при создании продукта:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">Create Product</h2>
            <ProductForm onSubmit={handleCreateProduct} />
        </div>
    );
};

export default CreateProductPage;
