import { useState, useEffect, useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import IllustrationHelmet from './IllustrationHelmet';
import IllustrationSidebar from './IllustrationSidebar';
import IllustrationSearchBar from './IllustrationSearchBar';
import IconCount from '../icons/IconCount';
import IllustrationGrid from './IllustrationGrid';
import LoadMoreButton from '../../components/ui/LoadMoreButton';
import {
  IllustrationItem,
  loadIllustrationCategories,
  loadFeaturedIllustrations,
  loadIllustrationGroup,
  searchIllustrations,
} from '../../lib/illustration-data';

const BATCH_SIZE = 60;

export default function IllustrationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = searchParams.get('category') || 'all';
  const initialSub = searchParams.get('subcategory') || 'all';
  const initialQ = searchParams.get('q') || '';
  const initialSize = searchParams.get('size') || '100';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSub);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [activeSize, setActiveSize] = useState(initialSize);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const [items, setItems] = useState<IllustrationItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IllustrationItem[]>([]);
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync state when searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const sub = searchParams.get('subcategory') || 'all';
    const q = searchParams.get('q') || '';
    const sz = searchParams.get('size') || '100';

    setActiveCategory(cat);
    setActiveSubcategory(sub);
    setSearchQuery(q);
    setActiveSize(sz);
  }, [searchParams]);

  // Load items when category or subcategory changes
  useEffect(() => {
    let cancelled = false;
    setReady(false);

    async function loadData() {
      let list: IllustrationItem[] = [];
      if (activeCategory === 'all' || !activeCategory) {
        list = await loadFeaturedIllustrations();
      } else {
        list = await loadIllustrationGroup(activeCategory, activeSubcategory);
      }

      if (!cancelled) {
        setItems(list);
        setReady(true);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, [activeCategory, activeSubcategory]);

  // Filter items when search query changes
  useEffect(() => {
    let cancelled = false;
    if (!deferredSearchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    searchIllustrations(deferredSearchQuery, items, activeCategory).then((matched) => {
      if (!cancelled) {
        setFilteredItems(matched);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [deferredSearchQuery, items, activeCategory]);

  const handleCategoryChange = (category: string, subcategory: string = 'all') => {
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
    setVisibleCount(BATCH_SIZE);

    const newParams = new URLSearchParams(searchParams);
    if (category !== 'all') {
      newParams.set('category', category);
      if (subcategory !== 'all') {
        newParams.set('subcategory', subcategory);
      } else {
        newParams.delete('subcategory');
      }
    } else {
      newParams.delete('category');
      newParams.delete('subcategory');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSizeChange = (size: string) => {
    setActiveSize(size);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('size', size);
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(BATCH_SIZE);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const displaySize = parseInt(activeSize) || 100;

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  return (
    <div className="flex-1">
      <IllustrationHelmet />

      <div className="flex flex-1 pt-14">
        <IllustrationSidebar
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onCategoryChange={handleCategoryChange}
          activeSize={activeSize}
          onSizeChange={handleSizeChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6">
          <IllustrationSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onFilterClick={() => setSidebarOpen(true)}
            displaySize={displaySize}
            onDisplaySizeChange={(sz) => handleSizeChange(sz.toString())}
          />

          <IconCount count={filteredItems.length} ready={ready} />

          <IllustrationGrid
            items={visibleItems}
            displaySize={displaySize}
            ready={ready}
            searchQuery={searchQuery}
            onSearchClear={() => handleSearchChange('')}
          />

          {ready && filteredItems.length > 0 && (
            <LoadMoreButton
              visibleCount={visibleCount}
              totalCount={filteredItems.length}
              onLoadMore={handleLoadMore}
              itemType="illustrations"
            />
          )}
        </main>
      </div>
    </div>
  );
}
