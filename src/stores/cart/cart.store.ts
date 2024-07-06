import {
  deleteProductFromCart,
  getCart,
  updatedQuantityFromProductCart,
} from '@/services/api/supabase/cart.services';
import {
  CartProductId,
  CartProductWithFabricDesignProfile,
} from '@/utils/types/cart.interface';
import { create } from 'zustand';

export interface CartStore {
  id?: number;
  total?: number;
  cart_products?: CartProductWithFabricDesignProfile[];
  user_id?: string;
  isLoading?: boolean;
}

export type CartActions = {
  checkCart: () => void;
  emptyCart: () => void;
  onChangueProductQuantity: (
    productId: CartProductId,
    quantity: number
  ) => void;
  deleteItem: (productId: CartProductId) => void;
};

const initialState: CartStore = {
  id: undefined,
  total: undefined,
  cart_products: [],
  user_id: undefined,
  isLoading: false,
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
  deleteItem: async (productId: CartProductId) => {
    set({ isLoading: true });
    const { error } = await deleteProductFromCart(productId);
    if (!error) {
      get().checkCart();
    } else {
      alert('Ocurrió un error al eliminar el producto');
    }
    set({ isLoading: false });
  },
  onChangueProductQuantity: async (
    productId: CartProductId,
    quantity: number
  ) => {
    set({ isLoading: true });
    const { error } = await updatedQuantityFromProductCart(productId, quantity);
    if (!error) {
      get().checkCart();
    } else {
      alert('Ocurrió un error al actualizar la cantidad del producto');
    }
    set({ isLoading: false });
  },
}));
