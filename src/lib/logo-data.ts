export interface LogoVariant {
  variant: string;
  filename: string;
  url: string;
}

export interface LogoItem {
  slug: string;
  name: string;
  category: string;
  variants: Record<string, string>; // variant name -> SVG URL
  defaultVariant: string;
  url: string;
}

export interface LogoSubcategory {
  name: string;
  count: number;
}

export interface LogoCategory {
  name: string;
  count: number;
  subcategories?: LogoSubcategory[];
}

export interface LogoCategoriesMeta {
  total_icons: number;
  categories: LogoCategory[];
}

const CDN_BASE = 'https://cdn.reicon.dev';

export function getLogoUrl(slug: string, variant: string = 'original'): string {
  return `${CDN_BASE}/logos/${slug}/${variant}.svg`;
}

// In-memory caches
let categoriesMetaCache: LogoCategoriesMeta | null = null;
let allBrandsMapCache: Map<string, LogoItem> | null = null;
let brandsByCategoryCache: Record<string, string[]> | null = null;
let brandFamiliesCache: Record<string, { parent: string; brands: string[] }> | null = null;
const svgCodeCache = new Map<string, string>();

/**
 * Format raw brand slug/name into a clean display title
 */
export function formatBrandName(slugOrName: string): string {
  if (!slugOrName) return '';
  if (/[A-Z\s]/.test(slugOrName)) return slugOrName;
  
  return slugOrName
    .split('-')
    .map((word) => {
      if (word === 'ai') return 'AI';
      if (word === 'ui') return 'UI';
      if (word === 'js') return 'JS';
      if (word === 'ts') return 'TS';
      if (word === 'api') return 'API';
      if (word === 'db') return 'DB';
      if (word === 'dot') return '.';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .replace(/\s\.\s/g, '.');
}

/**
 * Load all brand entries mapping (slug -> LogoItem) from icons.json
 */
export async function loadAllBrandsMap(): Promise<Map<string, LogoItem>> {
  if (allBrandsMapCache) return allBrandsMapCache;

  const map = new Map<string, LogoItem>();

  try {
    const res = await fetch('/logos-data/icons.json');

    if (res.ok) {
      const iconsData: Record<string, Record<string, string>> = await res.json();
      
      for (const [slug, variants] of Object.entries(iconsData)) {
        const name = formatBrandName(slug);
        const defaultVar = variants.original ? 'original' : Object.keys(variants)[0] || 'original';
        const mainUrl = variants[defaultVar] || getLogoUrl(slug, defaultVar);

        const item: LogoItem = {
          slug,
          name,
          category: 'General',
          variants,
          defaultVariant: defaultVar,
          url: mainUrl,
        };

        map.set(slug, item);
      }
    }
  } catch (err) {
    console.error('Failed to load all brands map:', err);
  }

  allBrandsMapCache = map;
  return map;
}

/**
 * Fetch categories metadata for Logos
 */
export async function loadLogoCategories(): Promise<LogoCategoriesMeta> {
  if (categoriesMetaCache) return categoriesMetaCache;

  try {
    const res = await fetch('/logos-data/categories.json');
    if (res.ok) {
      const data = await res.json();
      const meta: LogoCategoriesMeta = {
        total_icons: data.total_brands || 4929,
        categories: data.categories || [],
      };
      categoriesMetaCache = meta;
      return meta;
    }
  } catch (err) {
    console.error('Failed to load logo categories:', err);
  }

  const allMap = await loadAllBrandsMap();
  const fallbackMeta: LogoCategoriesMeta = {
    total_icons: allMap.size || 4929,
    categories: [],
  };
  categoriesMetaCache = fallbackMeta;
  return fallbackMeta;
}

/**
 * Load logos by category
 */
export async function loadLogoGroup(category: string): Promise<LogoItem[]> {
  const allMap = await loadAllBrandsMap();
  const allItems = Array.from(allMap.values());

  if (!category || category === 'all') {
    return allItems;
  }

  if (!brandsByCategoryCache) {
    try {
      const res = await fetch('/logos-data/brands-by-category.json');
      if (res.ok) {
        brandsByCategoryCache = await res.json();
      }
    } catch {}
  }

  if (brandsByCategoryCache && brandsByCategoryCache[category]) {
    const slugList = brandsByCategoryCache[category];
    const matchedItems: LogoItem[] = [];

    for (const slug of slugList) {
      const item = allMap.get(slug) || allMap.get(slug.toLowerCase().replace(/[^a-z0-9]/g, ''));
      if (item) matchedItems.push(item);
    }

    if (matchedItems.length > 0) {
      return matchedItems;
    }
  }

  return allItems;
}

/**
 * Search logos across full dataset
 */
export async function searchLogos(
  query: string,
  currentItems: LogoItem[],
  activeCategory: string = 'all'
): Promise<LogoItem[]> {
  const q = query.trim().toLowerCase();
  if (!q) return currentItems;

  const allMap = await loadAllBrandsMap();
  const allItems = Array.from(allMap.values());

  return allItems.filter((item) => {
    const matchesQuery =
      item.slug.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q);

    return matchesQuery;
  });
}

/**
 * Get detail for a single logo by slug
 */
export async function getLogoDetail(slug: string): Promise<LogoItem | null> {
  const allMap = await loadAllBrandsMap();
  if (allMap.has(slug)) {
    return allMap.get(slug)!;
  }

  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [s, item] of allMap.entries()) {
    if (s.replace(/[^a-z0-9]/g, '') === normalized) {
      return item;
    }
  }

  return {
    slug,
    name: formatBrandName(slug),
    category: 'General',
    variants: { original: getLogoUrl(slug, 'original') },
    defaultVariant: 'original',
    url: getLogoUrl(slug, 'original'),
  };
}

