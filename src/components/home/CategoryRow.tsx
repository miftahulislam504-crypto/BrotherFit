import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shirt, Tag, Package, Star, Layers, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

interface CategoryRowProps {
  categories: Category[];
  activeSlug?: string; // current ?category= from searchParams
}

// Lucide fallback icons — cycles by index
const ICONS = [Shirt, Tag, Package, Star, Layers, Zap];

export default function CategoryRow({ categories, activeSlug }: CategoryRowProps) {
  if (!categories.length) return null;

  return (
    <section className="mt-6">
      {/* Header */}
      <div className="section-header">
        <h2 className="font-serif text-xl text-primary">Category</h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs text-muted
                     hover:text-primary transition-colors duration-200"
        >
          See All
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Horizontal scroll row */}
      <div className="scroll-row pb-1">
        {categories.map((cat, i) => {
          const Icon = ICONS[i % ICONS.length];
          const isActive = activeSlug === cat.slug;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="flex-none flex flex-col items-center gap-2"
              style={{ width: '64px' }}
            >
              {/* Circle */}
              <div
                className={cn(
                  'w-[52px] h-[52px] rounded-full flex items-center justify-center',
                  'transition-all duration-200',
                  'shadow-soft border',
                  isActive
                    ? 'bg-primary border-primary'
                    : 'bg-surface border-border hover:border-accent'
                )}
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={28}
                    height={28}
                    className={cn(
                      'object-contain transition-opacity',
                      isActive && 'brightness-0 invert'
                    )}
                  />
                ) : (
                  <Icon
                    size={20}
                    strokeWidth={1.7}
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-white' : 'text-muted'
                    )}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] font-medium text-center leading-tight truncate w-full text-center',
                  isActive ? 'text-primary' : 'text-text'
                )}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
