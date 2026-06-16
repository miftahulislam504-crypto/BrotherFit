'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '@/lib/schemas/auth';
import { registerWithEmail } from '@/lib/firebase/auth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import GoogleButton from '@/components/auth/GoogleButton';

export default function RegisterPage() {
  const router = useRouter();
  const [showPwd,    setShowPwd]    = useState(false);
  const [showCPwd,   setShowCPwd]   = useState(false);
  const [apiError,   setApiError]   = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError('');
    try {
      await registerWithEmail(data.email, data.password, data.name);
      router.replace('/account');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/email-already-in-use') {
        setApiError('An account with this email already exists.');
      } else {
        setApiError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-3xl text-primary text-center mb-1">Create account</h1>
      <p className="text-sm text-muted text-center mb-8">Join BrotherFit today</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Full Name"
          placeholder="Your full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPwd ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPwd(v => !v)}
            className="absolute right-3 top-[38px] text-muted hover:text-text transition-colors"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showCPwd ? 'text' : 'password'}
            placeholder="Re-enter password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowCPwd(v => !v)}
            className="absolute right-3 top-[38px] text-muted hover:text-text transition-colors"
          >
            {showCPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {apiError && (
          <p className="text-xs text-error bg-error/10 rounded-xl px-4 py-3">
            {apiError}
          </p>
        )}

        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Create Account
        </Button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <GoogleButton
        onSuccess={() => router.replace('/account')}
        onError={setApiError}
      />

      <p className="text-center text-sm text-muted mt-6">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
