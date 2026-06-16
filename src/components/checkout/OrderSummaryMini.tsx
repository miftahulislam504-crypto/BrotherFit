import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/store/cartStore';

interface OrderSummaryMiniProps {
  items: CartItem[];
  subtotal: number;
  deliveryCharge?: number;
  discount?: number;
}

export default function OrderSummaryMini({
  items,
  subtotal,
  deliveryCharge = 0,
  discount = 0,
}: OrderSummaryMiniProps) {
  const total = subtotal + deliveryCharge - discount;

  return (
    <div className="card p-4 mb-5">
      <h3 className="font-serif text-base text-primary mb-3">
        Your Order ({items.length} item{items.length !== 1 ? 's' : ''})
      </h3>

      {/* Items list */}
      <div className="space-y-3 mb-4">
        {items.map(item => (
          <div key={item.variantId} className="flex items-center gap-3">
            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-bg flex-shrink-0">
              {item.productImage && (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text clamp-2 leading-snug">
                {item.productName}
              </p>
              <p className="text-[11px] text-muted mt-0.5">
                {item.size} · {item.color} · ×{item.quantity}
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-primary flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-3 space-y-2">
        <TotalRow label="Subtotal" value={formatPrice(subtotal)} />
        {deliveryCharge > 0 && (
          <TotalRow label="Delivery" value={formatPrice(deliveryCharge)} />
        )}
        {discount > 0 && (
          <TotalRow label="Discount" value={`-${formatPrice(discount)}`} valueClass="text-success" />
        )}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-sm font-semibold text-text">Total</span>
          <span className="font-mono font-bold text-base text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

function TotalRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-muted">{label}</span>
      <span className={`text-xs font-mono font-medium ${valueClass ?? 'text-text'}`}>
        {value}
      </span>
    </div>
  );
}
