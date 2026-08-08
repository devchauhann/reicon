interface LogoPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function LogoPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: LogoPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-10 pt-6 flex flex-col items-center justify-center gap-3">
      {/* Borderless, clean minimal pagination controls */}
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentPage <= 1
              ? 'opacity-30 pointer-events-none text-text-base/30'
              : 'text-text-base/60 hover:text-text-base hover:bg-text-base/6'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (typeof p === 'string') {
              return (
                <span key={`ellipsis-${idx}`} className="w-7 h-7 flex items-center justify-center text-xs font-mono text-text-base/30 select-none">
                  ...
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-[32px] h-8 px-2 rounded-xl text-xs font-mono transition-colors cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-text-base text-bg-base font-semibold'
                    : 'text-text-base/60 hover:text-text-base hover:bg-text-base/6'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentPage >= totalPages
              ? 'opacity-30 pointer-events-none text-text-base/30'
              : 'text-text-base/60 hover:text-text-base hover:bg-text-base/6'
          }`}
        >
          <span>Next</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Items count summary */}
      <div className="text-xs font-mono text-text-base/40 text-center">
        Showing <span className="text-text-base/80 font-medium">{startItem.toLocaleString()}–{endItem.toLocaleString()}</span> of{' '}
        <span className="text-text-base/80 font-medium">{totalItems.toLocaleString()}</span> logos
      </div>
    </div>
  );
}
