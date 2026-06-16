import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId) => {
        const ids = get().ids;
        set({
          ids: ids.includes(productId)
            ? ids.filter(id => id !== productId)
            : [...ids, productId],
        });
      },

      has: (productId) => get().ids.includes(productId),

      clear: () => set({ ids: [] }),
    }),
    { name: 'fashionos-wishlist' }
  )
);
