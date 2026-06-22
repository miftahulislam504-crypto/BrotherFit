// ════════════════════════════════════════════════════════════════
// 🔶 DEMO / PLACEHOLDER CATALOG DATA
// ────────────────────────────────────────────────────────────────
// Used by src/services/productService.ts ONLY as a fallback, shown
// when Firestore returns no real data yet (so the store doesn't look
// empty while the catalog is being built).
//
// Images are random placeholder photos from picsum.photos (a free
// placeholder image service) — NOT real product photography.
//
// 🗑️ TO REMOVE LATER (once real products/banners are added in
// Firestore): delete this file, then in productService.ts remove
// every block marked "DEMO FALLBACK".
// ════════════════════════════════════════════════════════════════

import type { Product, ProductVariant, Category, Banner, FlashSale, SizeOption } from '@/types';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function demoImg(seed: string, w = 600, h = 800) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

// ─── Categories ─────────────────────────────────────────────────

export const demoCategories: Category[] = [
  { id: 'demo-cat-hoodies', name: 'Hoodies',   slug: 'hoodies',   image: demoImg('bf-cat-hoodies', 100, 100),  order: 1, isActive: true },
  { id: 'demo-cat-tshirts', name: 'T-Shirts',  slug: 't-shirts',  image: demoImg('bf-cat-tshirts', 100, 100),  order: 2, isActive: true },
  { id: 'demo-cat-joggers', name: 'Joggers',   slug: 'joggers',   image: demoImg('bf-cat-joggers', 100, 100),  order: 3, isActive: true },
  { id: 'demo-cat-tanks',   name: 'Tank Tops', slug: 'tank-tops', image: demoImg('bf-cat-tanks', 100, 100),    order: 4, isActive: true },
];

// ─── Banners ────────────────────────────────────────────────────

export const demoBanners: Banner[] = [
  {
    id: 'demo-banner-1',
    image: demoImg('bf-banner-1', 800, 450),
    title: 'New Season Drop',
    subtitle: 'Premium streetwear, freshly stocked',
    link: '/products?sort=newest',
    isActive: true,
    order: 1,
  },
  {
    id: 'demo-banner-2',
    image: demoImg('bf-banner-2', 800, 450),
    title: 'Up to 30% Off',
    subtitle: 'Limited-time flash deals',
    link: '/products?sort=popular',
    isActive: true,
    order: 2,
  },
  {
    id: 'demo-banner-3',
    image: demoImg('bf-banner-3', 800, 450),
    title: 'Built For Brotherhood',
    subtitle: 'Shop the full collection',
    link: '/products',
    isActive: true,
    order: 3,
  },
];

// ─── Products ───────────────────────────────────────────────────

interface DemoProductSeed {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  basePrice: number;
  salePrice?: number;
  tags: string[];
  description: string;
  material: string;
  isFeatured: boolean;
  salesCount: number;
  daysOld: number;
  colors: { name: string; hex: string }[];
}

