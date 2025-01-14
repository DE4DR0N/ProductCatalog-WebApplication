import { useState, useEffect } from 'react';
import { fetchCategories } from '../api';
import CategoryCard from '../components/CategoryCard';
import Pagination from '../components/Pagination';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await fetchCategories(currentPage, pageSize);
                setCategories(categoriesData.categoriesResponse);
                setTotalPages(categoriesData.totalPages);
            } catch (error) {
                console.error('Ошибка при получении категорий:', error);
            }
        };

        getCategories();
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setCurrentPage(1); // сбросить страницу при изменении размера страницы
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-8">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                />
            </div>
        </div>
    );
};

export default CategoriesPage;
