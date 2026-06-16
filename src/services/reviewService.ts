import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Review } from '@/types';

export async function getProductReviews(
  productId: string,
  count = 20
): Promise<Review[]> {
  const q = query(
    collection(db, 'reviews'),
    where('productId', '==', productId),
    where('isApproved', '==', true),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Review));
}

export async function submitReview(
  productId: string,
  userId: string,
  userName: string,
  rating: number,
  comment: string
): Promise<void> {
  await addDoc(collection(db, 'reviews'), {
    productId,
    userId,
    userName,
    rating,
    comment,
    isApproved: false, // Admin approves
    createdAt: serverTimestamp(),
  });
}
