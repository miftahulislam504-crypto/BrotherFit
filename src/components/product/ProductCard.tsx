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
    <div className={cn('product-card', compact ? 'w-36' : 'w-full')}>
      {/* Image */}
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
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 390px) 50vw, 200px"
            />
          ) : (
            <div className="w-full h-full bg-border" />
          )}
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 badge-sale">
            -{discount}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-muted mb-0.5 truncate">
              {product.tags[0] ?? 'New'}
            </p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-medium text-text clamp-2 leading-snug hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => toggle(product.id)}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center
                       rounded-full hover:bg-border/60 transition-colors"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={16}
              className={cn(
                'transition-colors',
                isWishlisted
                  ? 'fill-primary stroke-primary'
                  : 'stroke-muted'
              )}
            />
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
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
