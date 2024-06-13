import CheckoutStepper from '@/ui/organisms/checkoutStepper/CheckoutStepper';
import { createClient } from '@/utils/supabase/server';
import { CartProductWithProduct } from '@/utils/types/cart.interface';
import { redirect } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export type DeliveryOptions = '0' | '1';

async function Checkout() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cart')
    .select('*, cart_product(*)')
    .returns<CartProductWithProduct[]>();

  if (
    error ||
    !data ||
    data.length === 0 ||
    data[0]?.cart_product.length === 0
  ) {
    redirect('/create');
  }

  return (
    <>
      <main className="app-container py-8 mt-16">
        <section
          id="stepper-container"
          className=" max-w-lg mx-auto px-2 md:px-8 pb-12"
        >
          <CheckoutStepper />
        </section>
        <CheckoutForm />
      </main>
    </>
  );
}

export default Checkout;
