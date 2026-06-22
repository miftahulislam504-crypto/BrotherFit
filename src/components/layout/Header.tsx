'use client';

import { useState, useEffect, useRef } from 'react';
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
  const pathname      = usePathname();
  const totalItems    = useCartStore(s => s.totalItems());
  const wishlistCount = useWishlistStore(s => s.ids.length);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const prevScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide on fast scroll down, show on scroll up
      if (y > prevScrollY.current + 12 && y > 120) {
        setHidden(true);
      } else if (y < prevScrollY.current - 8) {
        setHidden(false);
      }
      prevScrollY.current = y;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onDarkHero = transparent && isHome && !scrolled;

  const headerBg = () => {
    if (transparent && isHome) {
      return scrolled
        ? 'bg-white/80 backdrop-blur-2xl border-b border-white/30 shadow-[0_4px_24px_rgba(44,24,16,0.08)]'
        : 'bg-transparent border-b border-transparent';
    }
    return scrolled
      ? 'bg-white/85 backdrop-blur-2xl border-b border-border/40 shadow-[0_2px_16px_rgba(44,24,16,0.06)]'
      : 'bg-bg/97 backdrop-blur-sm border-b border-border';
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          headerBg(),
          hidden ? '-translate-y-full' : 'translate-y-0',
        )}
        style={{
          height: 'var(--header-height)',
          transition: 'background 0.35s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div className="container-app h-full flex flex-col justify-center gap-2 py-2">

          {/* Row 1 — Hamburger | Logo | Icons */}
          <div className="flex items-center gap-3">

            {/* Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                'w-9 h-9 flex items-center justify-center',
                'rounded-xl transition-all duration-200 flex-shrink-0',
                'hover:scale-110 active:scale-95',
                onDarkHero
                  ? 'text-white hover:bg-white/10'
                  : 'text-text hover:bg-border/60'
              )}
              aria-label="Open categories"
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-1 group"
              style={{ cursor: 'none' }}
              data-cursor="Home"
            >
              <div
                className="flex-shrink-0 relative w-[34px] h-[34px]"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'scale(1)' : 'scale(0.7)',
                  transition: 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                  transitionDelay: '0.1s',
                }}
              >
                <Image
                  src="/logo.png"
                  alt="BrotherFit"
                  width={34}
                  height={34}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>

              <div
                className="flex items-baseline gap-0 overflow-hidden"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.6s ease-out 0.25s, transform 0.6s ease-out 0.25s',
                }}
              >
                <span
                  className={cn(
                    'text-lg font-extrabold tracking-tight leading-none',
                    'transition-colors duration-300',
                    onDarkHero ? 'text-accent' : 'text-accent'
                  )}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  BROTHER
                </span>
                <span
                  className={cn(
                    'text-lg font-extrabold tracking-tight leading-none',
                    'transition-colors duration-300',
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
                'rounded-xl transition-all duration-200 flex-shrink-0',
                'hover:scale-110 active:scale-90',
                onDarkHero ? 'text-white hover:bg-white/10' : 'text-text hover:bg-border/60'
              )}
              aria-label="Wishlist"
              data-cursor="Wishlist"
              style={{ cursor: 'none' }}
            >
              <Heart size={19} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px]
                                  bg-accent text-white text-[9px] font-bold
                                  rounded-full flex items-center justify-center px-0.5
                                  animate-scale-in">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={cn(
                'relative w-9 h-9 flex items-center justify-center',
                'rounded-xl transition-all duration-200 flex-shrink-0',
                'hover:scale-110 active:scale-90',
                onDarkHero ? 'text-white hover:bg-white/10' : 'text-text hover:bg-border/60'
              )}
              data-cart-icon
              data-cursor="Cart"
              style={{ cursor: 'none' }}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[17px] h-[17px]
                             bg-primary text-white text-[9px] font-bold
                             rounded-full flex items-center justify-center px-0.5
                             animate-scale-in"
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
              'flex items-center gap-2 rounded-xl px-4 py-2 text-sm group',
              'transition-all duration-300',
              onDarkHero
                ? 'bg-white/10 border border-white/20 text-white/70 hover:border-white/50 hover:bg-white/15'
                : 'bg-surface border border-border text-muted hover:border-accent hover:shadow-[0_0_0_3px_rgba(200,155,109,0.1)]'
            )}
            data-cursor="Search"
            style={{ cursor: 'none' }}
          >
            <Search
              size={15}
              className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm">Search products...</span>
          </Link>

        </div>
      </header>

      <CategoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
