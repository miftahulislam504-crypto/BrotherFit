import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteLayout from '@/components/layout/SiteLayout';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug, getProductVariants } from '@/services/productService';
import { getProductReviews } from '@/services/reviewService';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic metadata per product
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Fetch product + variants + reviews in parallel
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [variants, reviews] = await Promise.all([
    getProductVariants(product.id),
    getProductReviews(product.id),
  ]);

  return (
    <SiteLayout>
      {/* Gallery — full bleed (no horizontal padding) */}
      <ProductGallery images={product.images} productName={product.name} />

      {/* Interactive detail section */}
      <ProductDetailClient
        product={product}
        variants={variants}
        reviews={reviews}
      />

      {/* Related products */}
      <RelatedProducts
        categoryId={product.categoryId}
        excludeId={product.id}
      />
    </SiteLayout>
  );
}
