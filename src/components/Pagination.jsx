export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisible = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  // 第一页
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('...');
    }
  }

  // 中间页
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // 最后一页
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ← 上一页
      </button>

      <div className="pagination-pages">
        {pages.map((page, index) => {
          if (page === '...') {
            return <span key={`dots-${index}`} className="pagination-dots">...</span>;
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`pagination-page ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        下一页 →
      </button>

      <span className="pagination-info">
        第 {currentPage} / {totalPages} 页
      </span>
    </div>
  );
}