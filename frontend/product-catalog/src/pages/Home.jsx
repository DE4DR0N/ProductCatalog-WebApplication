import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Welcome to the Product Catalog</h2>
            <p className="text-lg mb-8">Explore our wide range of products and categories</p>
            <div className="flex justify-center space-x-4">
                <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Products
                </Link>
                <Link to="/categories" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    View Categories
                </Link>
            </div>
        </div>
    );
};

export default Home;
