import { useState, useEffect } from 'react';
import { fetchCategories, fetchCategoryById, createCategory, updateCategory, deleteCategory } from '../api';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCategories();
            setCategories(categories);
            setLoading(false);
        };

        getCategories();
    }, []);

    const getCategoryById = async (id) => {
        const category = await fetchCategoryById(id);
        return category;
    };

    const addCategory = async (category) => {
        const newCategory = await createCategory(category);
        setCategories([...categories, newCategory]);
    };

    const updateCategoryDetails = async (id, category) => {
        await updateCategory(id, category);
        setCategories(categories.map((c) => (c.id === id ? category : c)));
    };

    const removeCategory = async (id) => {
        await deleteCategory(id);
        setCategories(categories.filter((c) => c.id !== id));
    };

    return { categories, loading, getCategoryById, addCategory, updateCategoryDetails, removeCategory };
};

export default useCategories;
