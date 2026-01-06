import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage = 6
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="pagination-container" aria-label="Pagination">
      <button 
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map(number => (
          <button
            key={number}
            className={`pagination-number ${currentPage === number ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
      </div>

      <button 
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>

      <style>{`
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin-top: var(--spacing-4xl);
          padding: var(--spacing-lg) 0;
        }

        .pagination-numbers {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .pagination-btn,
        .pagination-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--color-white);
          border: 2px solid var(--color-gray-200);
          color: var(--text-primary);
          font-family: var(--font-primary);
          font-weight: var(--font-weight-semibold);
          transition: all var(--transition-base);
          cursor: pointer;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: var(--color-gray-100);
        }

        .pagination-btn:not(:disabled):hover,
        .pagination-number:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .pagination-number.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: var(--color-white);
        }

        @media (max-width: 480px) {
          .pagination-container {
            gap: var(--spacing-xs);
          }
          
          .pagination-btn,
          .pagination-number {
            width: 38px;
            height: 38px;
            font-size: var(--font-size-sm);
          }
        }
      `}</style>
    </nav>
  );
};

export default Pagination;
