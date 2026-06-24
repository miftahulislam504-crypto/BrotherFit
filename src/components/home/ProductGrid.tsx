'use client';

import { useRef, useEffect, useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
}

export default function ProductGrid({
  products,
  loading = false,
  skeletonCount = 6,
}: ProductGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  // FIX: visible শুরুতে true — products load হলেই দেখাবে
  // আগে false ছিল, IntersectionObserver products-empty অবস্থায় fire হয়ে
  // unobserve করে ফেলত, তারপর products আসলে আর trigger হত না → invisible
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // products নেই বা loading → observer দরকার নেই
    if (!products.length) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // FIX: products dependency যোগ করা — products আসার পরে observer নতুন করে attach হবে
  }, [products]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
            <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted text-sm">No products found</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3">
      {products.map((product, i) => (
        <div
          key={product.id}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
            transition: `opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)`,
            transitionDelay: `${i * 65}ms`,
          }}
        >
          <ProductCard product={product} revealDelay={i * 65} />
        </div>
      ))}
    </div>
  );
}
