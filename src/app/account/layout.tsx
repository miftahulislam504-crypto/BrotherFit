'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  User,
  LogOut,
} from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import SiteLayout from '@/components/layout/SiteLayout';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/lib/firebase/auth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const NAV = [
  { href: '/account',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/orders',    label: 'Orders',    icon: ShoppingBag     },
  { href: '/account/wishlist',  label: 'Wishlist',  icon: Heart            },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin           },
  { href: '/account/profile',   label: 'Profile',   icon: User             },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    router.replace('/');
  };

  return (
    <AuthGuard>
      <SiteLayout>
        <div className="mt-4 pb-safe">

          {/* User greeting */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-muted">Signed in as</p>
              <h1 className="font-serif text-xl text-primary">
                {user?.displayName ?? 'My Account'}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-error transition-colors py-2 px-3 rounded-xl hover:bg-error/10"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>

          {/* Horizontal tab nav */}
          <div className="scroll-row mb-5 gap-1.5">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active =
                href === '/account'
                  ? pathname === '/account'
                  : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex-none flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200',
                    active
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border text-muted hover:border-accent hover:text-text'
                  )}
                >
                  <Icon size={13} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Page content */}
          {children}

        </div>
      </SiteLayout>
    </AuthGuard>
  );
}
