'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { cn } from '@/lib/utils';
import CategoryDrawer from './CategoryDrawer';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const pathname   = usePathname();
  const totalItems = useCartStore(s => s.totalItems());
  const wishlistCount = useWishlistStore(s => s.ids.length);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On homepage: transparent when at top, glass when scrolled
  // On other pages: always solid
  const headerBg = () => {
    if (transparent && isHome) {
      return scrolled
        ? 'bg-white/85 backdrop-blur-xl border-b border-white/40 shadow-soft'
        : 'bg-transparent border-b border-transparent';
    }
    return scrolled
      ? 'bg-white/90 backdrop-blur-xl border-b border-border/60 shadow-soft'
      : 'bg-bg/97 backdrop-blur-sm border-b border-border';
  };

  // On homepage hero (dark bg), logo text color should be white until scrolled
  const onDarkHero = transparent && isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          headerBg()
        )}
        style={{ height: 'var(--header-height)' }}
      >
        <div className="container-app h-full flex flex-col justify-center gap-2 py-2">

          {/* Row 1 — Hamburger | Logo | Icons */}
          <div className="flex items-center gap-3">

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                'w-9 h-9 flex items-center justify-center',
                'rounded-xl transition-colors duration-200 flex-shrink-0',
                onDarkHero
                  ? 'text-white hover:bg-white/10'
                  : 'text-text hover:bg-border/60'
              )}
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
                  className={cn(
                    'text-lg font-extrabold tracking-tight leading-none transition-colors duration-300',
                    onDarkHero ? 'text-accent' : 'text-accent'
                  )}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  BROTHER
                </span>
                <span
                  className={cn(
                    'text-lg font-extrabold tracking-tight leading-none transition-colors duration-300',
                    onDarkHero ? 'text-white' : 'text-primary'
                  )}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  FIT
                </span>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className={cn(
                'relative w-9 h-9 flex items-center justify-center',
                'rounded-xl transition-colors duration-200 flex-shrink-0',
                onDarkHero ? 'text-white hover:bg-white/10' : 'text-text hover:bg-border/60'
              )}
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px]
                                  bg-accent text-white text-[9px] font-bold
                                  rounded-full flex items-center justify-center px-0.5">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                'relative w-9 h-9 flex items-center justify-center',
                'rounded-xl transition-colors duration-200 flex-shrink-0',
                onDarkHero ? 'text-white hover:bg-white/10' : 'text-text hover:bg-border/60'
              )}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
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
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2 text-sm',
              'transition-colors duration-200',
              onDarkHero
                ? 'bg-white/10 border border-white/20 text-white/70 hover:border-white/40'
                : 'bg-surface border border-border text-muted hover:border-accent'
            )}
          >
            <Search size={15} className="flex-shrink-0" />
            <span className="text-sm">Search products...</span>
          </Link>

        </div>
      </header>

      {/* Category Drawer */}
      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
