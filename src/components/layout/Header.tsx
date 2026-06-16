'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import CategoryDrawer from './CategoryDrawer';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname = usePathname();
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

          {/* Row 1 — Hamburger | Logo | Cart */}
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

            {/* Logo + Brand Name */}
            <Link href="/" className="flex items-center gap-2 flex-1">
              {/* Hanger SVG — logo থেকে নেওয়া simplified version */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                {/* Hook */}
                <path
                  d="M50 8 C50 8 58 8 58 16 C58 22 52 24 50 24"
                  stroke="#1A1A1A"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Hanger body */}
                <path
                  d="M50 24 L14 68 C10 72 10 78 14 82 L86 82 C90 78 90 72 86 68 L50 24Z"
                  stroke="#1A1A1A"
                  strokeWidth="6"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Bottom bar */}
                <line
                  x1="22"
                  y1="82"
                  x2="78"
                  y2="82"
                  stroke="#1A1A1A"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>

              {/* Brand text */}
              <div className="flex items-baseline gap-0">
                <span
                  className="text-lg font-extrabold tracking-tight leading-none"
                  style={{ color: '#C89B6D', fontFamily: 'var(--font-dm-sans)' }}
                >
                  BROTHER
                </span>
                <span
                  className="text-lg font-extrabold tracking-tight leading-none"
                  style={{ color: '#1A1A1A', fontFamily: 'var(--font-dm-sans)' }}
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
