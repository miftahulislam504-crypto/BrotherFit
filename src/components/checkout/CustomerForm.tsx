'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type CustomerFormData } from '@/lib/schemas/checkout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface CustomerFormProps {
  defaultValues?: Partial<CustomerFormData>;
  onSubmit: (data: CustomerFormData) => void;
}

export default function CustomerForm({ defaultValues, onSubmit }: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        required
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Phone Number"
        placeholder="01XXXXXXXXX"
        type="tel"
        required
        autoComplete="tel"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Input
        label="Email Address"
        placeholder="your@email.com (optional)"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Button type="submit" fullWidth size="lg" className="mt-2">
        Continue to Delivery
      </Button>
    </form>
  );
}
