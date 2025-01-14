import { useState, useEffect } from 'react';
import { fetchFilteredProducts } from '../api';
import ProductCard from '../components/ProductCard';
import ProductFilterForm from '../components/ProductFilterForm';
import ProductSearchForm from '../components/ProductSearchForm';
import Pagination from '../components/Pagination';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsData = await fetchFilteredProducts({ ...filters, search, page: currentPage, pageSize });
                setProducts(productsData.productsResponse);
                setTotalPages(productsData.totalPages);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        getProducts();
    }, [filters, search, currentPage, pageSize]);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearch = (newSearch) => {
        setSearch(newSearch);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-8">Products</h2>
            <ProductSearchForm onSearch={handleSearch} />
            <div className="flex mt-6">
                <div className="w-1/4 pr-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">Filters</h2>
                    <ProductFilterForm onFilter={handleFilter} />
                </div>
                <div className="w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
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
            </div>
        </div>
    );
};

export default ProductsPage;