/**
 * Get related logos for brand family or category
 */
export async function getRelatedLogos(slug: string): Promise<LogoItem[]> {
  const allMap = await loadAllBrandsMap();
  const currentItem = allMap.get(slug);

  if (!brandFamiliesCache) {
    try {
      const res = await fetch('/logos-data/brand-families.json');
      if (res.ok) {
        brandFamiliesCache = await res.json();
      }
    } catch {}
  }

  if (brandFamiliesCache) {
    for (const fam of Object.values(brandFamiliesCache)) {
      const isMember = fam.brands.some(
        (b) => b.toLowerCase().replace(/[^a-z0-9]/g, '') === slug.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
      if (isMember) {
        const familyItems: LogoItem[] = [];
        for (const bName of fam.brands) {
          const bSlug = bName.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (bSlug !== slug) {
            const item = allMap.get(bSlug) || allMap.get(bName.toLowerCase().replace(/\s+/g, '-'));
            if (item) familyItems.push(item);
          }
        }
        if (familyItems.length > 0) return familyItems;
      }
    }
  }

  const results: LogoItem[] = [];
  for (const [s, item] of allMap.entries()) {
    if (s !== slug) {
      results.push(item);
      if (results.length >= 12) break;
    }
  }

  return results;
}

/**
 * Fetch raw SVG XML code for a given logo brand and variant
 */
export async function fetchLogoSvgCode(brandSlug: string, variant: string = 'original'): Promise<string> {
  const cacheKey = `${brandSlug}__${variant}`;
  if (svgCodeCache.has(cacheKey)) {
    return svgCodeCache.get(cacheKey)!;
  }

  const logoUrl = getLogoUrl(brandSlug, variant);

  try {
    const proxyUrl = `/cdn-proxy/logos/${brandSlug}/${variant}.svg`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const text = await res.text();
      if (text.trim().startsWith('<svg')) {
        svgCodeCache.set(cacheKey, text);
        return text;
      }
    }
  } catch {}

  try {
    const res = await fetch(logoUrl);
    if (res.ok) {
      const text = await res.text();
      if (text.trim().startsWith('<svg')) {
        svgCodeCache.set(cacheKey, text);
        return text;
      }
    }
  } catch {}

  return '';
}
