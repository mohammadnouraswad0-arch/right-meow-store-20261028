"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: number;
  slug: string;
  nameAr: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  variant?: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  addItem: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeItem: (productId: number, variant?: string) => void;
  setQuantity: (productId: number, quantity: number, variant?: string) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === item.productId && l.variant === item.variant,
          );
          if (existing) {
            const nextQty = Math.min(existing.quantity + quantity, item.stock || 99);
            return {
              lines: state.lines.map((l) =>
                l.productId === item.productId && l.variant === item.variant
                  ? { ...l, quantity: nextQty }
                  : l,
              ),
            };
          }
          return {
            lines: [...state.lines, { ...item, quantity: Math.min(quantity, item.stock || 99) }],
          };
        }),
      removeItem: (productId, variant) =>
        set((state) => ({
          lines: state.lines.filter((l) => !(l.productId === productId && l.variant === variant)),
        })),
      setQuantity: (productId, quantity, variant) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productId === productId && l.variant === variant
                ? { ...l, quantity: Math.max(1, Math.min(quantity, l.stock || 99)) }
                : l,
            )
            .filter((l) => l.quantity > 0),
        })),
      clear: () => set({ lines: [] }),
      totalItems: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    }),
    { name: "right-meow-cart" },
  ),
);
