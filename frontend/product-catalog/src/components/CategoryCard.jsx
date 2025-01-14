import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
                <Link to={`/categories/${category.id}`} className="hover:underline">
                    {category.name}
                </Link>
            </h2>
        </div>
    );
};

export default CategoryCard;
