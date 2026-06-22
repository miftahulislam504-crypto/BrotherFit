'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shirt, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { Category } from '@/types';

interface CategoryRowProps {
  categories: Category[];
}

export default function CategoryRow({ categories }: CategoryRowProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  if (!categories.length) return null;

  return (
    <section className="mt-6" ref={ref}>
      {/* Header */}
      <div
        className="section-header"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-16px)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        <h2 className="font-serif text-xl text-primary">Category</h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs text-muted hover:text-primary
                     transition-colors duration-200 group"
          data-cursor="View"
          style={{ cursor: 'none' }}
        >
          See All
          <ArrowRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Scroll row with staggered circles */}
      <div className="scroll-row">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="flex-none flex flex-col items-center gap-2 w-16 group"
            data-cursor="View"
            style={{
              cursor: 'none',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)',
              transition: `opacity 0.45s ease-out, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)`,
              transitionDelay: `${i * 55}ms`,
            }}
          >
            {/* Circle */}
            <div
              className="w-14 h-14 rounded-full bg-surface border border-border
                         flex items-center justify-center shadow-soft
                         group-hover:border-accent group-hover:shadow-[0_4px_16px_rgba(200,155,109,0.2)]
                         group-hover:scale-110"
              style={{
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              ) : (
                <Shirt size={22} className="text-muted group-hover:text-primary transition-colors duration-200" />
              )}
            </div>
            <span className="text-[11px] font-medium text-text text-center leading-tight
                             group-hover:text-primary transition-colors duration-200">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
