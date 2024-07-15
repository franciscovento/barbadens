'use server';
import mpClient from '@/utils/mercadopago/server';
import { Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

export interface MpProductItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

const client = mpClient();
const makePayment = async (items: MpProductItem[], order_id: number) => {
  'use server';

  const preference = new Preference(client);
  const { sandbox_init_point } = await preference.create({
    body: {
      items,
      // back_urls: {
      //   success: `http://localhost:3000/checkout/resume/${order_id}?status=success`,
      //   failure: `http://localhost:3000/checkout/resume/${order_id}?status=failure`,
      //   pending: `http://localhost:3000/checkout/resume/${order_id}?status=pending`,
      // },
      notification_url: `https://species-least-pools-faced.trycloudflare.com/api/payments?source_news=webhooks&order=${order_id}`,
      // shipments: {
      //   cost: 20,
      //   free_shipping: true,
      //   local_pickup: true,
      //   receiver_address: {

      //   }
      // }
    },
  });

  redirect(sandbox_init_point!);
};

export default makePayment;
