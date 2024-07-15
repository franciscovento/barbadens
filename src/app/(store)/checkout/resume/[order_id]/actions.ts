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
  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_BASE_URL
      : 'http://localhost:3000';
  const preference = new Preference(client);
  const { sandbox_init_point } = await preference.create({
    body: {
      items,
      payment_methods: {
        default_installments: 1,
      },
      back_urls: {
        success: `${BASE_URL}/checkout/resume/${order_id}?status=success`,
        failure: `${BASE_URL}/checkout/resume/${order_id}?status=failure`,
        pending: `${BASE_URL}/checkout/resume/${order_id}?status=pending`,
      },
      notification_url: `${BASE_URL}/api/payments?source_news=webhooks&order=${order_id}`,
    },
  });

  redirect(sandbox_init_point!);
};

export default makePayment;
