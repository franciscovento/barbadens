import {
  CartProduct,
  CartProductWithProduct,
} from '@/utils/types/cart.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';
import { getOrCreateProduct } from './products.services';

const getCart = async () => {
  const { data: response } =
    await axios.get<ApiResponse<CartProductWithProduct[]>>('/api/cart');
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

  const { data: response } = await axios.post<ApiResponse<CartProduct[]>>(
    '/api/cart',
    cartItem
  );
  return {
    data: response.data?.[0],
    error: response.error,
  };
};

export { addProductToCart, getCart };
