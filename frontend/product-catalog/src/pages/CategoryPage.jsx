import { useParams } from 'react-router-dom';
import CategoryDetails from '../components/CategoryDetails';

const CategoryPage = () => {
    const { id } = useParams();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8">Category Details</h2>
            <CategoryDetails categoryId={id} />
        </div>
    );
};

export default CategoryPage;
