'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Review } from '@/types';

const TABS = ['Description', 'Material', 'Shipping', 'Reviews'] as const;
type Tab = typeof TABS[number];

interface ProductTabsProps {
  description: string;
  material?: string;
  reviews: Review[];
}

export default function ProductTabs({ description, material, reviews }: ProductTabsProps) {
  const [active, setActive] = useState<Tab>('Description');

  return (
    <div className="mt-6">
      {/* Tab bar */}
      <div className="flex border-b border-border">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              'flex-1 py-3 text-xs font-medium transition-all duration-200 relative',
              active === tab ? 'text-primary' : 'text-muted hover:text-text'
            )}
          >
            {tab}
            {tab === 'Reviews' && reviews.length > 0 && (
              <span className="ml-1 text-[10px] text-muted">({reviews.length})</span>
            )}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-4 text-sm text-text/80 leading-relaxed">

        {active === 'Description' && (
          <p>{description || 'No description available.'}</p>
        )}

        {active === 'Material' && (
          <p>{material || 'Material information not available.'}</p>
        )}

        {active === 'Shipping' && (
          <div className="space-y-3">
            <ShippingRow label="Sirajganj" value="80 BDT · 2–3 days" />
            <ShippingRow label="Outside Sirajganj" value="120 BDT · 4–7 days" />
            <ShippingRow label="Express" value="Available on request" />
            <p className="text-xs text-muted mt-3 pt-3 border-t border-border">
              Orders placed before 2 PM are dispatched same day. Free shipping on orders over ৳2,000.
            </p>
          </div>
        )}

        {active === 'Reviews' && (
          <ReviewList reviews={reviews} />
        )}

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function ShippingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm font-medium text-text">{label}</span>
      <span className="text-sm text-muted">{value}</span>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.27 2.58L10 4.02l-2 1.95.47 2.75L6 7.38 3.53 8.72 4 5.97 2 4.02l2.73-.44L6 1z"
            fill={star <= rating ? '#C89B6D' : '#EDE8E1'}
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return (
      <p className="text-muted text-sm py-4 text-center">No reviews yet.</p>
    );
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-bg rounded-xl">
        <div className="text-3xl font-serif font-medium text-primary">
          {avg.toFixed(1)}
        </div>
        <div>
          <StarRating rating={Math.round(avg)} />
          <p className="text-xs text-muted mt-1">{reviews.length} reviews</p>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full bg-primary/10 flex items-center
                             justify-center text-xs font-medium text-primary"
                >
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-text">{review.userName}</span>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-text/70 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
