import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg p-4">
            <img src='/product-icon.png' alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-bold mt-2">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h2>
            <h1 className="text-lg font-bold">
                <Link to={`/categories/${product.category.id}/`}>{product.category.name}</Link>
            </h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-semibold">{product.price} BYN</p>
        </div>
    );
};

export default ProductCard;
