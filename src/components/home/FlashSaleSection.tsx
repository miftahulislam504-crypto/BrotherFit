'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';
import ProductCard from '@/components/product/ProductCard';
import type { Product, FlashSale } from '@/types';

interface FlashSaleSectionProps {
  sale: FlashSale;
  products: Product[];
}

const FILTER_TABS = ['All', 'Newest', 'Popular', 'Man', 'Women'];

export default function FlashSaleSection({ sale, products }: FlashSaleSectionProps) {
  const [activeTab, setActiveTab] = useState('All');

  if (!products.length) return null;

  return (
    <section className="mt-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-xl text-primary">Flash Sale</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Closing in</span>
          <CountdownTimer endTime={sale.endTime} />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="scroll-row mb-4 gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-none px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-text hover:border-accent'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product row — horizontal scroll */}
      <div className="scroll-row">
        {products.map((product) => (
          <div key={product.id} className="flex-none">
            <ProductCard product={product} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
