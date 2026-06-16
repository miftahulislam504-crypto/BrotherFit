# FashionOS Web

Premium fashion e-commerce — Next.js 15 + Firebase.

## Stack

| Layer     | Tech                                |
|-----------|---------------------------------------|
| Framework | Next.js 15 (App Router, TypeScript)   |
| Styling   | Tailwind CSS                          |
| Animation | Framer Motion                         |
| Forms     | React Hook Form + Zod                 |
| State     | Zustand (cart + wishlist)             |
| Backend   | Firebase Auth + Firestore + Storage   |
| Deploy    | Vercel                                |

## Setup

### 1. Install

```bash
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
# Fill in your Firebase config values
```

### 3. Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password, Google, Phone)
4. Create Firestore database (production mode)
5. Enable Storage
6. Copy config values to `.env.local`

### 4. Deploy Firebase rules

```bash
npm install -g firebase-tools
firebase login
firebase init   # select Firestore + Storage + your project
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### 5. Run dev server

```bash
npm run dev
```

## Project Structure

```
src/
├── app/          → Pages (App Router)
├── components/   → UI components
│   ├── home/     → Home page sections
│   ├── layout/   → Header, BottomNav, SiteLayout
│   ├── product/  → ProductCard, Gallery etc.
│   └── ui/       → Button, Input, Badge, Spinner
├── hooks/        → useAuth
├── lib/          → Firebase config, utils
├── services/     → Firestore query functions
├── store/        → Zustand stores (cart, wishlist)
└── types/        → TypeScript types
```

## Related

- **Admin Panel**: `fashionos-admin` (separate repo)
