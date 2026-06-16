export const APP_NAME = 'BrotherFit';
export const APP_URL  = process.env.NEXT_PUBLIC_APP_URL ?? 'https://brotherfit.vercel.app';

export const DELIVERY_CHARGES = {
  dhaka:   2,   // USD
  outside: 5,
} as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

export const ORDER_PIPELINE = [
  'pending',
  'confirmed',
  'processing',
  'packed',
  'shipped',
  'delivered',
] as const;

export const STATUS_LABELS: Record<string, string> = {
  pending:    'Order Placed',
  confirmed:  'Confirmed',
  processing: 'Processing',
  packed:     'Packed',
  shipped:    'Shipped',
  delivered:  'Delivered',
  cancelled:  'Cancelled',
};

export const STATUS_COLORS: Record<string, string> = {
  pending:    'text-amber-600  bg-amber-50  border-amber-200',
  confirmed:  'text-blue-600   bg-blue-50   border-blue-200',
  processing: 'text-violet-600 bg-violet-50 border-violet-200',
  packed:     'text-cyan-600   bg-cyan-50   border-cyan-200',
  shipped:    'text-indigo-600 bg-indigo-50 border-indigo-200',
  delivered:  'text-success    bg-success/10 border-success/30',
  cancelled:  'text-error      bg-error/10  border-error/30',
};

export const PAYMENT_LABELS: Record<string, string> = {
  cod:   'Cash on Delivery',
  bkash: 'bKash',
  nagad: 'Nagad',
};

export const MAX_IMAGES_PER_PRODUCT = 10;
export const MAX_IMAGE_SIZE_MB      = 5;
export const LOW_STOCK_THRESHOLD    = 5;
