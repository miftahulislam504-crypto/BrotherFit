'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWishlistStore } from '@/store/wishlistStore';
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

export default function AccountDashboard() {
  const { user }        = useAuth();
  const wishlistCount   = useWishlistStore(s => s.ids.length);
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserOrders(user.uid).then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, [user]);

  const pending   = orders.filter(o => o.status === 'pending').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-5 pb-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={loading ? '—' : String(orders.length)}
          href="/account/orders"
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={loading ? '—' : String(pending)}
          href="/account/orders"
          accent
        />
        <StatCard
          icon={Heart}
          label="Wishlist"
          value={String(wishlistCount)}
          href="/account/wishlist"
        />
        <StatCard
          icon={MapPin}
          label="Addresses"
          value="Manage"
          href="/account/addresses"
        />
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif text-lg text-primary">Recent Orders</h2>
          <Link href="/account/orders" className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors">
            View all <ArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 card">
            <ShoppingBag size={28} className="text-muted mx-auto mb-2" />
            <p className="text-sm text-muted">No orders yet</p>
            <Link href="/products" className="btn-primary mt-4 inline-flex text-sm px-5 py-2">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 4).map(order => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'card p-4 flex flex-col gap-2 hover:border-accent transition-colors duration-200',
        accent && 'border-accent/40 bg-accent/5'
      )}
    >
      <Icon size={18} className={accent ? 'text-accent' : 'text-muted'} />
      <div>
        <p className="font-serif text-xl text-primary">{value}</p>
        <p className="text-xs text-muted mt-0.5">{label}</p>
      </div>
    </Link>
  );
}

function OrderRow({ order }: { order: Order }) {
  const colors = STATUS_COLOR[order.status] ?? 'text-muted bg-border';
  const date   = order.createdAt ? formatDate(new Date(order.createdAt as unknown as string)) : '';

  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="card p-4 flex items-center justify-between gap-3 hover:border-accent transition-colors duration-200"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-mono text-muted">
          #{order.id.slice(0, 8).toUpperCase()}
        </p>
        <p className="text-sm font-medium text-text mt-0.5">
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-muted">{date}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className={cn('badge border text-[10px]', colors)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
        <span className="font-mono text-sm font-semibold text-primary">
          {formatPrice(order.total)}
        </span>
      </div>
    </Link>
  );
}
