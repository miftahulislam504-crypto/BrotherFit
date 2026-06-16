import { Skeleton } from '@/components/ui';

export default function AccountLoading() {
  return (
    <div className="mt-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-36" />
        </div>
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>

      {/* Tab strip */}
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Recent orders */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
