import Link from 'next/link';
import Image from 'next/image';
import { Shirt, ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryRowProps {
  categories: Category[];
}

export default function CategoryRow({ categories }: CategoryRowProps) {
  if (!categories.length) return null;

  return (
    <section className="mt-6">
      <div className="section-header">
        <h2 className="font-serif text-xl text-primary">Category</h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors"
        >
          See All
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="scroll-row">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="flex-none flex flex-col items-center gap-2 w-16"
          >
            {/* Circle icon */}
            <div
              className="w-14 h-14 rounded-full bg-surface border border-border
                         flex items-center justify-center
                         hover:border-accent transition-colors duration-200 shadow-soft"
            >
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <Shirt size={22} className="text-muted" />
              )}
            </div>
            <span className="text-[11px] font-medium text-text text-center leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
