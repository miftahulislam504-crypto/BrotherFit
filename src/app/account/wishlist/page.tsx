'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { getProductById } from '@/services/productService';
import { Skeleton } from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const ids    = useWishlistStore(s => s.ids);
  const toggle = useWishlistStore(s => s.toggle);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!ids.length) { setLoading(false); return; }

    Promise.all(ids.map(id => getProductById(id)))
      .then(results => {
        setProducts(results.filter(Boolean) as Product[]);
        setLoading(false);
      });
  }, [ids.join(',')]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 pb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[3/4] rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!ids.length || !products.length) {
    return (
      <div className="text-center py-16 pb-6">
        <Heart size={32} className="text-muted mx-auto mb-3" />
        <p className="font-serif text-lg text-primary">Wishlist is empty</p>
        <p className="text-sm text-muted mt-1">Save items you love</p>
        <Link href="/products" className="btn-primary mt-5 inline-flex">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <p className="text-xs text-muted mb-4">{products.length} saved item{products.length !== 1 ? 's' : ''}</p>
      <div className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <WishlistCard key={product.id} product={product} onRemove={() => toggle(product.id)} />
        ))}
      </div>
    </div>
  );
}

function WishlistCard({ product, onRemove }: { product: Product; onRemove: () => void }) {
  const addItem = useCartStore(s => s.addItem);

  const price      = product.salePrice ?? product.basePrice;
  const hasDiscount = !!product.salePrice && product.salePrice < product.basePrice;

  const handleQuickAdd = () => {
    // Add with no variant (simple product quick-add)
    addItem({
      productId:    product.id,
      productName:  product.name,
      productImage: product.images[0] ?? '',
      variantId:    `${product.id}-default`,
      size:         '',
      color:        '',
      price,
      quantity:     1,
    });
    toast.success('Added to cart');
  };

  return (
    <div className="product-card group relative">
      {/* Remove button */}
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
            <span className="absolute top-2 left-2 badge-sale">
              Sale
            </span>
          )}
        </div>
      </Link>

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

        {/* Quick add to cart */}
        <button
          onClick={handleQuickAdd}
          className="w-full mt-3 flex items-center justify-center gap-1.5
                     bg-primary/10 text-primary rounded-xl py-2 text-xs font-medium
                     hover:bg-primary hover:text-white transition-all duration-200"
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
