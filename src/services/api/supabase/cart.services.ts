import { createClient } from '@/utils/supabase/client';
import {
  CartProduct,
  CartProductId,
  CartProductWithProduct,
} from '@/utils/types/cart.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import { PostgrestError } from '@supabase/supabase-js';
import axios from 'axios';
import { getOrCreateProduct } from './products.services';

const getCart = async () => {
  const { data: response } =
    await axios.get<ApiResponse<CartProductWithProduct[], PostgrestError>>(
      '/api/cart'
    );
  return {
    data: response.data,
    error: response.error,
  };
};

const addProductToCart = async (
  cartItem: Pick<CartProduct, 'design_id' | 'fabric_id' | 'profile_id'>
) => {
  const { error } = await getOrCreateProduct({
    design_id: cartItem.design_id,
    fabric_id: cartItem.fabric_id,
  });

  if (error) {
    return {
      data: null,
      error: {
        message: 'Error creating product. Please try again.',
      },
    };
  }

  const { data: response } = await axios.post<
    ApiResponse<CartProduct[], PostgrestError>
  >('/api/cart', cartItem);
  return {
    data: response.data?.[0],
    error: response.error,
  };
};

const deleteProductFromCart = async (productId: CartProductId) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cart_product')
    .delete()
    .eq('cart_id', productId.cart_id)
    .eq('design_id', productId.design_id)
    .eq('fabric_id', productId.fabric_id)
    .eq('profile_id', productId.profile_id)
    .select()
    .returns<CartProduct[]>();

  return {
    data,
    error,
  };
};

const updatedQuantityFromProductCart = async (
  productId: CartProductId,
  quantity: number
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cart_product')
    .update({ quantity })
    .eq('cart_id', productId.cart_id)
    .eq('design_id', productId.design_id)
    .eq('fabric_id', productId.fabric_id)
    .eq('profile_id', productId.profile_id)
    .select()
    .returns<CartProduct[]>();

  return {
    data,
    error,
  };
};

export {
  addProductToCart,
  deleteProductFromCart,
  getCart,
  updatedQuantityFromProductCart,
};
