import React, { useState } from "react";
import './Paginated.css';

export default function Paginated({ paginated, stateDogs, dogsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stateDogs / dogsPerPage);
  const maxPagesToShow = 12;

  const handlePaginate = (number, event) => {
    event.preventDefault();
    setCurrentPage(number);
    paginated(number);
  };

  const handlePreviousPage = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginated(currentPage - 1);
    }
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      paginated(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      pageNumbers.push(
        <li key={number}>
          <a
            className={number === currentPage ? "active" : ""}
            onClick={(e) => handlePaginate(number, e)}
            href="/"
          >
            {number}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="page">
      <ul className="page__numbers">
        <li>
          <a onClick={handlePreviousPage} href="/">
            &laquo; Anterior
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a onClick={handleNextPage} href="/">
            Siguiente &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
}


