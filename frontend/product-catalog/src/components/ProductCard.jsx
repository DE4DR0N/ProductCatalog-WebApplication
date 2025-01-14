import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg">
            <img src={'/product-icon.png'} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold text-blue-800 mb-2">
                <Link to={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                </Link>
            </h2>
            <h3 className="text-md font-semibold text-indigo-600 mb-2">
                <Link to={`/categories/${product.category.id}`} className="hover:underline">
                    {product.category.name}
                </Link>
            </h3>
            <p className="text-gray-600 mb-2">
                {product.description.length > 20 ? (
                    product.description.substring(0, 20) + "..."
                ) : (
                    product.description
                )}
            </p>
            <p className="text-green-500 font-semibold">{product.price} BYN</p>
        </div>
    );
};

export default ProductCard;
