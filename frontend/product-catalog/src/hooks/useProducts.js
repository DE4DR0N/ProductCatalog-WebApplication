import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct } from '../api';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
            setLoading(false);
        };

        getProducts();
    }, []);

    const getProductById = async (id) => {
        const product = await fetchProductById(id);
        return product;
    };

    const addProduct = async (product) => {
        const newProduct = await createProduct(product);
        setProducts([...products, newProduct]);
    };

    const updateProductDetails = async (id, product) => {
        await updateProduct(id, product);
        setProducts(products.map((p) => (p.id === id ? product : p)));
    };

    const removeProduct = async (id) => {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
    };

    return { products, loading, getProductById, addProduct, updateProductDetails, removeProduct };
};

export default useProducts;
