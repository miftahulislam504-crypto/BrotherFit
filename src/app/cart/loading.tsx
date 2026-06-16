import SiteLayout from '@/components/layout/SiteLayout';
import { Skeleton } from '@/components/ui';

export default function CartLoading() {
  return (
    <SiteLayout>
      <div className="mt-4">
        <Skeleton className="h-7 w-32 mb-4" />

        <div className="card p-4 mb-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0">
              <Skeleton className="w-20 h-24 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-9 w-28 rounded-xl" />
                  <Skeleton className="h-8 w-16 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Skeleton className="h-12 w-full rounded-xl mb-4" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </SiteLayout>
  );
}
