import { getCheckoutByToken } from '@/services/api/bsale/checkout.services';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Button, Chip } from '@/ui/materialComponents';
import { checkoutStatusMap } from '@/utils/checkoutStatusMap';
import { createClient } from '@/utils/supabase/server';
import { PayProcess } from '@/utils/types/bsale/checkout.interface';
import { GetOrdersResponse } from '@/utils/types/orders.interface';
import Link from 'next/link';
import { FC } from 'react';
import PaymentSection from './PaymentSection';

interface Props {
  params: {
    token: string;
  };
}
const Page: FC<Props> = async ({ params }) => {
  const supabase = createClient();
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*, order_product(*, products(*), profiles(*))')
    .eq('bsale_token', params.token)
    .returns<GetOrdersResponse[]>();

  if ((orders && orders?.length === 0) || ordersError) {
    return (
      <div className="app-container mt-16 py-12">
        No tienes ninguna orden con este ID, verifica correctamente tu pedido.
      </div>
    );
  }
  const { data, error } = await getCheckoutByToken(params.token);
  const order = orders[0];

  const checkout = data?.data;
  const getCheckoutProcessStatus = (status: PayProcess) => {
    if (status === 'for_validate') {
      return 'amber';
    }
    if (status == 'success') {
      return 'green';
    }
    if (status === 'fail') {
      return 'red';
    }
  };
  return (
    <main className="app-container py-12 mt-16">
      <StepTitle title="Resumen del pedido" ribbon="center" />
      <div className="py-12">
        <div className="bg-app-background px-12 py-8 flex justify-center items-center flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {checkout?.ptId && <PaymentSection ptId={checkout?.ptId} />}
          <div className="sm:text-right order-1 sm:order-2 text-center">
            <span className="text-sm text-app-text ">Monto a Pagar</span>
            <p className="font-semibold text-4xl py-2">
              S/. {checkout?.totalCart}
            </p>
            {checkout?.payProcess && (
              <Chip
                color={getCheckoutProcessStatus(checkout.payProcess)}
                value={checkoutStatusMap[checkout?.payProcess]}
              />
            )}
          </div>
        </div>
        <div className="bg-white border-4 border-app-background p-12">
          <div className="flex flex-col gap-4">
            {order?.order_product.map((cartItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b-2 border-app-background pb-4"
              >
                <div>
                  <h3 className="font-bold">
                    Camisa para {cartItem?.profiles?.profile_name}
                  </h3>
                  <p>
                    Qty: {cartItem?.quantity} - {cartItem?.products?.name}
                  </p>
                </div>
                <div className="text-lg sm:text-2xl text-nowrap">
                  s/. {cartItem?.unit_price * cartItem?.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-4 border-app-background mt-12 p-12 flex sm:flex-row sm:justify-between gap-4 flex-col items-center justify-center">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <div className="flex flex-col gap-1">
              <span className="font-bold capitalize">
                {checkout?.clientName} {checkout?.clientLastName}
              </span>
              <span>Tel: {checkout?.clientPhone}</span>
              <span>{checkout?.extrasUserData?.user_rut}</span>
            </div>
            <span className="text-app-accent">{checkout?.clientEmail}</span>
          </div>
          <span className="block h-1 w-[220px] sm:h-[120px] sm:w-1 bg-app-background"></span>
          {checkout?.withdrawStore === 0 ? (
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="font-bold">Datos de delivery</h3>
              <span className="capitalize">
                {checkout?.clientStreet} {checkout?.clientBuildingNumber},{' '}
                {checkout?.clientCityZone}
              </span>
              <span className="capitalize">
                {checkout?.clientState} {checkout?.clientPostcode} -{' '}
                {checkout?.clientCountry}
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="font-bold">Retiro en tienda</h3>
              <span>Ca. Chinchón 944, </span>
              <span>Tda 116. San Isidro</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center pt-8">
          <Link href={'/create'}>
            <Button color="gray">Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
