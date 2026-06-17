import type { Metadata } from 'next';
import SiteLayout from '@/components/layout/SiteLayout';
import BannerSlider from '@/components/home/BannerSlider';
import CategoryRow from '@/components/home/CategoryRow';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import ProductGrid from '@/components/home/ProductGrid';
import SectionHeader from '@/components/home/SectionHeader';
import { APP_URL } from '@/lib/constants';

import {
  getActiveBanners,
  getCategories,
  getActiveFlashSale,
  getFlashSaleProducts,
  getTrendingProducts,
  getNewArrivals,
} from '@/services/productService';

export const metadata: Metadata = {
  title: 'BrotherFit — Premium Fashion Brand in Bangladesh',
  description:
    'BrotherFit is Bangladesh\'s premium fashion brand. Shop men\'s clothing, t-shirts, shirts, pants, and more. Fast delivery across Bangladesh. Cash on delivery available.',
  keywords: [
    'BrotherFit', 'fashion Bangladesh', 'men clothing Bangladesh',
    'online shop Bangladesh', 'premium fashion', 't-shirt Bangladesh',
    'shirt pant Bangladesh', 'ক্যাজুয়াল পোশাক', 'বাংলাদেশ ফ্যাশন',
  ],
  alternates: { canonical: APP_URL },
  openGraph: {
    type: 'website',
    url: APP_URL,
    title: 'BrotherFit — Premium Fashion Brand in Bangladesh',
    description:
      'Shop premium men\'s fashion at BrotherFit. Fast delivery across Bangladesh. Cash on delivery available.',
    siteName: 'BrotherFit',
    images: [{ url: `${APP_URL}/logo.png`, width: 874, height: 874, alt: 'BrotherFit Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrotherFit — Premium Fashion Brand in Bangladesh',
    description: 'Shop premium men\'s fashion at BrotherFit. Fast delivery across Bangladesh.',
    images: [`${APP_URL}/logo.png`],
  },
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

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${APP_URL}/#organization`,
        name: 'BrotherFit',
        url: APP_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${APP_URL}/logo.png`,
        },
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${APP_URL}/#website`,
        url: APP_URL,
        name: 'BrotherFit',
        publisher: { '@id': `${APP_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${APP_URL}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Store',
        '@id': `${APP_URL}/#store`,
        name: 'BrotherFit',
        url: APP_URL,
        image: `${APP_URL}/logo.png`,
        description: 'Premium fashion brand in Bangladesh offering men\'s clothing.',
        priceRange: '৳৳',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash, bKash, Nagad',
        areaServed: 'Bangladesh',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
