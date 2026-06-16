'use client';

import { useState } from 'react';
import { ShoppingBag, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import ProductGallery from './ProductGallery';
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
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const addToCart = useCartStore(s => s.addItem);
  const toggleWishlist = useWishlistStore(s => s.toggle);
  const isWishlisted = useWishlistStore(s => s.has(product.id));

  // ── Derived state ────────────────────────────────────────

  const uniqueSizes = [
    ...new Set(variants.map(v => v.size)),
  ] as SizeOption[];

  const uniqueColors: ColorOption[] = [
    ...new Map(
      variants.map(v => [v.color, { name: v.color, hex: v.colorHex }])
    ).values(),
  ];

  const availableSizes = selectedColor
    ? variants.filter(v => v.color === selectedColor && v.stock > 0).map(v => v.size as SizeOption)
    : variants.filter(v => v.stock > 0).map(v => v.size as SizeOption);

  const availableColorNames = selectedSize
    ? variants.filter(v => v.size === selectedSize && v.stock > 0).map(v => v.color)
    : variants.filter(v => v.stock > 0).map(v => v.color);

  const selectedVariant =
    selectedSize && selectedColor
      ? variants.find(v => v.size === selectedSize && v.color === selectedColor)
      : null;

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
    ? 'text-red-500'
    : maxQty <= 3
    ? 'text-amber-600'
    : 'text-green-600';

  const hasDiscount = !!product.salePrice && product.salePrice < product.basePrice;
  const displayPrice =
    selectedVariant?.priceOverride
    ?? product.salePrice
    ?? product.basePrice;
  const discount = hasDiscount
    ? discountPercent(product.basePrice, product.salePrice!)
    : 0;
  const totalPrice = displayPrice * quantity;

  const noVariants = variants.length === 0;

  // ── Handlers ─────────────────────────────────────────────

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size);
    if (
      selectedColor &&
      !variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0)
    ) {
      setSelectedColor(null);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (
      selectedSize &&
      !variants.some(v => v.color === color && v.size === selectedSize && v.stock > 0)
    ) {
      setSelectedSize(null);
    }
  };

  const handleAddToCart = () => {
    if (!noVariants && !selectedVariant) {
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
      variantId: selectedVariant?.id ?? product.id,
      size: selectedSize ?? ('FREE' as SizeOption),
      color: selectedColor ?? 'default',
      price: displayPrice,
      quantity,
    });

    toast.success('Added to cart! 🛍️');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  // ── Render ────────────────────────────────────────────────

  return (
    <>
      {/* ══ IMAGE GALLERY (full-bleed) ══════════════════════ */}
      <div className="-mx-4">
        <ProductGallery images={product.images} productName={product.name} />
      </div>

      {/* ══ PRODUCT INFO CARD ════════════════════════════════ */}
      <div className="mt-4 px-0 space-y-5">

        {/* Category + rating + share row */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted font-medium uppercase tracking-widest">
            {product.tags[0] ?? 'Fashion'}
          </span>

          <div className="flex items-center gap-3">
            {product.rating && (
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="#C89B6D">
                  <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1l-3.7 2.2.7-4.1-3-2.9 4.2-.7z" />
                </svg>
                <span className="text-[11px] font-semibold text-amber-700">
                  {product.rating.toFixed(1)}
                </span>
                {product.reviewCount && (
                  <span className="text-[10px] text-muted">({product.reviewCount})</span>
                )}
              </div>
            )}

            <button
              onClick={handleShare}
              className="w-8 h-8 flex items-center justify-center rounded-full
                         border border-border/60 hover:border-primary/60 transition-colors"
              aria-label="Share product"
            >
              <Share2 size={14} className="text-muted" />
            </button>
          </div>
        </div>

        {/* Product name */}
        <h1 className="font-serif text-2xl text-primary leading-tight mt-1">
          {product.name}
        </h1>

        {/* Price block */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl font-bold text-primary">
            {formatPrice(displayPrice)}
          </span>
          {hasDiscount && (
            <>
              <span className="font-mono text-sm text-muted line-through">
                {formatPrice(product.basePrice)}
              </span>
              <span
                className="px-2 py-0.5 rounded-full bg-primary text-white
                           text-[10px] font-semibold tracking-wide"
              >
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Short description — collapsible */}
        {product.description && (
          <div>
            <p
              className={cn(
                'text-sm text-text/70 leading-relaxed transition-all',
                detailsExpanded ? '' : 'line-clamp-3'
              )}
            >
              {product.description}
            </p>
            {product.description.length > 120 && (
              <button
                onClick={() => setDetailsExpanded(!detailsExpanded)}
                className="flex items-center gap-1 text-xs text-primary font-medium mt-1
                           hover:underline transition-colors"
              >
                {detailsExpanded ? (
                  <><ChevronUp size={13} /> Read less</>
                ) : (
                  <><ChevronDown size={13} /> Read more</>
                )}
              </button>
            )}
          </div>
        )}

        {/* Stock label */}
        {stockLabel && (
          <p className={cn('text-xs font-semibold', stockColor)}>
            ● {stockLabel}
          </p>
        )}

      </div>

      {/* ══ VARIANT SELECTORS ════════════════════════════════ */}
      {!noVariants && (
        <div className="mt-5 pt-5 border-t border-border space-y-5">
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

      {/* ══ QUANTITY + WISHLIST ROW ══════════════════════════ */}
      <div className="mt-5 flex items-center gap-4">
        <span className="text-sm font-medium text-text">Quantity</span>
        <QuantitySelector
          value={quantity}
          max={Math.max(1, maxQty)}
          onChange={setQuantity}
          disabled={noVariants ? false : !selectedVariant || isOutOfStock}
        />

        {/* Wishlist button — top-right aligned */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            'ml-auto w-11 h-11 flex items-center justify-center rounded-2xl',
            'border transition-all duration-200',
            isWishlisted
              ? 'bg-primary/10 border-primary/40'
              : 'bg-surface border-border hover:border-primary/60'
          )}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={cn(
              'transition-all duration-200',
              isWishlisted ? 'fill-primary stroke-primary' : 'stroke-muted'
            )}
          />
        </button>
      </div>

      {/* ══ TABS (Description / Material / Shipping / Reviews) ═ */}
      <ProductTabs
        description={product.description}
        material={product.material}
        reviews={reviews}
      />

      {/* ══ STICKY BOTTOM BAR ════════════════════════════════ */}
      <div
        className="fixed bottom-[var(--bottom-nav-height)] left-0 right-0 z-30
                   bg-surface/95 backdrop-blur-md border-t border-border shadow-sticky
                   px-4 py-3"
      >
        <div className="container-app flex items-center gap-3">

          {/* Total price */}
          <div className="flex-shrink-0">
            <p className="text-[10px] text-muted leading-none mb-0.5">Total Price</p>
            <p className="font-mono font-bold text-primary text-lg leading-tight">
              {formatPrice(totalPrice)}
            </p>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!noVariants && (!selectedVariant || isOutOfStock)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 h-13 rounded-2xl',
              'font-semibold text-sm tracking-wide transition-all duration-200',
              (!noVariants && (!selectedVariant || isOutOfStock))
                ? 'bg-border text-muted cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-light active:scale-[0.97] shadow-md'
            )}
          >
            <ShoppingBag size={18} />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

        </div>
      </div>

      {/* Spacer — sticky bar এর পেছনে content লুকাবে না */}
      <div className="h-24" />
    </>
  );
}
