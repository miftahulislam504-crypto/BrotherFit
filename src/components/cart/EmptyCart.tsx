import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-border/60 flex items-center justify-center mb-4">
        <ShoppingBag size={32} className="text-muted" />
      </div>
      <h2 className="font-serif text-2xl text-primary">Cart is empty</h2>
      <p className="text-sm text-muted mt-2 max-w-xs">
        You haven't added anything yet. Start shopping to fill it up.
      </p>
      <Link href="/products" className="btn-primary mt-6">
        Browse Products
      </Link>
    </div>
  );
}
