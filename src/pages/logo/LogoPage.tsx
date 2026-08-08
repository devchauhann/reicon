import { useState, useEffect, useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import LogoHelmet from './LogoHelmet';
import LogoSidebar from './LogoSidebar';
import LogoSearchBar from './LogoSearchBar';
import IconCount from '../icons/IconCount';
import LogoGrid from './LogoGrid';
import LoadMoreButton from '../../components/ui/LoadMoreButton';
import {
  LogoItem,
  loadLogoGroup,
  searchLogos,
} from '../../lib/logo-data';

const BATCH_SIZE = 120;

export default function LogoPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'all';
  const initialQ = searchParams.get('q') || '';
  const initialSize = searchParams.get('size') || '36';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [activeSize, setActiveSize] = useState(initialSize);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const [items, setItems] = useState<LogoItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LogoItem[]>([]);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync state when searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q = searchParams.get('q') || '';
    const sz = searchParams.get('size') || '36';

    setActiveCategory(cat);
    setSearchQuery(q);
    setActiveSize(sz);
  }, [searchParams]);

  // Load items when category changes
  useEffect(() => {
    let cancelled = false;
    setReady(false);

    async function loadData() {
      const list = await loadLogoGroup(activeCategory);
      if (!cancelled) {
        setItems(list);
        setReady(true);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  // Filter items when search query changes
  useEffect(() => {
    let cancelled = false;
    if (!deferredSearchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    searchLogos(deferredSearchQuery, items, activeCategory).then((matched) => {
      if (!cancelled) {
        setFilteredItems(matched);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [deferredSearchQuery, items, activeCategory]);

  // Helper to update URL params
  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === 'all' || val === '') {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(BATCH_SIZE);
    updateParams({ category: cat });
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setVisibleCount(BATCH_SIZE);
    updateParams({ q });
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setVisibleCount(BATCH_SIZE);
    updateParams({ q: null });
  };

  const handleSizeChange = (sz: string) => {
    setActiveSize(sz);
    updateParams({ size: sz });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const displaySize = parseInt(activeSize, 10) || 36;

  return (
    <div className="flex-1">
      <LogoHelmet
        title={
          activeCategory !== 'all'
            ? `${activeCategory} Brand Logos - Vector SVG | Reicon`
            : '4,900+ Brand Logos - High Quality SVG & PNG Vectors | Reicon'
        }
        description={`Explore clean vector SVG brand logos for ${activeCategory === 'all' ? 'top tech companies and global brands' : activeCategory}. Free download and instant code copy.`}
      />

      <div className="flex flex-1 pt-14">
        <LogoSidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          activeSize={activeSize}
          onSizeChange={handleSizeChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6">
          <LogoSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFilterClick={() => setSidebarOpen(true)}
          />

          <IconCount count={filteredItems.length} ready={ready} />

          <LogoGrid
            items={visibleItems}
            displaySize={displaySize}
            ready={ready}
            searchQuery={searchQuery}
            onSearchClear={handleSearchClear}
          />

          {ready && filteredItems.length > 0 && (
            <LoadMoreButton
              visibleCount={visibleCount}
              totalCount={filteredItems.length}
              onLoadMore={handleLoadMore}
              itemType="logos"
            />
          )}
        </main>
      </div>
    </div>
  );
}
