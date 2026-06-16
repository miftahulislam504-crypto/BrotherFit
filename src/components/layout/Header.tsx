'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, SlidersHorizontal, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();
  const totalItems = useCartStore(s => s.totalItems());

  const isHome = pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        transparent && isHome ? 'bg-transparent' : 'bg-bg/95 backdrop-blur-sm border-b border-border'
      )}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container-app h-full flex items-center gap-3">

        {/* Search bar */}
        <Link
          href="/search"
          className="flex-1 flex items-center gap-2 bg-surface border border-border
                     rounded-xl px-4 py-2.5 text-muted text-sm
                     hover:border-accent transition-colors duration-200"
        >
          <Search size={16} className="text-muted flex-shrink-0" />
          <span className="text-muted">Search products...</span>
        </Link>

        {/* Filter icon — only on listing pages */}
        {pathname.startsWith('/products') && (
          <button
            className="w-10 h-10 flex items-center justify-center
                       bg-surface border border-border rounded-xl
                       hover:border-accent transition-colors duration-200"
          >
            <SlidersHorizontal size={18} className="text-text" />
          </button>
        )}

        {/* Cart */}
        <Link
          href="/cart"
          className="relative w-10 h-10 flex items-center justify-center
                     bg-surface border border-border rounded-xl
                     hover:border-accent transition-colors duration-200"
        >
          <ShoppingBag size={18} className="text-text" />
          {totalItems > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px]
                         bg-primary text-white text-[10px] font-medium
                         rounded-full flex items-center justify-center px-1"
            >
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>

      </div>
    </header>
  );
}