const seeds: DemoProductSeed[] = [
  {
    id: 'demo-p1', slug: 'classic-oversized-hoodie', name: 'Classic Oversized Hoodie',
    categoryId: 'demo-cat-hoodies', basePrice: 1850, salePrice: 1450,
    tags: ['new', 'men'], isFeatured: true, salesCount: 142, daysOld: 1,
    description: 'A heavyweight oversized hoodie built for everyday comfort. Brushed fleece interior, ribbed cuffs, and a relaxed drop-shoulder fit.',
    material: '320 GSM Cotton Fleece',
    colors: [{ name: 'Charcoal', hex: '#36454F' }, { name: 'Black', hex: '#1A1A1A' }],
  },
  {
    id: 'demo-p2', slug: 'essential-crewneck-tee', name: 'Essential Crewneck Tee',
    categoryId: 'demo-cat-tshirts', basePrice: 690,
    tags: ['popular', 'men'], isFeatured: false, salesCount: 210, daysOld: 10,
    description: 'Soft, breathable everyday tee with a clean crew neckline. A wardrobe staple that pairs with anything.',
    material: '100% Combed Cotton',
    colors: [{ name: 'White', hex: '#F5F5F0' }, { name: 'Black', hex: '#1A1A1A' }],
  },
  {
    id: 'demo-p3', slug: 'graphic-print-tee', name: 'Graphic Print Tee',
    categoryId: 'demo-cat-tshirts', basePrice: 750, salePrice: 599,
    tags: ['new'], isFeatured: false, salesCount: 98, daysOld: 2,
    description: 'Bold graphic print tee with a relaxed fit. Made for those who like to stand out.',
    material: '180 GSM Cotton',
    colors: [{ name: 'Black', hex: '#1A1A1A' }],
  },
  {
    id: 'demo-p4', slug: 'tapered-jogger-pants', name: 'Tapered Jogger Pants',
    categoryId: 'demo-cat-joggers', basePrice: 1450,
    tags: ['popular', 'men'], isFeatured: true, salesCount: 175, daysOld: 12,
    description: 'Tapered fit joggers with an elastic waistband and zip pockets. Built for movement and comfort.',
    material: 'Cotton-Poly Blend',
    colors: [{ name: 'Olive', hex: '#5C5B41' }, { name: 'Black', hex: '#1A1A1A' }],
  },
  {
    id: 'demo-p5', slug: 'performance-tank-top', name: 'Performance Tank Top',
    categoryId: 'demo-cat-tanks', basePrice: 590,
    tags: ['new', 'men'], isFeatured: false, salesCount: 64, daysOld: 3,
    description: 'Lightweight, quick-dry tank built for training days. Breathable fabric keeps you cool.',
    material: 'Polyester-Spandex Mesh',
    colors: [{ name: 'Grey', hex: '#8C8C8C' }, { name: 'Black', hex: '#1A1A1A' }],
  },
  {
    id: 'demo-p6', slug: 'zip-up-track-hoodie', name: 'Zip-Up Track Hoodie',
    categoryId: 'demo-cat-hoodies', basePrice: 2100, salePrice: 1750,
    tags: ['popular'], isFeatured: true, salesCount: 132, daysOld: 14,
    description: 'Full-zip track hoodie with a sporty silhouette. Soft fleece lining for cooler days.',
    material: '280 GSM Cotton Fleece',
    colors: [{ name: 'Navy', hex: '#1F2A44' }],
  },
  {
    id: 'demo-p7', slug: 'cargo-jogger-pants', name: 'Cargo Jogger Pants',
    categoryId: 'demo-cat-joggers', basePrice: 1650,
    tags: ['new', 'men'], isFeatured: false, salesCount: 87, daysOld: 4,
    description: 'Utility-inspired cargo joggers with multiple pockets and a tapered ankle.',
    material: 'Ripstop Cotton Blend',
    colors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'Olive', hex: '#5C5B41' }],
  },
  {
    id: 'demo-p8', slug: 'ribbed-tank-top', name: 'Ribbed Tank Top',
    categoryId: 'demo-cat-tanks', basePrice: 550,
    tags: ['popular'], isFeatured: false, salesCount: 53, daysOld: 16,
    description: 'Fitted ribbed tank with a clean, minimal look. Great as a layering piece or on its own.',
    material: 'Ribbed Cotton Blend',
    colors: [{ name: 'Black', hex: '#1A1A1A' }, { name: 'White', hex: '#F5F5F0' }],
  },
];

export const demoProducts: Product[] = seeds.map((s, i) => ({
  id: s.id,
  name: s.name,
  slug: s.slug,
  sku: `BF-DEMO-${String(i + 1).padStart(3, '0')}`,
  categoryId: s.categoryId,
  basePrice: s.basePrice,
  salePrice: s.salePrice,
  images: [demoImg(`${s.id}-1`), demoImg(`${s.id}-2`)],
  description: s.description,
  material: s.material,
  tags: s.tags,
  isActive: true,
  isFeatured: s.isFeatured,
  salesCount: s.salesCount,
  rating: 4.5,
  reviewCount: 0,
  createdAt: daysAgo(s.daysOld),
  updatedAt: daysAgo(s.daysOld),
}));

// ─── Variants (sizes × colors) ──────────────────────────────────

const SIZE_SET: SizeOption[] = ['S', 'M', 'L', 'XL'];

export const demoVariants: ProductVariant[] = seeds.flatMap((s, pIdx) =>
  s.colors.flatMap((color, cIdx) =>
    SIZE_SET.map((size, sIdx) => {
      const stock = [12, 8, 3, 0][sIdx % 4]; // mix of stock levels, incl. one sold-out size
      return {
        id: `${s.id}-v-${cIdx}-${sIdx}`,
        productId: s.id,
        size,
        color: color.name,
        colorHex: color.hex,
        stock,
        reserved: 0,
        sold: 10 + pIdx,
        skuVariant: `BF-DEMO-${String(pIdx + 1).padStart(3, '0')}-${color.name.slice(0, 2).toUpperCase()}-${size}`,
      };
    })
  )
);

// ─── Flash sale (computed at request time so it never "expires") ─

export function getDemoFlashSale(): FlashSale {
  const now = new Date();
  return {
    id: 'demo-flash-1',
    title: 'Weekend Flash Sale',
    startTime: now,
    endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // +48h from now
    productIds: ['demo-p1', 'demo-p3', 'demo-p6'],
    discountType: 'percentage',
    discountValue: 20,
    isActive: true,
  };
}
