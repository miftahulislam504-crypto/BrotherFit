'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mb-4">
        <AlertTriangle size={28} className="text-error" />
      </div>

      <h1 className="font-serif text-2xl text-primary">Something went wrong</h1>
      <p className="text-sm text-muted mt-2 max-w-xs leading-relaxed">
        An unexpected error occurred. Please try again or go back to the home page.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <p className="text-xs font-mono text-error/70 mt-3 bg-error/5 px-3 py-2 rounded-lg max-w-xs break-all">
          {error.message}
        </p>
      )}

      <div className="flex flex-col gap-3 w-full max-w-xs mt-6">
        <button
          onClick={reset}
          className="btn-primary w-full"
        >
          Try Again
        </button>
        <Link href="/" className="btn-outline w-full block text-center">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
