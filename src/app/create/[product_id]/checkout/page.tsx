import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export type DeliveryOptions = '0' | '1';

interface Props {
  params: {
    product_id: string;
  };
}

async function Checkout({ params }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login page if not authenticated
  if (!user) {
    redirect(`/auth/checkout?returnTo=/create/${params.product_id}/checkout`);
  }

  return (
    <div>
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
