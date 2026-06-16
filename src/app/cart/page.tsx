'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CouponInput from '@/components/cart/CouponInput';
import EmptyCart from '@/components/cart/EmptyCart';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const items      = useCartStore(s => s.items);
  const totalPrice = useCartStore(s => s.totalPrice());
  const totalItems = useCartStore(s => s.totalItems());

  const [discount,        setDiscount]        = useState(0);
  const [appliedCode,     setAppliedCode]     = useState('');
  const [appliedCouponId, setAppliedCouponId] = useState('');

  const deliveryCharge = 0; // Set after address is entered in checkout
  const total = Math.max(0, totalPrice - discount + deliveryCharge);

  const handleApplyCoupon = (d: number, code: string, couponId: string) => {
    setDiscount(d);
    setAppliedCode(code);
    setAppliedCouponId(couponId);
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCode('');
    setAppliedCouponId('');
  };

  if (!items.length) {
    return (
      <SiteLayout>
        <EmptyCart />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mt-4">
        <h1 className="font-serif text-2xl text-primary mb-4">
          Cart
          <span className="text-muted font-sans text-base font-normal ml-2">
            ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </span>
        </h1>

        {/* Cart items */}
        <div className="card p-4 mb-4">
          {items.map(item => (
            <CartItem key={item.variantId} item={item} />
          ))}
        </div>

        {/* Coupon */}
        <div className="mb-4">
          <CouponInput
            subtotal={totalPrice}
            onApply={handleApplyCoupon}
            onRemove={handleRemoveCoupon}
            appliedCode={appliedCode}
          />
        </div>

        {/* Order summary */}
        <CartSummary
          subtotal={totalPrice}
          deliveryCharge={deliveryCharge}
          discount={discount}
          total={total}
          itemCount={totalItems}
        />

        {/* Bottom spacer */}
        <div className="h-4" />
      </div>
    </SiteLayout>
  );
}
