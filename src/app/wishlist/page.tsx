'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { getProductById } from '@/services/productService';
import { Skeleton } from '@/components/ui';
import { formatPrice, discountPercent } from '@/lib/utils';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const ids    = useWishlistStore(s => s.ids);
  const toggle = useWishlistStore(s => s.toggle);
  const addToCart = useCartStore(s => s.addItem);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!ids.length) { setLoading(false); return; }
    setLoading(true);
    Promise.all(ids.map(id => getProductById(id)))
      .then(results => setProducts(results.filter(Boolean) as Product[]))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);

  const handleRemove = (id: string) => {
    toggle(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId:    product.id,
      productName:  product.name,
      productImage: product.images[0] ?? '',
      variantId:    `${product.id}-default`,
      size:         '',
      color:        '',
      price:        product.salePrice ?? product.basePrice,
      quantity:     1,
    });
    toast.success('Added to cart');
  };

  return (
    <SiteLayout>
      <div className="mt-4 pb-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-serif text-2xl text-primary">Wishlist</h1>
          {products.length > 0 && (
            <span className="text-xs text-muted">
              {products.length} item{products.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !ids.length && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-border/50 flex items-center justify-center mb-4">
              <Heart size={32} className="text-muted" />
            </div>
            <h2 className="font-serif text-xl text-primary">Nothing saved yet</h2>
            <p className="text-sm text-muted mt-2 max-w-xs">
              Tap the heart on any product to save it here.
            </p>
            <Link href="/products" className="btn-primary mt-6">
              Browse Products
            </Link>
          </div>
        )}

        {/* Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {products.map(product => (
              <WishlistCard
                key={product.id}
                product={product}
                onRemove={() => handleRemove(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}

      </div>
    </SiteLayout>
  );
}

/* ── Card ────────────────────────────────────────────────── */

function WishlistCard({
  product,
  onRemove,
  onAddToCart,
}: {
  product: Product;
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  const price      = product.salePrice ?? product.basePrice;
  const hasDiscount = !!product.salePrice && product.salePrice < product.basePrice;
  const discount   = hasDiscount
    ? discountPercent(product.basePrice, product.salePrice!)
    : 0;

  return (
    <div className="product-card group relative">
      {/* Remove */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center
                   bg-surface/90 backdrop-blur-sm rounded-full shadow-soft
                   hover:bg-error/10 transition-colors"
      >
        <Trash2 size={13} className="text-error" />
      </button>

      {/* Image */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] bg-bg overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 390px) 50vw, 200px"
            />
          ) : (
            <div className="w-full h-full bg-border" />
          )}
          {hasDiscount && (
            <span className="absolute top-2 left-2 badge-sale text-[10px]">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-text clamp-2 leading-snug hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-mono text-sm font-semibold text-primary">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="font-mono text-xs text-muted line-through">
              {formatPrice(product.basePrice)}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="w-full mt-3 flex items-center justify-center gap-1.5
                     bg-primary/10 text-primary rounded-xl py-2 text-xs font-medium
                     hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
