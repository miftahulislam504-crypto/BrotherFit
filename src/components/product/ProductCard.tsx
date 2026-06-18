'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice, discountPercent, cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
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
        'border border-border/40 transition-all duration-300',
        'hover:shadow-card hover:-translate-y-0.5',
        compact ? 'w-36' : 'w-full'
      )}
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* ── Image block ── */}
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
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 390px) 50vw, 200px"
            />
          ) : (
            <div className="w-full h-full bg-border/50 animate-pulse" />
          )}

          {/* Overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(44,24,16,0.35) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <span
            className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full
                       bg-primary text-white text-[10px] font-semibold tracking-wide z-10"
          >
            -{discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className={cn(
            'absolute top-2.5 right-2.5 z-10',
            'w-8 h-8 flex items-center justify-center rounded-full',
            'transition-all duration-300',
            'opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0',
            isWishlisted
              ? 'bg-primary shadow-md'
              : 'bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm'
          )}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={13}
            className={cn(
              'transition-all duration-200',
              isWishlisted ? 'fill-white stroke-white' : 'stroke-primary'
            )}
          />
        </button>

        {/* Quick add button — slides up on hover */}
        {!compact && (
          <Link
            href={`/product/${product.slug}`}
            className={cn(
              'absolute bottom-0 left-0 right-0 z-10',
              'flex items-center justify-center gap-1.5',
              'py-3 text-xs font-semibold',
              'opacity-0 group-hover:opacity-100',
              'translate-y-2 group-hover:translate-y-0',
              'transition-all duration-300'
            )}
            style={{
              background: 'rgba(44,24,16,0.9)',
              backdropFilter: 'blur(8px)',
              color: '#E8C9A0',
            }}
          >
            <ShoppingBag size={13} strokeWidth={2} />
            View Product
          </Link>
        )}
      </Link>

      {/* ── Info block ── */}
      <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3 gap-1">

        {/* Tag */}
        <p className="text-[10px] text-muted uppercase tracking-wider font-medium truncate">
          {product.tags[0] ?? 'New Arrival'}
        </p>

        {/* Name */}
        <Link href={`/product/${product.slug}`} className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-medium text-text leading-snug hover:text-primary transition-colors duration-200',
              compact ? 'text-xs clamp-2' : 'text-sm clamp-2'
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  size={10}
                  className={s <= Math.round(product.rating!) ? 'text-accent fill-accent' : 'text-border fill-border'}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted">
              {product.rating.toFixed(1)}
              {product.reviewCount ? (
                <span className="text-muted/70"> ({product.reviewCount})</span>
              ) : null}
            </span>
          </div>
        )}

        {/* Price */}
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
