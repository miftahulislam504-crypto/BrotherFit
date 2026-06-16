import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductListingClient from '@/components/products/ProductListingClient';
import { getCategories } from '@/services/productService';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    brand?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our full collection of premium fashion.',
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categories = await getCategories();

  return (
    <SiteLayout>
      <ProductListingClient
        categories={categories}
        initialCategory={params.category}
        initialSort={params.sort ?? 'newest'}
      />
    </SiteLayout>
  );
}
