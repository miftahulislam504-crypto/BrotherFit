export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  district: string;
  upazila: string;
  area: string;
  address: string;
}

export interface StatusHistoryEntry {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
}

export interface Order {
  id: string;
  userId?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  statusHistory: StatusHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}
