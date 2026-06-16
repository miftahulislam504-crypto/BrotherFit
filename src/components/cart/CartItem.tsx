'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart } from 'lucide-react';
import { useCartStore, type CartItem as CartItemType } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import QuantitySelector from '@/components/product/QuantitySelector';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem    = useCartStore(s => s.removeItem);
  const toggleWishlist = useWishlistStore(s => s.toggle);

  const handleSaveForLater = () => {
    toggleWishlist(item.productId);
    removeItem(item.variantId);
  };

  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      {/* Image */}
      <Link href={`/product/${item.productId}`} className="flex-shrink-0">
        <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-bg">
          {item.productImage ? (
            <Image
              src={item.productImage}
              alt={item.productName}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full bg-border" />
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.productId}`}>
          <h3 className="text-sm font-medium text-text clamp-2 leading-snug hover:text-primary transition-colors">
            {item.productName}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-xs text-muted">Size: {item.size}</span>
          <span className="text-muted text-xs">·</span>
          <span className="text-xs text-muted">{item.color}</span>
        </div>

        <p className="font-mono text-sm font-semibold text-primary mt-1">
          {formatPrice(item.price)}
        </p>

        {/* Quantity + actions row */}
        <div className="flex items-center justify-between mt-3">
          <QuantitySelector
            value={item.quantity}
            onChange={qty => updateQuantity(item.variantId, qty)}
          />

          <div className="flex items-center gap-1">
            <button
              onClick={handleSaveForLater}
              title="Save for later"
              className="w-8 h-8 flex items-center justify-center
                         rounded-full hover:bg-border/60 transition-colors"
            >
              <Heart size={15} className="stroke-muted" />
            </button>
            <button
              onClick={() => removeItem(item.variantId)}
              title="Remove"
              className="w-8 h-8 flex items-center justify-center
                         rounded-full hover:bg-error/10 transition-colors"
            >
              <Trash2 size={15} className="stroke-error" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
