'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';
import ProductCard from '@/components/product/ProductCard';
import type { Product, FlashSale } from '@/types';

interface FlashSaleSectionProps {
  sale: FlashSale;
  products: Product[];
}

// Tab definitions — label shown + which product tags to match
const TABS = [
  { label: 'All',     tag: null       },
  { label: 'Newest',  tag: 'new'      },
  { label: 'Popular', tag: 'popular'  },
  { label: 'Man',     tag: 'men'      },
  { label: 'Women',   tag: 'women'    },
] as const;

type TabLabel = typeof TABS[number]['label'];

export default function FlashSaleSection({ sale, products }: FlashSaleSectionProps) {
  const [activeTab, setActiveTab] = useState<TabLabel>('All');
  const [expired, setExpired] = useState(false);

  // Client-side filter by product tags
  const filtered = useMemo(() => {
    const tab = TABS.find(t => t.label === activeTab);
    if (!tab?.tag) return products;
    return products.filter(p =>
      p.tags.some(t => t.toLowerCase() === tab.tag)
    );
  }, [activeTab, products]);

  if (!products.length || expired) return null;

  return (
    <section className="mt-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-xl text-primary">Flash Sale</h2>

          {/* Countdown */}
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-medium text-muted uppercase tracking-wide"
            >
              Ends in
            </span>
            <CountdownTimer endTime={sale.endTime} onExpire={() => setExpired(true)} />
          </div>
        </div>

        {/* See All */}
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs text-muted
                     hover:text-primary transition-colors duration-200 flex-shrink-0"
        >
          See All
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* ── Filter tabs ── */}
      <div className="scroll-row mb-4" style={{ gap: '8px' }}>
        {TABS.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={cn(
              'flex-none px-4 py-1.5 rounded-full text-xs font-medium',
              'transition-all duration-200 whitespace-nowrap',
              activeTab === label
                ? 'bg-primary text-white shadow-soft'
                : 'bg-surface border border-border text-text hover:border-accent'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Product scroll ── */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-6 text-center">
          No products in this category
        </p>
      ) : (
        <div className="scroll-row">
          {filtered.map((product) => (
            <div key={product.id} className="flex-none">
              <ProductCard product={product} compact />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
