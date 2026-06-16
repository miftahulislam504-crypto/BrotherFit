'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUserOrders } from '@/services/orderService';
import { Skeleton } from '@/components/ui';
import { formatPrice, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

const STATUS_COLOR: Record<string, string> = {
  pending:    'text-amber-600  bg-amber-50  border-amber-200',
  confirmed:  'text-blue-600   bg-blue-50   border-blue-200',
  processing: 'text-violet-600 bg-violet-50 border-violet-200',
  packed:     'text-cyan-600   bg-cyan-50   border-cyan-200',
  shipped:    'text-indigo-600 bg-indigo-50 border-indigo-200',
  delivered:  'text-success    bg-success/10 border-success/30',
  cancelled:  'text-error      bg-error/10  border-error/30',
};

const PIPELINE = ['pending', 'confirmed', 'processing', 'packed', 'shipped', 'delivered'];

export default function OrdersPage() {
  const { user }              = useAuth();
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserOrders(user.uid).then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-3 pb-6">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-16 pb-6">
        <ShoppingBag size={32} className="text-muted mx-auto mb-3" />
        <p className="font-serif text-lg text-primary">No orders yet</p>
        <p className="text-sm text-muted mt-1">Your orders will appear here</p>
        <Link href="/products" className="btn-primary mt-5 inline-flex">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-6">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const colors = STATUS_COLOR[order.status] ?? 'text-muted bg-border';
  const stepIndex   = PIPELINE.indexOf(order.status);
  const totalSteps  = PIPELINE.length - 1; // exclude delivered from denominator for progress

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="card p-4 block hover:border-accent transition-colors duration-200"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="font-mono text-xs text-muted">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
          <p className="text-sm font-medium text-text mt-0.5">
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            {' · '}
            {order.items[0]?.productName}{order.items.length > 1 ? ` +${order.items.length - 1}` : ''}
          </p>
        </div>
        <span className={cn('badge border text-[10px] flex-shrink-0', colors)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Progress bar — only for non-cancelled */}
      {order.status !== 'cancelled' && stepIndex !== -1 && (
        <div className="mb-3">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((stepIndex) / (PIPELINE.length - 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-muted">Pending</span>
            <span className="text-[9px] text-muted">Delivered</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {order.createdAt ? formatDate(new Date(order.createdAt as unknown as string)) : ''}
        </p>
        <div className="flex items-center gap-1">
          <span className="font-mono text-sm font-semibold text-primary">
            {formatPrice(order.total)}
          </span>
          <ArrowRight size={14} className="text-muted" />
        </div>
      </div>
    </Link>
  );
}
