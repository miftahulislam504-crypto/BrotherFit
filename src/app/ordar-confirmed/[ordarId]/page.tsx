import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import { getOrderById } from '@/services/orderService';
import { formatPrice, formatDate } from '@/lib/utils';
import { getDistrictName } from '@/data/bangladesh';

export const metadata: Metadata = { title: 'Order Confirmed' };

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function OrderConfirmedPage({ params }: Props) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) notFound();

  const shortId = orderId.slice(0, 8).toUpperCase();

  const paymentLabel: Record<string, string> = {
    cod:   'Cash on Delivery',
    bkash: 'bKash',
    nagad: 'Nagad',
  };

  return (
    <SiteLayout>
      <div className="mt-6 pb-8">

        {/* ── Success header ────────────────────────────── */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-3 animate-scale-in">
            <CheckCircle size={32} className="text-success" />
          </div>
          <h1 className="font-serif text-2xl text-primary">Order Placed!</h1>
          <p className="text-sm text-muted mt-1.5 max-w-xs mx-auto">
            Thank you, {order.address.name}. We will confirm your order shortly.
          </p>
          <p className="font-mono text-xs text-muted/60 mt-2 bg-border/40 inline-block px-3 py-1 rounded-full">
            #{shortId}
          </p>
        </div>

        {/* ── Order status ──────────────────────────────── */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-4 text-center">
          <p className="text-sm text-text">
            Status:{' '}
            <span className="font-semibold text-primary capitalize">
              {order.status}
            </span>
          </p>
          <p className="text-xs text-muted mt-1">
            We will confirm within 1–2 hours via call or SMS.
          </p>
        </div>

        {/* ── Items ─────────────────────────────────────── */}
        <div className="card p-4 mb-3">
          <SectionTitle icon={Package} title={`Items (${order.items.length})`} />
          <div className="space-y-3 mt-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text clamp-2">{item.productName}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {item.size} · {item.color} · ×{item.quantity}
                  </p>
                </div>
                <span className="font-mono text-sm text-primary font-semibold flex-shrink-0">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Delivery address ──────────────────────────── */}
        <div className="card p-4 mb-3">
          <SectionTitle icon={MapPin} title="Delivery Address" />
          <div className="mt-3 space-y-0.5">
            <p className="text-sm font-medium text-text">{order.address.name}</p>
            <p className="text-sm text-muted">{order.address.phone}</p>
            <p className="text-sm text-muted mt-1">
              {order.address.address}
              <br />
              {order.address.area}, {order.address.upazila}
              <br />
              {getDistrictName(order.address.district)}
            </p>
          </div>
        </div>

        {/* ── Payment & totals ──────────────────────────── */}
        <div className="card p-4 mb-6">
          <SectionTitle icon={CreditCard} title="Payment" />
          <div className="mt-3 space-y-2">
            <TotalRow label="Payment method" value={paymentLabel[order.paymentMethod] ?? order.paymentMethod} />
            <TotalRow label="Subtotal"       value={formatPrice(order.subtotal)} />
            <TotalRow label="Delivery"       value={formatPrice(order.deliveryCharge)} />
            {order.discount > 0 && (
              <TotalRow label="Discount" value={`-${formatPrice(order.discount)}`} valueClass="text-success" />
            )}
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="font-semibold text-text text-sm">Total</span>
              <span className="font-mono font-bold text-primary">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Actions ───────────────────────────────────── */}
        <div className="space-y-3">
          <Link
            href="/account/orders"
            className="flex items-center justify-center gap-2 btn-outline w-full"
          >
            Track Order
            <ArrowRight size={16} />
          </Link>
          <Link href="/" className="block text-center text-sm text-muted hover:text-primary transition-colors py-2">
            Continue Shopping
          </Link>
        </div>

      </div>
    </SiteLayout>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} className="text-primary" />
      <h2 className="font-serif text-base text-primary">{title}</h2>
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
      <span className="text-sm text-muted">{label}</span>
      <span className={`text-sm font-medium ${valueClass ?? 'text-text'}`}>{value}</span>
    </div>
  );
}
