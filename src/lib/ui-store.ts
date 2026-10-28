"use client";

import { create } from "zustand";

type UIState = {
  cartOpen: boolean;
  menuOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  menuOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  setMenuOpen: (v) => set({ menuOpen: v }),
}));
