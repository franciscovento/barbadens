'use server';
import mpClient from '@/utils/mercadopago/server';
import { Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

interface ProductItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

const client = mpClient();
const makePayment = async (item: ProductItem) => {
  const preference = new Preference(client);
  const myPreference = await preference.create({
    body: {
      items: [item],
    },
  });
  redirect(myPreference.sandbox_init_point!);
};

export default makePayment;
