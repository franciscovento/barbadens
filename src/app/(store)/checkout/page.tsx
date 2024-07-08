import CheckoutStepper from '@/ui/organisms/checkoutStepper/CheckoutStepper';
import { createClient } from '@/utils/supabase/server';
import { CartProductWithProduct } from '@/utils/types/cart.interface';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CheckoutForm from './CheckoutForm';

export type DeliveryOptions = '0' | '1';

async function Checkout() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const { data: cart, error: cartError } = await supabase
    .from('cart')
    .select('*, cart_product(*)')
    .returns<CartProductWithProduct[]>();

  if (
    cartError ||
    !cart ||
    cart.length === 0 ||
    cart[0]?.cart_product.length === 0
  ) {
    redirect('/create');
  }

  if (error) {
    return (
      <div className="mt-20">
        ocurrió un error al cargar la página, necesitas iniciar sesión para
        continuar.
      </div>
    );
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
        <Suspense>
          <CheckoutForm
            defaultValues={{
              clientId: data.user.user_metadata.client_id,
              email: data?.user?.email || '',
              firstName: data.user.user_metadata.first_name || '',
              lastName: data.user.user_metadata.last_name || '',
            }}
          />
        </Suspense>
      </main>
    </>
  );
}

export default Checkout;
