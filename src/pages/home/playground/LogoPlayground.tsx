import { useState, useEffect, useMemo } from 'react';
import { Restart } from 'reicon-react';
import {
  LogoItem,
  loadLogoGroup,
  getLogoUrl,
} from '../../../lib/logo-data';

const GRID_COUNT = 80;

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Tech' },
  { id: 'ai', label: 'AI' },
  { id: 'dev', label: 'Dev' },
  { id: 'design', label: 'Design' },
  { id: 'frameworks', label: 'Frameworks' },
];

export default function LogoPlayground({ theme }: { theme: string }) {
  const [allItems, setAllItems] = useState<LogoItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSlug, setSelectedSlug] = useState('openai');
  const [selectedVariant, setSelectedVariant] = useState<string>('original');
  const [size, setSize] = useState(48);

  // Load brand logos data
  useEffect(() => {
    loadLogoGroup('all').then((data) => {
      setAllItems(data);
      if (data.length > 0) {
        setSelectedSlug(data[0].slug);
      }
    });
  }, []);

  // Filter items predictably by category
  const displayItems = useMemo(() => {
    if (activeCategory === 'all') return allItems.slice(0, GRID_COUNT);
    return allItems.filter((i) => (i.category || '').toLowerCase() === activeCategory).slice(0, GRID_COUNT);
  }, [allItems, activeCategory]);

  const selectedItem = useMemo(() => {
    return allItems.find((i) => i.slug === selectedSlug) || allItems[0] || {
      slug: selectedSlug,
      name: selectedSlug,
      category: 'Tech',
      url: getLogoUrl(selectedSlug),
      variants: { original: getLogoUrl(selectedSlug) },
    };
  }, [allItems, selectedSlug]);

  // Sync selected variant when logo changes
  useEffect(() => {
    if (selectedItem && selectedItem.variants) {
      const keys = Object.keys(selectedItem.variants);
      if (keys.length > 0 && !selectedItem.variants[selectedVariant]) {
        setSelectedVariant(keys[0]);
      }
    }
  }, [selectedItem, selectedVariant]);

  const activeUrl = useMemo(() => {
    if (selectedItem?.variants && selectedItem.variants[selectedVariant]) {
      return selectedItem.variants[selectedVariant];
    }
    return selectedItem?.url || getLogoUrl(selectedSlug);
  }, [selectedItem, selectedVariant, selectedSlug]);

  const variantKeys = useMemo(() => {
    return Object.keys(selectedItem?.variants || { original: activeUrl });
  }, [selectedItem, activeUrl]);

  const reset = () => {
    setSize(48);
    setSelectedVariant('original');
    setActiveCategory('all');
  };

  return (
    <div className="bg-text-base/3 rounded-[14px] overflow-hidden min-w-0 max-w-full">
      <div className="grid lg:grid-cols-[300px_1fr] min-w-0">
        {/* Left Column: Preview & Controls */}
        <div className="p-5 lg:p-6 lg:border-r border-b lg:border-b-0 border-text-base/6 flex flex-col gap-4 min-w-0">
          {/* Preview Box */}
          <div className="flex flex-col">
            <div className="relative w-full aspect-square max-w-[220px] mx-auto bg-bg-base border border-text-base/8 rounded-2xl flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, var(--border-muted) 1px, transparent 1px), linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <span className="absolute bottom-2.5 right-3 text-[8px] font-mono text-text-base/35 tabular-nums select-none z-10">
                {size}px
              </span>
              <span className="absolute bottom-2.5 left-3 text-[8px] font-mono text-text-base/25 select-none lowercase z-10">
                {selectedVariant}
              </span>

              {/* Logo Image Preview */}
              <div className="flex items-center justify-center p-4 relative z-10">
                <img
                  src={activeUrl}
                  alt={selectedItem.name}
                  style={{ width: size, height: size }}
                  className="object-contain max-w-full max-h-full transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 gap-2">
              <span className="text-[15px] font-serif font-semibold text-text-base truncate min-w-0">
                {selectedItem.name}
              </span>
              <code className="text-[10px] text-text-base/40 bg-text-base/4 border border-text-base/6 rounded px-1.5 py-0.5 font-mono shrink-0">
                {selectedItem.slug}
              </code>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4 pt-2 border-t border-text-base/6 min-w-0">
            {/* Variant Buttons */}
            {variantKeys.length > 1 && (
              <div>
                <label className="text-[13px] text-text-base/50 mb-2 block">Variant</label>
                <div className="flex gap-1.5 flex-wrap">
                  {variantKeys.map((vKey) => (
                    <button
                      key={vKey}
                      type="button"
                      onClick={() => setSelectedVariant(vKey)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer capitalize ${
                        selectedVariant === vKey
                          ? 'bg-[#6C5CE7] text-white font-semibold'
                          : 'bg-text-base/4 text-text-base/60 hover:text-text-base'
                      }`}
                    >
                      {vKey}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter Pills */}
            <div>
              <label className="text-[13px] text-text-base/50 mb-2 block">Category</label>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-[#6C5CE7] text-white font-semibold'
                        : 'bg-text-base/4 text-text-base/60 hover:text-text-base'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <div className="flex items-center justify-between text-[13px] text-text-base/50 mb-2">
                <span>Size</span>
                <span className="font-mono text-[12px]">{size}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="120"
                step="4"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-[#6C5CE7] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="pt-2 border-t border-text-base/6">
              <button
                type="button"
                onClick={reset}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-text-base/4 hover:bg-text-base/8 text-text-base/60 hover:text-text-base text-[12px] font-medium transition-colors cursor-pointer"
              >
                <Restart size={14} />
                <span>Reset Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Logos Grid */}
        <div className="p-3 sm:p-4 flex flex-col gap-4 min-w-0 max-w-full overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.08em] text-text-base/30 font-semibold">
                Brand Logos ({displayItems.length})
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 border-l border-t border-text-base/4 max-w-full overflow-hidden rounded-xl">
              {displayItems.map((item) => {
                const url = item.url || getLogoUrl(item.slug);
                const isSelected = item.slug === selectedSlug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSelectedSlug(item.slug)}
                    title={item.name}
                    className={`aspect-square flex items-center justify-center p-1.5 sm:p-2 border-r border-b transition-colors cursor-pointer min-w-0 ${
                      isSelected
                        ? 'bg-[#6C5CE7]/15 border-[#6C5CE7]/30'
                        : 'border-text-base/4 hover:bg-text-base/3'
                    }`}
                  >
                    <img
                      src={url}
                      alt={item.name}
                      loading="lazy"
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
