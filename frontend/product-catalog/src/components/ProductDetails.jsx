import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../api';

const ProductDetails = ({ product }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product.id);
            navigate('/products');
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <img src='/product-icon.png' alt={product.name} className="w-full h-64 object-cover mb-6 rounded-lg" />
            <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
            <h1 className="text-2xl font-bold mb-4 text-blue-800">
                <Link to={`/categories/${product.category.id}/`} className="hover:underline">
                    {product.category.name}
                </Link>
            </h1>
            <p className="text-lg mb-4 text-gray-700">{product.description}</p>
            <p className="text-green-500 font-semibold text-2xl mb-4">{product.price} BYN</p>
            <p className="text-md mb-4"><strong>Note general:</strong> {product.noteGeneral}</p>
            {user && ['Admin', 'AdvancedUser'].includes(user.role) && (
                <p className="text-md mb-4"><strong>Note special:</strong> {product.noteSpecial}</p>
            )}
            {user && ['Admin', 'AdvancedUser', 'User'].includes(user.role) && (
                <div className="flex space-x-4">
                    <Link to={`/edit-product/${product.id}`}
                          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
                        Edit Product
                    </Link>
                    {(user.role === 'AdvancedUser' || user.role === 'Admin') && (
                        <button onClick={handleDeleteProduct}
                                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-200">
                            Delete Product
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
