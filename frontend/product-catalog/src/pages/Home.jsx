import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-5xl font-extrabold mb-6 text-indigo-600">Welcome to the Product Catalog</h2>
            <p className="text-xl mb-8 text-gray-700">Explore our wide range of products and categories</p>
            <div className="flex justify-center space-x-6">
                <Link to="/products" className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200 transform hover:scale-105">
                    View Products
                </Link>
                <Link to="/categories" className="bg-green-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition duration-200 transform hover:scale-105">
                    View Categories
                </Link>
            </div>
        </div>
    );
};

export default Home;
