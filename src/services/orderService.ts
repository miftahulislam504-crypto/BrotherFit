import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Order, OrderStatus } from '@/types';

export async function createOrder(
  orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    statusHistory: [
      { status: 'pending', timestamp: serverTimestamp() },
    ],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, 'orders', orderId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Order;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<void> {
  const orderRef = doc(db, 'orders', orderId);
  const snap = await getDoc(orderRef);
  if (!snap.exists()) throw new Error('Order not found');

  const history = snap.data().statusHistory || [];

  await updateDoc(orderRef, {
    status,
    statusHistory: [...history, { status, timestamp: Timestamp.now(), note }],
    updatedAt: serverTimestamp(),
  });
}
