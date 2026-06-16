import SiteLayout from '@/components/layout/SiteLayout';
import { Skeleton } from '@/components/ui';

export default function ProductLoading() {
  return (
    <SiteLayout>
      {/* Gallery skeleton */}
      <div className="-mx-4">
        <Skeleton className="aspect-[4/5] w-full rounded-none" />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-16 h-20 rounded-xl flex-none" />
        ))}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Sizes */}
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-12 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mt-5 space-y-3">
        <Skeleton className="h-4 w-28" />
        <div className="flex gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-9 h-9 rounded-full" />
          ))}
        </div>
      </div>

      {/* Sticky bar placeholder */}
      <div className="fixed bottom-[var(--bottom-nav-height)] left-0 right-0 bg-surface border-t border-border px-4 py-3">
        <div className="container-app flex gap-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="flex-1 h-12 rounded-2xl" />
        </div>
      </div>
    </SiteLayout>
  );
}
