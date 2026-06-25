'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  X,
  Shirt,
  Tag,
  Sparkles,
  Flame,
  Star,
  Package,
  ChevronRight,
  LayoutGrid,
  MessageCircle,
} from 'lucide-react';
import { getCategories } from '@/services/productService';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FALLBACK_ICONS = [Shirt, Tag, Package, Star, Flame, Sparkles, LayoutGrid];

// FIX: cat.icon valid emoji কিনা check করার helper
// Firestore এ icon field এ garbage string থাকলে সেটা দেখাবে না
function isValidEmoji(str: string): boolean {
  if (!str || str.length > 8) return false; // emoji max ~4 chars (with skin tone ~8)
  // emoji Unicode range check — basic emoji ও supplementary symbols
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u;
  return emojiRegex.test(str);
}

export default function CategoryDrawer({ open, onClose }: CategoryDrawerProps) {
  const pathname       = usePathname();
  const searchParams   = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );
  useEffect(() => {
    if (!open) return;
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const allActive    = pathname === '/products' && !activeCategory;
  const supportActive = pathname === '/support';

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]',
          'transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* ── Drawer panel ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Categories"
        className={cn(
          'fixed top-0 left-0 bottom-0 z-[70] w-72',
          'bg-surface flex flex-col shadow-xl',
          'transition-transform duration-300 ease-out will-change-transform',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div>
            <p className="text-[10px] font-medium text-muted uppercase tracking-widest mb-0.5">
              Browse
            </p>
            <h2 className="font-serif text-xl text-primary leading-tight">
              Categories
            </h2>
          </div>
          <button
            onClick={onClose}
            className={cn(
              'w-8 h-8 flex items-center justify-center',
              'rounded-xl hover:bg-border/60 transition-colors duration-200'
            )}
            aria-label="Close menu"
          >
            <X size={18} className="text-text" />
          </button>
        </div>

        {/* ── All Products link ── */}
        <Link
          href="/products"
          onClick={onClose}
          className={cn(
            'flex items-center gap-3 px-5 py-3.5',
            'border-b border-border transition-colors duration-150',
            allActive ? 'bg-accent/10' : 'hover:bg-border/30'
          )}
        >
          <div className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
            allActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
          )}>
            <LayoutGrid size={16} />
          </div>
          <span className={cn('flex-1 text-sm font-medium', allActive ? 'text-primary' : 'text-text')}>
            All Products
          </span>
          {allActive && <ChevronRight size={14} className="text-primary flex-shrink-0" />}
        </Link>

        {/* ── Category list ── */}
        <div className="flex-1 overflow-y-auto py-2">
          {loading ? (
            <div className="px-5 py-2 space-y-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="w-9 h-9 rounded-full skeleton flex-shrink-0" />
                  <div className="h-3.5 rounded-full skeleton flex-1" />
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Package size={28} className="text-muted mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted">No categories yet</p>
            </div>
          ) : (
            categories.map((cat, i) => {
              const Icon     = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
              const isActive = pathname === '/products' && activeCategory === cat.slug;

              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  onClick={onClose}
                  style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
                  className={cn(
                    'flex items-center gap-3 px-5 py-3',
                    'transition-colors duration-150',
                    isActive ? 'bg-accent/10' : 'hover:bg-border/30'
                  )}
                >
                  <div className={cn(
                   'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
                    isActive ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                  )}>
                    {cat.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : cat.icon && isValidEmoji(cat.icon) ? (
                      // FIX: isValidEmoji() দিয়ে check করা হচ্ছে
                      // আগে যেকোনো string render হত, এখন শুধু valid emoji দেখাবে
                      <span className="text-base leading-none">{cat.icon}</span>
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>
                  <span className={cn('flex-1 text-sm font-medium truncate', isActive ? 'text-primary' : 'text-text')}>
                    {cat.name}
                  </span>
                  {isActive && <ChevronRight size={14} className="text-accent flex-shrink-0" />}
                </Link>
              );
            })
          )}

          {/* ── Divider ── */}
          <div className="mx-5 my-3" style={{ height: '1px', background: '#EDE8E1' }} />

          {/* ── Support link ── */}
          <Link
            href="/support"
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-5 py-3',
              'transition-colors duration-150',
              supportActive ? 'bg-accent/10' : 'hover:bg-border/30'
            )}
          >
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
              supportActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
            )}>
              <MessageCircle size={16} />
            </div>
            <span className={cn('flex-1 text-sm font-medium', supportActive ? 'text-primary' : 'text-text')}>
              Support
            </span>
            {supportActive
              ? <ChevronRight size={14} className="text-primary flex-shrink-0" />
              : <ChevronRight size={14} className="text-muted flex-shrink-0 opacity-40" />
            }
          </Link>
        </div>

        {/* ── Footer brand ── */}
        <div className="px-5 py-4 border-t border-border flex-shrink-0">
          <div className="flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="BrotherFit" width={20} height={20} className="object-contain" />
            <p className="text-xs text-muted tracking-wide">
              <span className="font-bold" style={{ color: '#C89B6D' }}>BROTHER</span>
              <span className="font-bold text-primary">FIT</span>
              {' '}· Fashion Brand
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
