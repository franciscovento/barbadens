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
const makePayment = async (items: MpProductItem[]) => {
  'use server';

  const preference = new Preference(client);
  const { sandbox_init_point } = await preference.create({
    body: {
      items,
      back_urls: {
        success: 'http://localhost:3000/checkout/resume/50?status=success',
        failure: 'http://localhost:3000/checkout/resume/50?status=fail',
        pending: 'http://localhost:3000/checkout/resume/50?status=pending',
      },
      notification_url:
        'https://deemed-tommy-mississippi-moderate.trycloudflare.com/api/payments?source_news=webhooks&order=50',
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
