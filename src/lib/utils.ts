import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in BDT (Taka) — the only currency used in this app */
export function formatPrice(price: number): string {
  return `৳${Math.round(price).toLocaleString('en-BD')}`;
}

/** Alias kept for any older call sites */
export function formatBDT(price: number): string {
  return formatPrice(price);
}

/** Discount percentage */
export function discountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

/** Truncate text */
export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + '...' : text;
}

/** URL-friendly slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/** Delivery charge based on location */
export function getDeliveryCharge(
  district: string,
  dhakaCharge = 60,
  outsideCharge = 120
): number {
  const dhakaAreas = ['dhaka', 'dhaka city', 'dhaka district'];
  return dhakaAreas.includes(district.toLowerCase())
    ? dhakaCharge
    : outsideCharge;
}

/** Format date */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-BD', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/** Sleep / delay */
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
