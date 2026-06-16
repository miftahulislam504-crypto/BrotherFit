import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Coupon } from '@/types';

export interface CouponResult {
  valid: boolean;
  coupon?: Coupon;
  discount?: number;
  error?: string;
}

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponResult> {
  const q = query(
    collection(db, 'coupons'),
    where('code', '==', code.toUpperCase()),
    where('isActive', '==', true)
  );

  const snap = await getDocs(q);
  if (snap.empty) return { valid: false, error: 'Invalid coupon code' };

  const coupon = { id: snap.docs[0].id, ...snap.docs[0].data() } as Coupon;

  // Expiry check
  if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
    return { valid: false, error: 'Coupon has expired' };
  }

  // Usage limit
  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, error: 'Coupon usage limit reached' };
  }

  // Minimum order
  if (coupon.minOrder > 0 && subtotal < coupon.minOrder) {
    return {
      valid: false,
      error: `Minimum order $${coupon.minOrder} required for this coupon`,
    };
  }

  // Calculate discount
  const discount =
    coupon.type === 'percentage'
      ? (subtotal * coupon.value) / 100
      : Math.min(coupon.value, subtotal);

  return { valid: true, coupon, discount };
}

export async function markCouponUsed(couponId: string): Promise<void> {
  await updateDoc(doc(db, 'coupons', couponId), {
    usedCount: increment(1),
  });
}
