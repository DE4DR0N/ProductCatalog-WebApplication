import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategoryById } from '../api';

const CategoryDetails = ({ categoryId }) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const categoryData = await fetchCategoryById(categoryId);
                setCategory(categoryData);
            } catch (error) {
                console.error('Ошибка при получении категории:', error);
            } finally {
                setLoading(false);
            }
        };

        getCategory();
    }, [categoryId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            {category ? (
                <div>
                    <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.products.map(product => (
                            <div key={product.id} className="border rounded-lg p-4">
                                <h2 className="text-lg font-bold mt-2">
                                    <Link to={`/products/${product.id}`} className="hover:underline">
                                        {product.name}
                                    </Link>
                                </h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-500 font-semibold">{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Category not found</p>
            )}
        </div>
    );
};

export default CategoryDetails;
