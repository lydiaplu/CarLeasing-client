import React, { useEffect } from 'react'

function TablePaginator({ data = [], currentPage, setCurrentPage, itemsPerPage }) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default TablePaginator
