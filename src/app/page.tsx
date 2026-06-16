import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import BannerSlider from '@/components/home/BannerSlider';
import CategoryRow from '@/components/home/CategoryRow';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import ProductGrid from '@/components/home/ProductGrid';
import SectionHeader from '@/components/home/SectionHeader';

import {
  getActiveBanners,
  getCategories,
  getActiveFlashSale,
  getFlashSaleProducts,
  getTrendingProducts,
  getNewArrivals,
} from '@/services/productService';

export const metadata: Metadata = {
  title: 'BrotherFit — Premium Fashion Brand',
  description: 'Shop the latest premium fashion from BrotherFit.',
};

export const revalidate = 60;

export default async function HomePage() {
  const [banners, categories, flashSale, trending, newArrivals] =
    await Promise.all([
      getActiveBanners(),
      getCategories(),
      getActiveFlashSale(),
      getTrendingProducts(6),
      getNewArrivals(6),
    ]);

  const flashSaleProducts = flashSale
    ? await getFlashSaleProducts(flashSale.productIds.slice(0, 8))
    : [];

  return (
    <SiteLayout>
      <BannerSlider banners={banners} />
      <CategoryRow categories={categories} />

      {flashSale && flashSaleProducts.length > 0 && (
        <FlashSaleSection sale={flashSale} products={flashSaleProducts} />
      )}

      <section className="mt-6">
        <SectionHeader title="Trending Now" href="/products?sort=popular" />
        <ProductGrid products={trending} />
      </section>

      <section className="mt-6 mb-4">
        <SectionHeader title="New Arrivals" href="/products?sort=newest" />
        <ProductGrid products={newArrivals} />
      </section>
    </SiteLayout>
  );
}
