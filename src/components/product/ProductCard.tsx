'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useRef, useState } from 'react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartAnimation } from '@/hooks/useCartAnimation';
import { formatPrice, discountPercent, cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  revealDelay?: number;
}

export default function ProductCard({
  product,
  compact = false,
  revealDelay = 0,
}: ProductCardProps) {
  const toggle      = useWishlistStore(s => s.toggle);
  const isWishlisted= useWishlistStore(s => s.has(product.id));
  const imgRef      = useRef<HTMLDivElement>(null);
  const [wishAnim, setWishAnim] = useState(false);
  const { flyToCart } = useCartAnimation();

  const price      = product.salePrice ?? product.basePrice;
  const hasDiscount= !!product.salePrice && product.salePrice < product.basePrice;
  const discount   = hasDiscount ? discountPercent(product.basePrice, product.salePrice!) : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishAnim(true);
    toggle(product.id);
    setTimeout(() => setWishAnim(false), 400);
  };

  const handleFlyToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    flyToCart(imgRef.current, product.images[0]);
  };

  return (
    <div
      className={cn('product-card group', compact ? 'w-36' : 'w-full')}
      style={{ cursor: 'none' }}
    >
      {/* Image area */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div
          ref={imgRef}
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
              className="object-cover product-img"
              sizes="(max-width: 390px) 50vw, 200px"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-border skeleton" />
          )}

          {/* Quick add overlay — hover করলে দেখা যাবে */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-center justify-center
                       py-3 opacity-0 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(to top, rgba(44,24,16,0.7) 0%, transparent 100%)',
              transition: 'opacity 0.3s ease',
            }}
          >
            <button
              onClick={handleFlyToCart}
              className="flex items-center gap-1.5 bg-white/95 text-primary
                         text-[11px] font-semibold tracking-wide rounded-full
                         px-3 py-1.5 hover:scale-105 active:scale-95
                         transition-transform duration-150"
              data-cursor="Add"
              style={{ cursor: 'none' }}
            >
              + Quick Add
            </button>
          </div>
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
              <h3 className="text-sm font-medium text-text clamp-2 leading-snug
                             hover:text-primary transition-colors duration-200">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="product-wishlist flex-shrink-0 w-7 h-7 flex items-center
                       justify-center rounded-full hover:bg-border/60
                       transition-colors duration-200"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            data-cursor={isWishlisted ? 'Unlike' : 'Like'}
            style={{
              cursor: 'none',
              transform: wishAnim ? 'scale(1.35)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <Heart
              size={16}
              className={cn(
                'transition-colors duration-200',
                isWishlisted ? 'fill-primary stroke-primary' : 'stroke-muted'
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
