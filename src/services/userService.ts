import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { User, UserAddress } from '@/types';

export async function getUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() } as User;
}

export async function updateUserProfile(
  uid: string,
  data: { name?: string; phone?: string; photoURL?: string }
): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function addAddress(
  uid: string,
  address: Omit<UserAddress, 'id'>,
  currentAddresses: UserAddress[]
): Promise<void> {
  const newAddress: UserAddress = {
    ...address,
    id: crypto.randomUUID(),
    isDefault: currentAddresses.length === 0,
  };
  await updateDoc(doc(db, 'users', uid), {
    addresses: [...currentAddresses, newAddress],
  });
}

export async function updateAddress(
  uid: string,
  addressId: string,
  data: Partial<UserAddress>,
  currentAddresses: UserAddress[]
): Promise<void> {
  const updated = currentAddresses.map(a =>
    a.id === addressId ? { ...a, ...data } : a
  );
  await updateDoc(doc(db, 'users', uid), { addresses: updated });
}

export async function deleteAddress(
  uid: string,
  addressId: string,
  currentAddresses: UserAddress[]
): Promise<void> {
  const filtered = currentAddresses.filter(a => a.id !== addressId);
  // Ensure at least one default
  if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
    filtered[0].isDefault = true;
  }
  await updateDoc(doc(db, 'users', uid), { addresses: filtered });
}

export async function setDefaultAddress(
  uid: string,
  addressId: string,
  currentAddresses: UserAddress[]
): Promise<void> {
  const updated = currentAddresses.map(a => ({
    ...a,
    isDefault: a.id === addressId,
  }));
  await updateDoc(doc(db, 'users', uid), { addresses: updated });
}
