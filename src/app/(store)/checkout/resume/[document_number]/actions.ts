'use server';
import mpClient from '@/utils/mercadopago/server';
import { Preference } from 'mercadopago';
import { redirect } from 'next/navigation';
import { PRODUCTION_URL, STAGING_URL } from '../../../../../../constants';

export interface MpProductItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

const client = mpClient();
const makePayment = async (items: MpProductItem[], order_id: number) => {
  'use server';
  const BASE_URL =
    process.env.APP_ENV === 'production' ? PRODUCTION_URL : STAGING_URL;
  const preference = new Preference(client);
  const { init_point } = await preference.create({
    body: {
      items,
      payment_methods: {
        default_installments: 1,
      },
      // back_urls: {
      //   success: `${BASE_URL}/checkout/resume/${order_id}?status=success`,
      //   failure: `${BASE_URL}/checkout/resume/${order_id}?status=failure`,
      //   pending: `${BASE_URL}/checkout/resume/${order_id}?status=pending`,
      // },
      notification_url: `${BASE_URL}/api/payments?source_news=webhooks&order=${order_id}`,
    },
  });

  redirect(init_point!);
};

export default makePayment;
