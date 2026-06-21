'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const PRICE_RANGES = [
  { label: 'Under ৳1,000',      min: 0,    max: 1000 },
  { label: '৳1,000 – ৳3,000',   min: 1000, max: 3000 },
  { label: '৳3,000 – ৳6,000',   min: 3000, max: 6000 },
  { label: 'Over ৳6,000',       min: 6000, max: Infinity },
];

export interface ActiveFilters {
  categoryId?: string;
  sizes: string[];
  priceMin?: number;
  priceMax?: number;
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}

export default function FilterDrawer({
  open,
  onClose,
  categories,
  filters,
  onChange,
}: FilterDrawerProps) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const toggleSize = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes });
  };

  const setCategory = (id: string) => {
    onChange({
      ...filters,
      categoryId: filters.categoryId === id ? undefined : id,
    });
  };

  const setPriceRange = (min: number, max: number) => {
    const isActive = filters.priceMin === min && filters.priceMax === max;
    onChange({
      ...filters,
      priceMin: isActive ? undefined : min,
      priceMax: isActive ? undefined : max,
    });
  };

  const clearAll = () => {
    onChange({ sizes: [] });
  };

  const activeCount =
    (filters.categoryId ? 1 : 0) +
    filters.sizes.length +
    (filters.priceMin !== undefined ? 1 : 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50
                       bg-surface rounded-t-3xl shadow-card
                       max-h-[85vh] overflow-y-auto pb-safe"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h3 className="font-serif text-lg text-primary">Filter</h3>
              <div className="flex items-center gap-3">
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted underline"
                  >
                    Clear all ({activeCount})
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center
                             rounded-full hover:bg-border/60 transition-colors"
                >
                  <X size={16} className="text-text" />
                </button>
              </div>
            </div>

            <div className="px-5 pb-6 space-y-6 mt-4">

              {/* Category */}
              {categories.length > 0 && (
                <FilterSection title="Category">
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <FilterPill
                        key={cat.id}
                        label={cat.name}
                        active={filters.categoryId === cat.id}
                        onClick={() => setCategory(cat.id)}
                      />
                    ))}
                  </div>
                </FilterSection>
              )}

              {/* Size */}
              <FilterSection title="Size">
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <FilterPill
                      key={size}
                      label={size}
                      active={filters.sizes.includes(size)}
                      onClick={() => toggleSize(size)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Price */}
              <FilterSection title="Price Range">
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map(range => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.min, range.max)}
                      className={cn(
                        'flex items-center gap-3 py-2.5 px-3 rounded-xl border text-sm text-left transition-all duration-200',
                        filters.priceMin === range.min && filters.priceMax === range.max
                          ? 'border-primary bg-primary/5 text-primary font-medium'
                          : 'border-border text-text hover:border-accent'
                      )}
                    >
                      <span
                        className={cn(
                          'w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all',
                          filters.priceMin === range.min && filters.priceMax === range.max
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        )}
                      />
                      {range.label}
                    </button>
                  ))}
                </div>
              </FilterSection>

            </div>

            {/* Apply button */}
            <div className="sticky bottom-0 bg-surface border-t border-border px-5 py-4">
              <button
                onClick={onClose}
                className="btn-primary w-full"
              >
                {activeCount > 0 ? `Apply Filters (${activeCount})` : 'Apply'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-medium text-text mb-3">{title}</h4>
      {children}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-200',
        active
          ? 'bg-primary text-white border-primary'
          : 'bg-surface border-border text-text hover:border-accent'
      )}
    >
      {label}
    </button>
  );
}
