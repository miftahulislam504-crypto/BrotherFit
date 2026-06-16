'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice, discountPercent, cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  compact?: boolean; // smaller variant for flash sale row
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const toggle = useWishlistStore(s => s.toggle);
  const isWishlisted = useWishlistStore(s => s.has(product.id));

  const price = product.salePrice ?? product.basePrice;
  const hasDiscount = !!product.salePrice && product.salePrice < product.basePrice;
  const discount = hasDiscount
    ? discountPercent(product.basePrice, product.salePrice!)
    : 0;

  return (
    <div
      className={cn(
        'group flex flex-col bg-surface rounded-2xl overflow-hidden',
        'border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300',
        compact ? 'w-36' : 'w-full'
      )}
    >
      {/* ── Image block ──────────────────────────────── */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div
          className={cn(
            'relative bg-bg overflow-hidden',
            compact ? 'h-44' : 'aspect-[3/4]'
          )}
        >
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 390px) 50vw, 200px"
            />
          ) : (
            /* Placeholder shimmer */
            <div className="w-full h-full bg-border/50 animate-pulse" />
          )}
        </div>

        {/* Discount badge — top-left */}
        {hasDiscount && (
          <span
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full
                       bg-primary text-white text-[10px] font-semibold tracking-wide"
          >
            -{discount}%
          </span>
        )}
      </Link>

      {/* ── Info block ───────────────────────────────── */}
      <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3 gap-1">

        {/* Tag / category label */}
        <p className="text-[10px] text-muted uppercase tracking-wider font-medium truncate">
          {product.tags[0] ?? 'New Arrival'}
        </p>

        {/* Name row — name + wishlist heart */}
        <div className="flex items-start justify-between gap-1.5">
          <Link href={`/product/${product.slug}`} className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-medium text-text leading-snug hover:text-primary transition-colors',
                compact ? 'text-xs clamp-2' : 'text-sm clamp-2'
              )}
            >
              {product.name}
            </h3>
          </Link>

          {/* Wishlist heart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center
                       rounded-full bg-bg/80 border border-border/60
                       hover:border-primary/60 transition-all duration-200 mt-0.5"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={14}
              className={cn(
                'transition-all duration-200',
                isWishlisted
                  ? 'fill-primary stroke-primary scale-110'
                  : 'stroke-muted'
              )}
            />
          </button>
        </div>

        {/* Rating — if available */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="#C89B6D">
              <path d="M6 1l1.27 2.58L10 4.02l-2 1.95.47 2.75L6 7.38 3.53 8.72 4 5.97 2 4.02l2.73-.44L6 1z" />
            </svg>
            <span className="text-[10px] font-medium text-muted">
              {product.rating.toFixed(1)}
              {product.reviewCount ? (
                <span className="text-muted/70"> ({product.reviewCount})</span>
              ) : null}
            </span>
          </div>
        )}

        {/* Price row — pushed to bottom */}
        <div className="flex items-center gap-2 mt-auto pt-1.5">
          <span className="text-sm font-semibold font-mono text-primary">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted line-through font-mono">
              {formatPrice(product.basePrice)}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
