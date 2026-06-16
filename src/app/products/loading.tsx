import SiteLayout from '@/components/layout/SiteLayout';
import { Skeleton } from '@/components/ui';

export default function ProductsLoading() {
  return (
    <SiteLayout>
      {/* Header bar skeleton */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}
