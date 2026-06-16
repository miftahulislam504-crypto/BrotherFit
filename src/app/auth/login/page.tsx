'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth';
import { loginWithEmail } from '@/lib/firebase/auth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import GoogleButton from '@/components/auth/GoogleButton';

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirect     = searchParams.get('redirect') ?? '/account';

  const [showPwd,  setShowPwd]  = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError('');
    try {
      await loginWithEmail(data.email, data.password);
      router.replace(redirect);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setApiError('Incorrect email or password.');
      } else {
        setApiError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-3xl text-primary text-center mb-1">Welcome back</h1>
      <p className="text-sm text-muted text-center mb-8">Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
            placeholder="Enter your password"
            autoComplete="current-password"
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

        <div className="flex justify-end">
          <Link href="/auth/forgot-password" className="text-xs text-muted hover:text-primary transition-colors">
            Forgot password?
          </Link>
        </div>

        {apiError && (
          <p className="text-xs text-error bg-error/10 rounded-xl px-4 py-3">
            {apiError}
          </p>
        )}

        <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <GoogleButton
        onSuccess={() => router.replace(redirect)}
        onError={setApiError}
      />

      <p className="text-center text-sm text-muted mt-6">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
