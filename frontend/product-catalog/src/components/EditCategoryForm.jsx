import { useState } from 'react';

const EditCategoryForm = ({ category, onSave }) => {
    const [name, setName] = useState(category.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(category.id, name);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
        </form>
    );
};

export default EditCategoryForm;
