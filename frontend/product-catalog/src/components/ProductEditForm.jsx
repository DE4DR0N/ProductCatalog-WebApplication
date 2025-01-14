import { useState, useEffect } from 'react';
import { fetchCategories } from '../api';
import { useAuth } from '../context/AuthContext';

const ProductEditForm = ({ product, onSubmit }) => {
    const { user } = useAuth(); // Получение информации о пользователе
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [noteGeneral, setNoteGeneral] = useState(product.noteGeneral);
    const [noteSpecial, setNoteSpecial] = useState(product.noteSpecial);
    const [categoryId, setCategory] = useState(product.category.id);
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
            id: product.id,
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
            <h2 className="text-2xl font-bold mb-6 text-indigo-600">Edit Product</h2>
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
                    <label className="block mb-2">Note Special</label>
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
                Update
            </button>
        </form>
    );
};

export default ProductEditForm;
