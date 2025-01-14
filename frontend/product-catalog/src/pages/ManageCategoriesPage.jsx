import { useState, useEffect } from 'react';
import { fetchCategories, createCategory, deleteCategory, updateCategory } from '../api';
import { useAuth } from '../context/AuthContext';
import EditCategoryForm from '../components/EditCategoryForm';

const ManageCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData.categoriesResponse);
        };

        getCategories();
    }, []);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const newCat = await createCategory({ name: newCategory });
            setCategories([...categories, newCat]);
            setNewCategory('');
        } catch (error) {
            console.error('Ошибка при создании категории:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
    };

    const handleSaveCategory = async (categoryId, name) => {
        try {
            await updateCategory(categoryId, { name });
            setCategories(categories.map(category => category.id === categoryId ? { ...category, name } : category));
            setEditingCategory(null);
        } catch (error) {
            console.error('Ошибка при обновлении категории:', error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-8">Manage Categories</h2>
            {user && (user.role === 'AdvancedUser' || user.role === 'Admin') ? (
                <>
                    <form onSubmit={handleCreateCategory} className="mb-8">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New Category Name"
                            className="w-full p-2 border rounded mb-4 shadow-sm"
                            required
                        />
                        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">Add Category</button>
                    </form>
                    <ul className="space-y-4">
                        {categories.map(category => (
                            <li key={category.id} className="p-4 border rounded shadow-sm hover:shadow-lg">
                                {editingCategory && editingCategory.id === category.id ? (
                                    <EditCategoryForm category={category} onSave={handleSaveCategory} />
                                ) : (
                                    <>
                                        <p className="text-lg font-semibold text-gray-700">{category.name}</p>
                                        <div className="flex space-x-4 mt-4">
                                            <button onClick={() => handleEditCategory(category)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">Edit</button>
                                            <button onClick={() => handleDeleteCategory(category.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">Delete</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="text-lg text-center text-red-500">You do not have permission to manage categories.</p>
            )}
        </div>
    );
};

export default ManageCategoriesPage;
