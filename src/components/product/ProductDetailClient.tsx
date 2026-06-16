'use client';

import { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import SizeSelector from './SizeSelector';
import ColorSelector, { type ColorOption } from './ColorSelector';
import QuantitySelector from './QuantitySelector';
import ProductTabs from './ProductTabs';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice, discountPercent, cn } from '@/lib/utils';
import type { Product, ProductVariant, Review, SizeOption } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  variants: ProductVariant[];
  reviews: Review[];
}

export default function ProductDetailClient({
  product,
  variants,
  reviews,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(s => s.addItem);
  const toggleWishlist = useWishlistStore(s => s.toggle);
  const isWishlisted = useWishlistStore(s => s.has(product.id));

  // ── Derived state ─────────────────────────────────────────

  const uniqueSizes = [
    ...new Set(variants.map(v => v.size)),
  ] as SizeOption[];

  const uniqueColors: ColorOption[] = [
    ...new Map(
      variants.map(v => [v.color, { name: v.color, hex: v.colorHex }])
    ).values(),
  ];

  // Sizes available (in stock) for selected color
  const availableSizes = selectedColor
    ? variants.filter(v => v.color === selectedColor && v.stock > 0).map(v => v.size as SizeOption)
    : variants.filter(v => v.stock > 0).map(v => v.size as SizeOption);

  // Colors available (in stock) for selected size
  const availableColorNames = selectedSize
    ? variants.filter(v => v.size === selectedSize && v.stock > 0).map(v => v.color)
    : variants.filter(v => v.stock > 0).map(v => v.color);

  // Selected variant (only when both size + color chosen)
  const selectedVariant =
    selectedSize && selectedColor
      ? variants.find(v => v.size === selectedSize && v.color === selectedColor)
      : null;

  // Stock
  const maxQty = selectedVariant?.stock ?? 0;
  const isOutOfStock = selectedVariant ? maxQty === 0 : false;

  const stockLabel = !selectedVariant
    ? null
    : isOutOfStock
    ? 'Out of stock'
    : maxQty <= 3
    ? `Only ${maxQty} left`
    : 'In stock';

  const stockColor = isOutOfStock
    ? 'text-error'
    : maxQty <= 3
    ? 'text-amber-600'
    : 'text-success';

  // Price
  const hasDiscount = !!product.salePrice && product.salePrice < product.basePrice;
  const displayPrice =
    selectedVariant?.priceOverride
    ?? product.salePrice
    ?? product.basePrice;
  const discount = hasDiscount
    ? discountPercent(product.basePrice, product.salePrice!)
    : 0;

  // Total price
  const totalPrice = displayPrice * quantity;

  // ── Handlers ──────────────────────────────────────────────

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size);
    // Reset color if it's not available for new size
    if (
      selectedColor &&
      !variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0)
    ) {
      setSelectedColor(null);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Reset size if not available for new color
    if (
      selectedSize &&
      !variants.some(v => v.color === color && v.size === selectedSize && v.stock > 0)
    ) {
      setSelectedSize(null);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error('Please select size and color');
      return;
    }
    if (isOutOfStock) {
      toast.error('This variant is out of stock');
      return;
    }

    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0] ?? '',
      variantId: selectedVariant.id,
      size: selectedSize!,
      color: selectedColor!,
      price: displayPrice,
      quantity,
    });

    toast.success('Added to cart');
  };

  const noVariants = variants.length === 0;

  // ── Render ────────────────────────────────────────────────

  return (
    <>
      {/* Product info */}
      <div className="px-0 mt-4">

        {/* Category + rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted font-medium uppercase tracking-wider">
            {product.tags[0] ?? 'Fashion'}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#C89B6D">
                <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1l-3.7 2.2.7-4.1-3-2.9 4.2-.7z" />
              </svg>
              <span className="text-xs font-medium text-text">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="font-serif text-2xl text-primary mt-1 leading-tight">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-3 mt-2">
          <span className="font-mono text-xl font-semibold text-primary">
            {formatPrice(displayPrice)}
          </span>
          {hasDiscount && (
            <>
              <span className="font-mono text-sm text-muted line-through">
                {formatPrice(product.basePrice)}
              </span>
              <span className="badge-sale text-[11px]">-{discount}%</span>
            </>
          )}
        </div>

        {/* Short description */}
        {product.description && (
          <p className="text-sm text-text/70 mt-3 leading-relaxed clamp-3">
            {product.description}
          </p>
        )}

        {/* Stock label */}
        {stockLabel && (
          <p className={cn('text-xs font-medium mt-2', stockColor)}>
            {stockLabel}
          </p>
        )}
      </div>

      {/* Selectors — only when variants exist */}
      {!noVariants && (
        <div className="mt-5 space-y-5 border-t border-border pt-5">
          <SizeSelector
            sizes={uniqueSizes}
            availableSizes={availableSizes}
            selected={selectedSize}
            onSelect={handleSizeSelect}
          />
          <ColorSelector
            colors={uniqueColors}
            availableColors={availableColorNames}
            selected={selectedColor}
            onSelect={handleColorSelect}
          />
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4 mt-5">
        <span className="text-sm font-medium text-text">Quantity</span>
        <QuantitySelector
          value={quantity}
          max={Math.max(1, maxQty)}
          onChange={setQuantity}
          disabled={noVariants ? false : !selectedVariant || isOutOfStock}
        />
        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="ml-auto w-10 h-10 flex items-center justify-center
                     border border-border rounded-xl hover:border-accent transition-colors"
        >
          <Heart
            size={18}
            className={cn(
              'transition-colors',
              isWishlisted ? 'fill-primary stroke-primary' : 'stroke-muted'
            )}
          />
        </button>
      </div>

      {/* Tabs */}
      <ProductTabs
        description={product.description}
        material={product.material}
        reviews={reviews}
      />

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-[var(--bottom-nav-height)] left-0 right-0 z-30
                   bg-surface/95 backdrop-blur-sm border-t border-border shadow-sticky
                   px-4 py-3"
      >
        <div className="container-app flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] text-muted">Total Price</p>
            <p className="font-mono font-semibold text-primary text-base">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!noVariants && (!selectedVariant || isOutOfStock)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl',
              'font-medium text-sm transition-all duration-200',
              (!noVariants && (!selectedVariant || isOutOfStock))
                ? 'bg-border text-muted cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-light active:scale-95'
            )}
          >
            <ShoppingBag size={18} />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Spacer so content isn't hidden behind sticky bar */}
      <div className="h-20" />
    </>
  );
}
