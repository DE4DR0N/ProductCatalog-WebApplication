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

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl text-gray-700">Loading...</p>
        </div>
    );

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            {category ? (
                <div>
                    <h2 className="text-3xl font-bold mb-6">{category.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.products.map(product => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                                <h2 className="text-lg font-bold mt-2 text-blue-800">
                                    <Link to={`/products/${product.id}`} className="hover:underline">
                                        {product.name}
                                    </Link>
                                </h2>
                                <p className="text-gray-600">
                                    {product.description.length > 20 ? (
                                        product.description.substring(0, 20) + "..."
                                    ) : (
                                        product.description
                                    )}
                                </p>
                                <p className="text-green-500 font-semibold">{product.price} BYN</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-xl text-gray-700">Category not found</p>
                </div>
            )}
        </div>
    );
};

export default CategoryDetails;
