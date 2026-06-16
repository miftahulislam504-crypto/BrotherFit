import { Timestamp } from 'firebase/firestore';

/** Convert Firestore Timestamp → JS Date safely */
export function toDate(value: Timestamp | Date | undefined | null): Date {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  return value.toDate();
}

/** Convert plain JS object from Firestore to typed entity */
export function withDates<T extends Record<string, unknown>>(
  data: T,
  dateFields: (keyof T)[]
): T {
  const result = { ...data };
  for (const field of dateFields) {
    if (result[field]) {
      (result as Record<string, unknown>)[field as string] = toDate(
        result[field] as Timestamp | Date
      );
    }
  }
  return result;
}
