import CategoryCard from './CategoryCard';

const CategoryList = ({ categories }) => {
    return (
        <div>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoryList;
