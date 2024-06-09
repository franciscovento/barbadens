import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Cart {
  id?: number;
  total?: number;
  products?: ProductCart[];
}

export interface ProductCart {
  productId: string;
  profileId: string;
  quantity: number;
}

export type CartActions = {};

const initialState: Cart = {};

export const useCart = create<Cart & CartActions>()(
  persist(
    (set) => ({
      ...initialState,
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
