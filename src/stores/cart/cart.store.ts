import { getCart } from '@/services/api/supabase/cart.services';
import { CartProductWithFabricDesignProfile } from '@/utils/types/cart.interface';
import { create } from 'zustand';

export interface CartStore {
  id?: number;
  total?: number;
  cart_products?: CartProductWithFabricDesignProfile[];
  user_id?: string;
}

export type CartActions = {
  checkCart: () => void;
  emptyCart: () => void;
};

const initialState: CartStore = {
  id: undefined,
  total: undefined,
  cart_products: [],
  user_id: undefined,
};

export const useCartStore = create<CartStore & CartActions>()((set, get) => ({
  ...initialState,
  emptyCart: () => {
    set({
      id: undefined,
      total: undefined,
      cart_products: [],
      user_id: undefined,
    });
  },
  checkCart: async () => {
    const { data } = await getCart();
    if (data && data.length > 0) {
      set({
        id: data[0].id,
        total: data[0].total,
        cart_products: data[0].cart_product,
        user_id: data[0].user_id,
      });
    } else {
      get().emptyCart();
    }
  },
}));
