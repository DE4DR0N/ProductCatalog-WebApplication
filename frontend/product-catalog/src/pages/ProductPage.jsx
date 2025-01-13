import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import { fetchProductById } from '../api';

const ProductPage = () => {
    const { id } = useParams();
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

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {product ? <ProductDetails product={product} /> : <p>Product not found</p>}
        </div>
    );
};

export default ProductPage;
