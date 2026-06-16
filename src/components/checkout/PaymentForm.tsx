'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, type PaymentFormData } from '@/lib/schemas/checkout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  onBack: () => void;
  loading?: boolean;
}

const METHODS = [
  {
    id:   'cod'    as const,
    label: 'Cash on Delivery',
    sub:   'Pay when you receive your order',
    icon:  '💵',
  },
  {
    id:   'bkash'  as const,
    label: 'bKash',
    sub:   'Mobile financial service',
    icon:  '📱',
  },
  {
    id:   'nagad'  as const,
    label: 'Nagad',
    sub:   'Digital financial service',
    icon:  '📲',
  },
];

export default function PaymentForm({ onSubmit, onBack, loading }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: 'cod' },
  });

  const method = watch('method');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>

      {METHODS.map(m => (
        <label
          key={m.id}
          className={cn(
            'flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200',
            method === m.id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-accent/50'
          )}
        >
          <input
            type="radio"
            value={m.id}
            className="sr-only"
            {...register('method')}
          />
          <span className="text-2xl flex-shrink-0">{m.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text">{m.label}</p>
            <p className="text-xs text-muted">{m.sub}</p>
          </div>
          {/* Radio indicator */}
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
              method === m.id ? 'border-primary' : 'border-border'
            )}
          >
            {method === m.id && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            )}
          </div>
        </label>
      ))}

      {/* bKash instructions */}
      {method === 'bkash' && (
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 space-y-3 animate-fade-in">
          <p className="text-sm font-semibold text-pink-800">bKash Payment</p>
          <p className="text-xs text-pink-700 leading-relaxed">
            Send your payment to merchant number{' '}
            <strong className="font-mono">01XXXXXXXXX</strong>{' '}
            and enter your bKash number below.
          </p>
          <Input
            {...register('bkashNumber')}
            label="Your bKash Number"
            placeholder="01XXXXXXXXX"
            type="tel"
          />
        </div>
      )}

      {/* Nagad instructions */}
      {method === 'nagad' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3 animate-fade-in">
          <p className="text-sm font-semibold text-orange-800">Nagad Payment</p>
          <p className="text-xs text-orange-700 leading-relaxed">
            Send your payment to merchant number{' '}
            <strong className="font-mono">01XXXXXXXXX</strong>{' '}
            and enter your Nagad number below.
          </p>
          <Input
            {...register('nagadNumber')}
            label="Your Nagad Number"
            placeholder="01XXXXXXXXX"
            type="tel"
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1" disabled={loading}>
          Back
        </Button>
        <Button type="submit" className="flex-1" size="lg" loading={loading}>
          Place Order
        </Button>
      </div>
    </form>
  );
}
