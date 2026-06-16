'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, MapPin, CreditCard, Check } from 'lucide-react';
import { getOrderById, updateOrderStatus } from '@/services/orderService';
import { Skeleton, Spinner } from '@/components/ui';
import { formatPrice, formatDate } from '@/lib/utils';
import { getDistrictName } from '@/data/bangladesh';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import type { Order, OrderStatus } from '@/types';

const PIPELINE: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'packed', 'shipped', 'delivered',
];

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending:    'Order Placed',
  confirmed:  'Confirmed',
  processing: 'Processing',
  packed:     'Packed',
  shipped:    'Shipped',
  delivered:  'Delivered',
  cancelled:  'Cancelled',
};

export default function OrderDetailPage() {
  const params  = useParams<{ orderId: string }>();
  const router  = useRouter();

  const [order,     setOrder]     = useState<Order | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    getOrderById(params.orderId).then(o => {
      setOrder(o);
      setLoading(false);
    });
  }, [params.orderId]);

  const handleCancel = async () => {
    if (!order) return;
    setCancelling(true);
    try {
      await updateOrderStatus(order.id, 'cancelled', 'Cancelled by customer');
      setOrder(o => o ? { ...o, status: 'cancelled' } : o);
      toast.success('Order cancelled');
    } catch {
      toast.error('Could not cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <OrderDetailSkeleton />;
  if (!order)  return (
    <div className="text-center py-16">
      <p className="text-muted text-sm">Order not found</p>
      <Link href="/account/orders" className="btn-primary mt-4 inline-flex">Back to Orders</Link>
    </div>
  );

  const currentIndex = PIPELINE.indexOf(order.status);

  return (
    <div className="pb-8 space-y-4">

      {/* Back + header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="btn-ghost p-2 -ml-2">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="font-serif text-lg text-primary leading-tight">
            Order #{order.id.slice(0, 8).toUpperCase()}
          </h2>
          <p className="text-xs text-muted">
            {order.createdAt ? formatDate(new Date(order.createdAt as unknown as string)) : ''}
          </p>
        </div>
      </div>

      {/* Status timeline */}
      {order.status !== 'cancelled' && (
        <div className="card p-4">
          <h3 className="font-serif text-base text-primary mb-4">Order Status</h3>
          <div className="space-y-0">
            {PIPELINE.map((step, i) => {
              const done    = i <= currentIndex;
              const current = i === currentIndex;
              const isLast  = i === PIPELINE.length - 1;

              return (
                <div key={step} className="flex gap-3">
                  {/* Dot + line */}
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                      done
                        ? 'bg-primary border-primary'
                        : 'bg-surface border-border'
                    )}>
                      {done && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    {!isLast && (
                      <div className={cn(
                        'w-0.5 h-6 mt-0.5 transition-colors',
                        i < currentIndex ? 'bg-primary' : 'bg-border'
                      )} />
                    )}
                  </div>

                  {/* Label */}
                  <div className="pb-4 pt-0.5">
                    <p className={cn(
                      'text-sm font-medium transition-colors',
                      current ? 'text-primary' : done ? 'text-text' : 'text-muted'
                    )}>
                      {STATUS_LABEL[step]}
                    </p>
                    {current && (
                      <p className="text-xs text-muted mt-0.5">Current status</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled badge */}
      {order.status === 'cancelled' && (
        <div className="card p-4 border-error/30 bg-error/5">
          <p className="text-sm font-medium text-error">This order has been cancelled.</p>
        </div>
      )}

      {/* Items */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Package size={15} className="text-primary" />
          <h3 className="font-serif text-base text-primary">
            Items ({order.items.length})
          </h3>
        </div>
        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-bg">
                  {item.productImage && (
                    <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="64px" />
                  )}
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text clamp-2">{item.productName}</p>
                <p className="text-xs text-muted mt-0.5">{item.size} · {item.color}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs text-muted">×{item.quantity}</p>
                  <p className="font-mono text-sm font-semibold text-primary">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery address */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={15} className="text-primary" />
          <h3 className="font-serif text-base text-primary">Delivery Address</h3>
        </div>
        <p className="text-sm font-medium text-text">{order.address.name}</p>
        <p className="text-sm text-muted">{order.address.phone}</p>
        <p className="text-sm text-muted mt-1 leading-relaxed">
          {order.address.address}, {order.address.area},{' '}
          {order.address.upazila}, {getDistrictName(order.address.district)}
        </p>
      </div>

      {/* Payment + totals */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard size={15} className="text-primary" />
          <h3 className="font-serif text-base text-primary">Payment</h3>
        </div>
        <div className="space-y-2">
          <Row label="Method"   value={order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()} />
          <Row label="Subtotal" value={formatPrice(order.subtotal)} />
          <Row label="Delivery" value={formatPrice(order.deliveryCharge)} />
          {order.discount > 0 && (
            <Row label="Discount" value={`-${formatPrice(order.discount)}`} valueClass="text-success" />
          )}
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="text-sm font-semibold text-text">Total</span>
            <span className="font-mono font-bold text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Cancel button — only for pending orders */}
      {order.status === 'pending' && (
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-error/40 text-error text-sm font-medium hover:bg-error/10 transition-colors disabled:opacity-50"
        >
          {cancelling ? <Spinner size="sm" /> : null}
          Cancel Order
        </button>
      )}

    </div>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted">{label}</span>
      <span className={cn('text-sm font-medium', valueClass ?? 'text-text')}>{value}</span>
    </div>
  );
}

function OrderDetailSkeleton() {
  return (
    <div className="pb-8 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-xl" />
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-48 rounded-2xl" />
      <Skeleton className="h-40 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  );
}
