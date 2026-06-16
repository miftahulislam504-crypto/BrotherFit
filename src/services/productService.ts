import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Product, ProductVariant, Category, Brand, Banner, FlashSale } from '@/types';

// ─── Categories ───────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const q = query(
    collection(db, 'categories'),
    where('isActive', '==', true),
    orderBy('order', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
}

// ─── Banners ──────────────────────────────────────────────

export async function getActiveBanners(): Promise<Banner[]> {
  const q = query(
    collection(db, 'banners'),
    where('isActive', '==', true),
    orderBy('order', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Banner));
}

// ─── Flash Sale ───────────────────────────────────────────

export async function getActiveFlashSale(): Promise<FlashSale | null> {
  const now = new Date();
  const q = query(
    collection(db, 'flashSales'),
    where('isActive', '==', true),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as FlashSale;
}

// ─── Products ─────────────────────────────────────────────

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('isActive', '==', true),
    where('isFeatured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getTrendingProducts(count = 6): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('isActive', '==', true),
    orderBy('salesCount', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

export async function getNewArrivals(count = 8): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
}

// ─── Paginated product list ───────────────────────────────

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'popular';

export interface ProductFilter {
  categoryId?: string;
  sortBy?: SortOption;
  pageSize?: number;
  lastDoc?: DocumentSnapshot;
}

export interface ProductPage {
  products: Product[];
  lastDoc: DocumentSnapshot | null;
  hasMore: boolean;
}

export async function getProducts(filter: ProductFilter = {}): Promise<ProductPage> {
  const { categoryId, sortBy = 'newest', pageSize = 12, lastDoc } = filter;

  const constraints: QueryConstraint[] = [where('isActive', '==', true)];

  if (categoryId) constraints.push(where('categoryId', '==', categoryId));

  switch (sortBy) {
    case 'newest':       constraints.push(orderBy('createdAt', 'desc')); break;
    case 'price_asc':    constraints.push(orderBy('salePrice', 'asc'));  break;
    case 'price_desc':   constraints.push(orderBy('salePrice', 'desc')); break;
    case 'popular':      constraints.push(orderBy('salesCount', 'desc')); break;
  }

  constraints.push(limit(pageSize + 1));
  if (lastDoc) constraints.push(startAfter(lastDoc));

  const snap = await getDocs(query(collection(db, 'products'), ...constraints));
  const hasMore = snap.docs.length > pageSize;
  const docs = hasMore ? snap.docs.slice(0, pageSize) : snap.docs;

  return {
    products: docs.map(d => ({ id: d.id, ...d.data() } as Product)),
    lastDoc: docs[docs.length - 1] ?? null,
    hasMore,
  };
}

// ─── Single product ───────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(
    collection(db, 'products'),
    where('slug', '==', slug),
    where('isActive', '==', true),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, 'products', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

// ─── Variants ─────────────────────────────────────────────

export async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  const q = query(
    collection(db, 'productVariants'),
    where('productId', '==', productId)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ProductVariant));
}

// ─── Related products ─────────────────────────────────────

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  count = 4
): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('categoryId', '==', categoryId),
    where('isActive', '==', true),
    orderBy('salesCount', 'desc'),
    limit(count + 1)
  );
  const snap = await getDocs(q);
  return snap.docs
    .filter(d => d.id !== excludeId)
    .slice(0, count)
    .map(d => ({ id: d.id, ...d.data() } as Product));
}

// ─── Flash sale products ──────────────────────────────────

export async function getFlashSaleProducts(productIds: string[]): Promise<Product[]> {
  if (!productIds.length) return [];
  const promises = productIds.map(id => getProductById(id));
  const results = await Promise.all(promises);
  return results.filter(Boolean) as Product[];
}
