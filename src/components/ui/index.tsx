import { cn } from '@/lib/utils';

// ─── Badge ────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'sale' | 'success' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'accent', className }: BadgeProps) {
  const variants = {
    accent:  'bg-accent/15 text-primary',
    sale:    'bg-primary text-white',
    success: 'bg-success/15 text-success',
    muted:   'bg-border text-muted',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Spinner ──────────────────────────────────────────────

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };

  return (
    <div
      className={cn(
        'border-2 border-border border-t-accent rounded-full animate-spin',
        sizes[size],
        className
      )}
    />
  );
}

// ─── Skeleton ─────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton', className)} />
  );
}
