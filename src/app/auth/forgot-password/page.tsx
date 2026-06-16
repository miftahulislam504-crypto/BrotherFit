'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { auth } from '@/lib/firebase/config';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent,     setSent]     = useState(false);
  const [apiError, setApiError] = useState('');
  const [sentTo,   setSentTo]   = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email }: FormData) => {
    setApiError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSentTo(email);
      setSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/user-not-found') {
        // Don't reveal if email exists — security best practice
        setSentTo(email);
        setSent(true);
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    }
  };

  if (sent) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-success" />
        </div>
        <h1 className="font-serif text-2xl text-primary">Check your email</h1>
        <p className="text-sm text-muted mt-3 leading-relaxed">
          If an account exists for <strong className="text-text">{sentTo}</strong>,
          we've sent a password reset link. Check your inbox and spam folder.
        </p>
        <Link href="/auth/login" className="btn-primary w-full block text-center mt-8">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Link
        href="/auth/login"
        className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Back to sign in
      </Link>

      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Mail size={22} className="text-primary" />
      </div>

      <h1 className="font-serif text-2xl text-primary mb-1">Forgot password?</h1>
      <p className="text-sm text-muted mb-8">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        {apiError && (
          <p className="text-xs text-error bg-error/10 rounded-xl px-4 py-3">
            {apiError}
          </p>
        )}

        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
