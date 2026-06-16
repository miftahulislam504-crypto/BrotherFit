import { Skeleton } from '@/components/ui';

export default function AddressesLoading() {
  return (
    <div className="space-y-3 pb-6">
      <Skeleton className="h-20 rounded-2xl" />
      {[...Array(2)].map((_, i) => (
        <div key={i} className="card p-4 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-1">
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-7 h-7 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-48" />
        </div>
      ))}
    </div>
  );
}
