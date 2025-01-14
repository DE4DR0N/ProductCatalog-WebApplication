import { useState } from 'react';

const ProductFilterForm = ({ onFilter }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ minPrice, maxPrice, categoryName });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Min Price</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Max Price</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-gray-700">Category Name</label>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
            <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">Apply Filters</button>
        </form>
    );
};

export default ProductFilterForm;
