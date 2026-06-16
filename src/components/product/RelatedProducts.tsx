import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { getRelatedProducts } from '@/services/productService';

interface RelatedProductsProps {
  categoryId: string;
  excludeId: string;
}

export default async function RelatedProducts({
  categoryId,
  excludeId,
}: RelatedProductsProps) {
  const products = await getRelatedProducts(categoryId, excludeId, 4);

  if (!products.length) return null;

  return (
    <section className="mt-8 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-primary">You May Also Like</h2>
        <Link
          href={`/products?category=${categoryId}`}
          className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors"
        >
          See All <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
