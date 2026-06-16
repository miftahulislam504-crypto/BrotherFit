import { Skeleton } from '@/components/ui';

export default function WishlistLoading() {
  return (
    <div className="pb-6">
      <Skeleton className="h-7 w-28 mb-5" />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[3/4] rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-8 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
