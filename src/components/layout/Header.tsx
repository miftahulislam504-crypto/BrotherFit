'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import CategoryDrawer from './CategoryDrawer';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname   = usePathname();
  const totalItems = useCartStore(s => s.totalItems());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
          transparent && isHome
            ? 'bg-transparent'
            : 'bg-bg/97 backdrop-blur-sm border-b border-border'
        )}
        style={{ height: 'var(--header-height)' }}
      >
        <div className="container-app h-full flex flex-col justify-center gap-2 py-2">

          {/* Row 1 — Hamburger | Logo + Name | Cart */}
          <div className="flex items-center gap-3">

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-9 h-9 flex items-center justify-center
                         rounded-xl text-text hover:bg-border/60
                         transition-colors duration-200 flex-shrink-0"
              aria-label="Open categories"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>

            {/* Logo image + Brand Name */}
            <Link href="/" className="flex items-center gap-2 flex-1">
              <Image
                src="/logo.png"
                alt="BrotherFit"
                width={34}
                height={34}
                className="flex-shrink-0 object-contain"
                priority
              />
              <div className="flex items-baseline gap-0">
                <span
                  className="text-lg font-extrabold tracking-tight leading-none"
                  style={{ color: '#C89B6D', fontFamily: 'var(--font-dm-sans)' }}
                >
                  BROTHER
                </span>
                <span
                  className="text-lg font-extrabold tracking-tight leading-none"
                  style={{ color: '#2C1810', fontFamily: 'var(--font-dm-sans)' }}
                >
                  FIT
                </span>
              </div>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-9 h-9 flex items-center justify-center
                         rounded-xl hover:bg-border/60
                         transition-colors duration-200 flex-shrink-0"
            >
              <ShoppingBag size={20} strokeWidth={1.8} className="text-text" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[17px] h-[17px]
                             bg-primary text-white text-[9px] font-bold
                             rounded-full flex items-center justify-center px-0.5"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

          </div>

          {/* Row 2 — Search bar */}
          <Link
            href="/search"
            className="flex items-center gap-2 bg-surface border border-border
                       rounded-xl px-4 py-2 text-muted text-sm
                       hover:border-accent transition-colors duration-200"
          >
            <Search size={15} className="text-muted flex-shrink-0" />
            <span className="text-muted text-sm">Search products...</span>
          </Link>

        </div>
      </header>

      {/* Category Drawer */}
      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
