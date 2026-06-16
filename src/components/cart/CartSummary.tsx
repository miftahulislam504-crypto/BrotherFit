import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  itemCount: number;
}

export default function CartSummary({
  subtotal,
  deliveryCharge,
  discount,
  total,
  itemCount,
}: CartSummaryProps) {
  return (
    <div className="card p-4">
      <h3 className="font-serif text-lg text-primary mb-4">Order Summary</h3>

      <div className="space-y-3">
        <Row label={`Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''})`} value={formatPrice(subtotal)} />
        <Row
          label="Delivery"
          value={deliveryCharge > 0 ? formatPrice(deliveryCharge) : 'Calculated at checkout'}
          valueClass={deliveryCharge === 0 ? 'text-muted' : undefined}
        />
        {discount > 0 && (
          <Row label="Coupon discount" value={`-${formatPrice(discount)}`} valueClass="text-success" />
        )}
      </div>

      <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
        <span className="font-medium text-text">Total</span>
        <span className="font-mono font-semibold text-xl text-primary">
          {formatPrice(total)}
        </span>
      </div>

      <Link href="/checkout" className="btn-primary w-full block text-center mt-5">
        Proceed to Checkout
      </Link>

      <Link
        href="/products"
        className="block text-center text-xs text-muted hover:text-primary transition-colors mt-3 py-2"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className={`text-sm font-medium ${valueClass ?? 'text-text'}`}>{value}</span>
    </div>
  );
}
