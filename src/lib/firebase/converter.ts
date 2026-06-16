import { Timestamp } from 'firebase/firestore';

/** Convert all Firestore Timestamps in a document to JS Dates */
export function convertTimestamps<T>(data: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      result[key] = value.toDate();
    } else if (
      value !== null &&
      typeof value === 'object' &&
      'toDate' in value &&
      typeof (value as { toDate: unknown }).toDate === 'function'
    ) {
      result[key] = (value as Timestamp).toDate();
    } else if (Array.isArray(value)) {
      result[key] = value.map(item =>
        item && typeof item === 'object' ? convertTimestamps(item as Record<string, unknown>) : item
      );
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
