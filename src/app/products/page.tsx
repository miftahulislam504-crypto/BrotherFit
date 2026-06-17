import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductListingClient from '@/components/products/ProductListingClient';
import { getCategories } from '@/services/productService';
import { APP_URL } from '@/lib/constants';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    brand?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;

  const title = category
    ? `${category} — BrotherFit`
    : 'All Products — BrotherFit Bangladesh';
  const description = category
    ? `Shop the best ${category} collection at BrotherFit. Premium quality, fast delivery across Bangladesh.`
    : 'Browse BrotherFit\'s full collection of premium men\'s fashion. T-shirts, shirts, pants and more. Fast delivery across Bangladesh.';

  return {
    title,
    description,
    alternates: {
      canonical: category
        ? `${APP_URL}/products?category=${encodeURIComponent(category)}`
        : `${APP_URL}/products`,
    },
    openGraph: {
      title,
      description,
      url: `${APP_URL}/products`,
      images: [{ url: `${APP_URL}/logo.png` }],
    },
  };
}

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
