import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    return (
        <div className="border rounded-lg p-4">
            <h2 className="text-lg font-bold mt-2">
                <Link to={`/categories/${category.id}`} className="hover:underline">
                    {category.name}
                </Link>
            </h2>
        </div>
    );
};

export default CategoryCard;
