'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, MessageCircle, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/',         icon: Home,          label: 'Home'     },
  { href: '/cart',     icon: ShoppingBag,   label: 'Cart'     },
  { href: '/wishlist', icon: Heart,         label: 'Wishlist' },
  { href: '/support',  icon: MessageCircle, label: 'Support'  },
  { href: '/account',  icon: User,          label: 'Account'  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore(s => s.totalItems());

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-surface/95 backdrop-blur-sm
                 border-t border-border shadow-sticky pb-safe"
      style={{ height: 'var(--bottom-nav-height)' }}
    >
      <div className="container-app h-full flex items-center justify-around">
        {tabs.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);
          const isCart = href === '/cart';

          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-1 flex-1 py-1
                         transition-colors duration-200"
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={cn(
                    'transition-colors duration-200',
                    isActive ? 'text-primary' : 'text-muted'
                  )}
                />
                {isCart && totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px]
                               bg-primary text-white text-[9px] font-medium
                               rounded-full flex items-center justify-center px-0.5"
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-muted'
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
