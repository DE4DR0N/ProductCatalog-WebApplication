import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../api';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const productsData = await fetchProducts();
            setProducts(productsData.productsResponse);
            setLoading(false);
        };

        getProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Products</h2>
            <ProductList products={products} />
        </div>
    );
};

export default ProductsPage;
