import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ShopifyProduct } from "@/lib/shopify";

interface RecentlyViewedState {
  products: ShopifyProduct[];
  addProduct: (product: ShopifyProduct) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const existing = get().products;
        const filtered = existing.filter(
          (p) => p.node.id !== product.node.id
        );
        // Most recent first, keep max 12
        set({ products: [product, ...filtered].slice(0, 12) });
      },
    }),
    { name: "recently-viewed" }
  )
);
