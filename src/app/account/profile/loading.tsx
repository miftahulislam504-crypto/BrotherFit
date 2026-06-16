import { Skeleton } from '@/components/ui';

export default function ProfileLoading() {
  return (
    <div className="pb-8 space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 py-4">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="space-y-1.5 text-center">
          <Skeleton className="h-5 w-32 mx-auto" />
          <Skeleton className="h-3 w-40 mx-auto" />
        </div>
      </div>

      {/* Form */}
      <div className="card p-4 space-y-4">
        <Skeleton className="h-5 w-40" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-12 rounded-xl" />
          </div>
        ))}
        <Skeleton className="h-12 rounded-full" />
      </div>

      {/* Account info */}
      <div className="card p-4 space-y-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
