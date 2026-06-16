import type { MetadataRoute } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { APP_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = APP_URL;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,              lastModified: new Date(), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: 'daily',  priority: 0.9 },
    { url: `${base}/support`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Product routes
  try {
    const snap = await getDocs(
      query(collection(db, 'products'), where('isActive', '==', true))
    );
    const productRoutes: MetadataRoute.Sitemap = snap.docs.map(d => ({
      url:              `${base}/product/${d.data().slug}`,
      lastModified:     new Date(),
      changeFrequency:  'weekly' as const,
      priority:         0.8,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
