const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center mt-4 space-x-4">
            <button
                onClick={handlePreviousPage}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="text-lg">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <div className="ml-4">
                <label className="mr-2">Items per page:</label>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="border rounded p-2"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
