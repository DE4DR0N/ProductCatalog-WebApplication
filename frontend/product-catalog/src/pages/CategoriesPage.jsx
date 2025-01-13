import { useState, useEffect } from 'react';
import CategoryList from '../components/CategoryList';
import { fetchCategories } from '../api';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData.categoriesResponse);
            setLoading(false);
        };

        getCategories();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Categories</h2>
            <CategoryList categories={categories} />
        </div>
    );
};

export default CategoriesPage;
