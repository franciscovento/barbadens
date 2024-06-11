import { Cart, CartProduct } from '@/utils/types/cart.interface';
import { ApiResponse } from '@/utils/types/response.interface';
import axios from 'axios';

const getCart = async () => {
  const { data: response } = await axios.get<ApiResponse<Cart[]>>('/api/cart');
  return {
    data: response.data,
    error: response.error,
  };
};

const addProductToCart = async (
  cartItem: Pick<CartProduct, 'design_id' | 'fabric_id' | 'profile_id'> & {
    user_id: string;
  }
) => {
  const { data: response } = await axios.post<ApiResponse<CartProduct[]>>(
    '/api/cart',
    cartItem
  );
  return {
    data: response.data,
    error: response.error,
  };
};

export { addProductToCart, getCart };
