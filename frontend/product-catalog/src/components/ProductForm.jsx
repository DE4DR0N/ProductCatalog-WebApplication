import { useState, useEffect } from 'react';
import { fetchCategories } from '../api';
import { useAuth } from '../context/AuthContext';

const ProductForm = ({ onSubmit }) => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [noteGeneral, setNoteGeneral] = useState('');
    const [noteSpecial, setNoteSpecial] = useState('');
    const [categoryId, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData.categoriesResponse);
        };

        getCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            price,
            description,
            noteGeneral,
            noteSpecial,
            categoryId,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600">Create Product</h2>
            <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Note general</label>
                <textarea
                    value={noteGeneral}
                    onChange={(e) => setNoteGeneral(e.target.value)}
                    className="w-full p-2 border rounded"
                ></textarea>
            </div>
            {user && (user.role === 'Admin' || user.role === 'AdvancedUser') && (
                <div className="mb-4">
                    <label className="block mb-2">Note special</label>
                    <textarea
                        value={noteSpecial}
                        onChange={(e) => setNoteSpecial(e.target.value)}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
            )}
            <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
                Create
            </button>
        </form>
    );
};

export default ProductForm;
