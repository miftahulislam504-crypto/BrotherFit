export * from './product';
export * from './order';
export * from './user';

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  order: number;
}

export interface FlashSale {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  productIds: string[];
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  isActive: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  minOrder: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: Date;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_confirmed' | 'order_shipped' | 'order_delivered' | 'general';
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface StoreSettings {
  logo?: string;
  name: string;
  address: string;
  email: string;
  payment: {
    bkash: boolean;
    nagad: boolean;
    cod: boolean;
  };
  delivery: {
    dhakaCharge: number;
    outsideCharge: number;
  };
  reviews: {
    autoApprove: boolean;
  };
}
