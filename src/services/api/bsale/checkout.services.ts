import { Checkout } from '@/utils/types/bsale/checkout.interface';
import axios from 'axios';

async function createCheckout(checkoutInfo: Checkout) {
  // try {
  //   const { data } = await axios.post<ApiResponse<CheckoutResponse>>(
  //     '/api/checkout',
  //     checkoutInfo
  //   );
  //   return {
  //     data: data.data?.data,
  //     error: null,
  //   };
  // } catch (error) {
  //   return {
  //     data: null,
  //     error: error,
  //   };
  // }
}

async function processCheckout(checkoutInfo: Checkout) {
  const { data } = await axios.post('/api/checkout', checkoutInfo);
  console.log(data);

  return data;
  // try {
  //   const { data: checkoutData, error: checkoutError } =
  //     await createCheckout(checkoutInfo);
  //   if (checkoutError) {
  //     throw checkoutError;
  //   }
  //   const supabase = createClient();
  //   const { data, error } = await supabase.rpc('create_order', {
  //     token: checkoutData?.token,
  //   });
  //   if (error) {
  //     throw error;
  //   }
  //   return {
  //     data: data,
  //     error: null,
  //   };
  // } catch (error) {
  //   return {
  //     data: null,
  //     error: error,
  //   };
  // }
}

export { createCheckout, processCheckout };
