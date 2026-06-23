import SiteLayout from '@/components/layout/SiteLayout';
import { Skeleton } from '@/components/ui';

export default function CheckoutLoading() {
  return (
    <SiteLayout>
      <div className="mt-4 space-y-4">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    </SiteLayout>
  );
}
