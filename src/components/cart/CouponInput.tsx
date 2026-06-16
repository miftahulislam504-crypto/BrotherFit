'use client';

import { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { validateCoupon } from '@/services/couponService';
import { Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';

interface CouponInputProps {
  subtotal: number;
  onApply: (discount: number, code: string, couponId: string) => void;
  onRemove: () => void;
  appliedCode?: string;
}

export default function CouponInput({
  subtotal,
  onApply,
  onRemove,
  appliedCode,
}: CouponInputProps) {
  const [code, setCode]       = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError('');

    try {
      const result = await validateCoupon(code.trim(), subtotal);
      if (result.valid && result.coupon && result.discount !== undefined) {
        onApply(result.discount, code.trim().toUpperCase(), result.coupon.id);
        setCode('');
      } else {
        setError(result.error ?? 'Invalid coupon');
      }
    } catch {
      setError('Failed to validate coupon. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Applied state
  if (appliedCode) {
    return (
      <div className="flex items-center justify-between bg-success/10 border border-success/30 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Check size={14} className="text-success" />
          <span className="text-sm font-medium text-success">
            {appliedCode} applied
          </span>
        </div>
        <button
          onClick={onRemove}
          className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-success/20 transition-colors"
        >
          <X size={14} className="text-success" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleApply()}
            placeholder="Coupon code"
            className={cn('input-field pl-10', error && 'input-error')}
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim() || loading}
          className="btn-outline flex-shrink-0 flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading && <Spinner size="sm" />}
          Apply
        </button>
      </div>
      {error && <p className="text-xs text-error mt-1.5 pl-1">{error}</p>}
    </div>
  );
}
