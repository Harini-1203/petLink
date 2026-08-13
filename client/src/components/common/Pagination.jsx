import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

function getPageList(current, total) {
  const pages = [];
  const window = 1;
  for (let i = 1; i <= total; i += 1) {
    if (i === 1 || i === total || (i >= current - window && i <= current + window)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = getPageList(currentPage, totalPages);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-primary-50 disabled:pointer-events-none disabled:opacity-30 dark:text-text-muted-dark dark:hover:bg-white/5"
      >
        <HiOutlineChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-text-muted dark:text-text-muted-dark">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              page === currentPage
                ? 'bg-primary-500 text-white'
                : 'text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-primary-50 disabled:pointer-events-none disabled:opacity-30 dark:text-text-muted-dark dark:hover:bg-white/5"
      >
        <HiOutlineChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
