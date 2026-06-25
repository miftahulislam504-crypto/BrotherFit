'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { SlidersHorizontal } from 'lucide-react';
import { getProducts } from '@/services/productService';
import ProductGrid from '@/components/home/ProductGrid';
import SortSelect, { SortOption } from './SortSelect';
import FilterDrawer, { type ActiveFilters } from './FilterDrawer';
import { Spinner } from '@/components/ui';
import type { Product, Category } from '@/types';

interface ProductListingClientProps {
  categories: Category[];
  initialCategory?: string;
  initialSort: string;
}

export default function ProductListingClient({
  categories,
  initialCategory,
  initialSort,
}: ProductListingClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>((initialSort as SortOption) ?? 'newest');
  const [filters, setFilters] = useState<ActiveFilters>({
    categoryId: initialCategory,
    sizes: [],
  });

  // Cursor for pagination (not serializable, stored in ref)
  const lastDocRef = useRef<DocumentSnapshot | null>(null);

  // ── Fetch ─────────────────────────────────────────────────

  const fetchProducts = useCallback(async (reset: boolean) => {
    if (reset) {
      setLoading(true);
      lastDocRef.current = null;
    } else {
      setLoadingMore(true);
    }

    try {
      const result = await getProducts({
        categoryId: filters.categoryId,
        sortBy: sort,
        pageSize: 12,
        lastDoc: reset ? undefined : lastDocRef.current ?? undefined,
      });

      lastDocRef.current = result.lastDoc;

      setProducts(prev => reset ? result.products : [...prev, ...result.products]);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters.categoryId, sort]);

  // Re-fetch when sort or filters change
  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  // ── Active filter count ───────────────────────────────────

  const activeFilterCount =
    (filters.categoryId ? 1 : 0) +
    filters.sizes.length +
    (filters.priceMin !== undefined ? 1 : 0);

  // ── Render ────────────────────────────────────────────────

  return (
    <div className="px-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <span className="text-sm text-muted">
          {loading ? (
            <span className="skeleton h-4 w-24 inline-block rounded" />
          ) : (
            `${products.length} products`
          )}
        </span>

        <div className="flex items-center gap-2">
          <SortSelect value={sort} onChange={setSort} />

          <button
            onClick={() => setFilterOpen(true)}
            className="relative flex items-center gap-1.5 bg-surface border border-border
                       rounded-xl px-3 py-2 text-xs font-medium text-text
                       hover:border-accent transition-colors duration-200"
          >
            <SlidersHorizontal size={14} />
            Filter
            {activeFilterCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white
                           text-[9px] font-medium rounded-full flex items-center justify-center"
              >
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.categoryId && (
            <ActivePill
              label={categories.find(c => c.id === filters.categoryId)?.name ?? 'Category'}
              onRemove={() => setFilters(f => ({ ...f, categoryId: undefined }))}
            />
          )}
          {filters.sizes.map(size => (
            <ActivePill
              key={size}
              label={`Size: ${size}`}
              onRemove={() =>
                setFilters(f => ({ ...f, sizes: f.sizes.filter(s => s !== size) }))
              }
            />
          ))}
          {filters.priceMin !== undefined && (
            <ActivePill
              label="Price range"
              onRemove={() => setFilters(f => ({ ...f, priceMin: undefined, priceMax: undefined }))}
            />
          )}
        </div>
      )}

      {/* Grid */}
      <ProductGrid products={products} loading={loading} skeletonCount={12} />

      {/* Load more */}
      {!loading && hasMore && (
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={() => fetchProducts(false)}
            disabled={loadingMore}
            className="btn-outline flex items-center gap-2"
          >
            {loadingMore ? <Spinner size="sm" /> : null}
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* End message */}
      {!loading && !hasMore && products.length > 0 && (
        <p className="text-center text-xs text-muted py-6">
          All products loaded
        </p>
      )}

      {/* Filter drawer */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        categories={categories}
        filters={filters}
        onChange={setFilters}
      />
    </div>
  );
}

// ── Active filter pill ────────────────────────────────────────

function ActivePill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 bg-primary/10 text-primary
                 text-xs font-medium px-3 py-1.5 rounded-full
                 hover:bg-primary/20 transition-colors"
    >
      {label}
      <span className="text-primary/60 text-base leading-none">×</span>
    </button>
  );
}
