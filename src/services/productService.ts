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
import { convertTimestamps } from '@/lib/firebase/converter';
import type { Product, ProductVariant, Category, Banner, FlashSale } from '@/types';

function fromDoc<T>(snap: DocumentSnapshot): T {
  return convertTimestamps<T>({ id: snap.id, ...snap.data() });
}

export async function getCategories(): Promise<Category[]> {
  try {
    const q = query(collection(db,'categories'), where('isActive','==',true), orderBy('order','asc'));
    return (await getDocs(q)).docs.map(d => fromDoc<Category>(d));
  } catch { return []; }
}

export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const q = query(collection(db,'banners'), where('isActive','==',true), orderBy('order','asc'));
    return (await getDocs(q)).docs.map(d => fromDoc<Banner>(d));
  } catch { return []; }
}

export async function getActiveFlashSale(): Promise<FlashSale | null> {
  try {
    const q = query(collection(db,'flashSales'), where('isActive','==',true), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) return fromDoc<FlashSale>(snap.docs[0]);
    return null;
  } catch { return null; }
}

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  try {
    const q = query(collection(db,'products'), where('isActive','==',true), where('isFeatured','==',true), orderBy('createdAt','desc'), limit(count));
    return (await getDocs(q)).docs.map(d => fromDoc<Product>(d));
  } catch { return []; }
}

export async function getTrendingProducts(count = 6): Promise<Product[]> {
  try {
    const q = query(collection(db,'products'), where('isActive','==',true), orderBy('salesCount','desc'), limit(count));
    return (await getDocs(q)).docs.map(d => fromDoc<Product>(d));
  } catch { return []; }
}

export async function getNewArrivals(count = 8): Promise<Product[]> {
  try {
    const q = query(collection(db,'products'), where('isActive','==',true), orderBy('createdAt','desc'), limit(count));
    return (await getDocs(q)).docs.map(d => fromDoc<Product>(d));
  } catch { return []; }
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'popular';
export interface ProductFilter { categoryId?: string; sortBy?: SortOption; pageSize?: number; lastDoc?: DocumentSnapshot; }
export interface ProductPage { products: Product[]; lastDoc: DocumentSnapshot | null; hasMore: boolean; }

export async function getProducts(filter: ProductFilter = {}): Promise<ProductPage> {
  try {
    const { categoryId, sortBy = 'newest', pageSize = 12, lastDoc } = filter;
    const c: QueryConstraint[] = [where('isActive','==',true)];
    if (categoryId) c.push(where('categoryId','==',categoryId));
    switch (sortBy) {
      case 'newest':     c.push(orderBy('createdAt','desc'));  break;
      case 'price_asc':  c.push(orderBy('salePrice','asc'));   break;
      case 'price_desc': c.push(orderBy('salePrice','desc'));  break;
      case 'popular':    c.push(orderBy('salesCount','desc')); break;
    }
    c.push(limit(pageSize + 1));
    if (lastDoc) c.push(startAfter(lastDoc));
    const snap = await getDocs(query(collection(db,'products'), ...c));
    const hasMore = snap.docs.length > pageSize;
    const docs = hasMore ? snap.docs.slice(0,pageSize) : snap.docs;
    return { products: docs.map(d => fromDoc<Product>(d)), lastDoc: docs[docs.length-1] ?? null, hasMore };
  } catch { return { products: [], lastDoc: null, hasMore: false }; }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const q = query(collection(db,'products'), where('slug','==',slug), where('isActive','==',true), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) return fromDoc<Product>(snap.docs[0]);
    return null;
  } catch { return null; }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db,'products',id));
    return snap.exists() ? fromDoc<Product>(snap) : null;
  } catch { return null; }
}

export async function getProductVariants(productId: string): Promise<ProductVariant[]> {
  try {
    const q = query(collection(db,'productVariants'), where('productId','==',productId));
    return (await getDocs(q)).docs.map(d => fromDoc<ProductVariant>(d));
  } catch { return []; }
}

export async function getRelatedProducts(categoryId: string, excludeId: string, count = 4): Promise<Product[]> {
  try {
    const q = query(collection(db,'products'), where('categoryId','==',categoryId), where('isActive','==',true), orderBy('salesCount','desc'), limit(count+1));
    return (await getDocs(q)).docs.filter(d => d.id !== excludeId).slice(0,count).map(d => fromDoc<Product>(d));
  } catch { return []; }
}

export async function getFlashSaleProducts(ids: string[]): Promise<Product[]> {
  if (!ids.length) return [];
  try {
    return (await Promise.all(ids.map(getProductById))).filter(Boolean) as Product[];
  } catch { return []; }
}
