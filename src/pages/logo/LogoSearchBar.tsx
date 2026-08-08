import { Magnifier } from 'reicon-react';

interface LogoSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export default function LogoSearchBar({ searchQuery, onSearchChange, onFilterClick }: LogoSearchBarProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-base/30">
          <Magnifier size={16} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search 4,900+ brand logos..."
          className="w-full bg-text-base/5 border border-text-base/10 rounded-lg pl-9 pr-9 py-2.5 text-sm text-text-base placeholder:text-text-base/30 outline-none focus:border-text-base/25 focus:bg-text-base/10 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-base/30 hover:text-text-base transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button
        onClick={onFilterClick}
        className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-text-base/5 border border-text-base/10 text-text-base/60 hover:text-text-base text-sm font-medium transition-colors shrink-0 cursor-pointer"
        aria-label="Open filters"
      >
        <re-icon icon="filter" size="15" color="currentColor" />
        Filters
      </button>
    </div>
  );
}
