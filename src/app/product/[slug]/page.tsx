import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug, getProductVariants } from '@/services/productService';
import { getProductReviews } from '@/services/reviewService';
import { APP_URL } from '@/lib/constants';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: 'Product Not Found' };

  const title       = `${product.name} — BrotherFit Bangladesh`;
  const description = product.description?.slice(0, 160) ??
    `Buy ${product.name} from BrotherFit. Premium quality fashion. Fast delivery across Bangladesh.`;
  const image       = product.images?.[0];
  const url         = `${APP_URL}/product/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'BrotherFit',
      images: image ? [{ url: image, alt: product.name }] : [{ url: `${APP_URL}/logo.png` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [`${APP_URL}/logo.png`],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [variants, reviews] = await Promise.all([
    getProductVariants(product.id),
    getProductReviews(product.id),
  ]);

  // Product JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? '',
    image: product.images ?? [],
    url: `${APP_URL}/product/${slug}`,
    brand: {
      '@type': 'Brand',
      name: 'BrotherFit',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: product.salePrice ?? product.basePrice,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'BrotherFit',
      },
    },
    ...(reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (
          reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / reviews.length
        ).toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteLayout>
        {/* Gallery — full bleed, header এর ঠিক নিচে */}
        <div className="w-full overflow-hidden">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Product info + actions — ProductDetailClient এ gallery নেই */}
        <ProductDetailClient product={product} variants={variants} reviews={reviews} />

        <RelatedProducts categoryId={product.categoryId} excludeId={product.id} />
      </SiteLayout>
    </>
  );
}
