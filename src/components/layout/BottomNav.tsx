'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, Trophy, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const tabs = [
  { href: '/',        icon: Home,         label: 'Home'     },
  { href: '/cart',    icon: ShoppingBag,  label: 'Cart'     },
  { href: '/wishlist',icon: Heart,        label: 'Wishlist' },
  { href: '/club',    icon: Trophy,       label: 'Club'     },
  { href: '/account', icon: User,         label: 'Account'  },
];

export default function BottomNav() {
  const pathname   = usePathname();
  const totalItems = useCartStore(s => s.totalItems());
  const [tapped, setTapped] = useState<string | null>(null);

  const handleTap = (href: string) => {
    setTapped(href);
    setTimeout(() => setTapped(null), 300);
  };

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
    >
      <nav
        className="pointer-events-auto w-full max-w-md h-16
                   border border-border/70 shadow-card rounded-full overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="h-full flex items-center justify-around px-2">
          {tabs.map(({ href, icon: Icon, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
            const isCart   = href === '/cart';
            const isTapped = tapped === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => handleTap(href)}
                className="relative flex flex-col items-center gap-1 flex-1 py-1"
                style={{ cursor: 'none' }}
              >
                {/* Active pill background */}
                {isActive && (
                  <span
                    className="absolute -inset-x-2 -inset-y-1 rounded-full"
                    style={{
                      background: 'rgba(44,24,16,0.06)',
                      animation: 'fade-in 0.2s ease-out',
                    }}
                  />
                )}

                <div
                  className="relative"
                  style={{
                    transform: isTapped
                      ? 'scale(0.82)'
                      : isActive
                      ? 'scale(1.08)'
                      : 'scale(1)',
                    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                >
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    data-cart-icon={isCart ? '' : undefined}
                    className={cn(
                      'transition-colors duration-200',
                      isActive ? 'text-primary' : 'text-muted'
                    )}
                  />
                  {isCart && totalItems > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px]
                                 bg-primary text-white text-[9px] font-medium
                                 rounded-full flex items-center justify-center px-0.5
                                 animate-scale-in"
                    >
                      {totalItems}
                    </span>
                  )}
                </div>

                <span
                  className={cn(
                    'text-[10px] font-medium transition-all duration-200',
                    isActive ? 'text-primary' : 'text-muted',
                    isTapped && 'scale-90'
                  )}
                  style={{ transform: isTapped ? 'scale(0.9)' : 'scale(1)' }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
