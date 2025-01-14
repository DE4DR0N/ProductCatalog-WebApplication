import { useState } from 'react';

const ProductSearchForm = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(search);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="w-3/4 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button type="submit" className="ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">Search</button>
        </form>
    );
};

export default ProductSearchForm;
