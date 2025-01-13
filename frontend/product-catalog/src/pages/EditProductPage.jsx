import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductEditForm from '../components/ProductEditForm';
import { fetchProductById, updateProduct } from '../api';

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error('Ошибка при получении продукта:', error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const handleUpdateProduct = async (productData) => {
        try {
            await updateProduct(id, productData);
            navigate(`/products/${id}`);
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">Edit Product</h2>
            {product ? <ProductEditForm product={product} onSubmit={handleUpdateProduct} /> : <p>Product not found</p>}
        </div>
    );
};

export default EditProductPage;
