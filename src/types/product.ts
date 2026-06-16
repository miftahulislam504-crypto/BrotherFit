export type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  brandId?: string;
  basePrice: number;
  salePrice?: number;
  images: string[];
  description: string;
  material?: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  salesCount: number;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: SizeOption;
  color: string;
  colorHex?: string;
  stock: number;
  reserved: number;
  sold: number;
  priceOverride?: number;
  skuVariant: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  parentId?: string;
  order: number;
  isActive: boolean;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: Date;
}
