import { createClient } from '@/utils/supabase/server';
import CheckoutForm from './CheckoutForm';
import MockCheckoutForm from './MockCheckoutForm';

export type DeliveryOptions = '0' | '1';
const Checkout = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return <MockCheckoutForm />;
  }

  return (
    <div>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
