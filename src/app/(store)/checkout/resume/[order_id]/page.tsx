import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Button, Chip } from '@/ui/materialComponents';
import { getCurrencyFormat } from '@/utils/getCurrencyFormat';
import { getStatusOrder } from '@/utils/getStatusOrder';
import { createClient } from '@/utils/supabase/server';
import { OrderWithProducts } from '@/utils/types/order.interface';
import { colors } from '@material-tailwind/react/types/generic';
import Link from 'next/link';
import { FC } from 'react';
import PaymentSection from './PaymentSection';
import SeeDetail from './SeeDetail';

interface Props {
  params: {
    order_id: string;
  };
}
const Page: FC<Props> = async ({ params }) => {
  const supabase = createClient();
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*, order_product(*, products(*), profiles(*))')
    .eq('id', params.order_id)
    .returns<OrderWithProducts[]>();

  if ((orders && orders?.length === 0) || ordersError) {
    return (
      <div className="app-container mt-16 py-12">
        No tienes ninguna orden con este ID, verifica correctamente tu pedido.
      </div>
    );
  }

  const order = orders[0];
  const orderStatus = getStatusOrder(order.status);

  return (
    <main className="app-container py-12 mt-16">
      <StepTitle title="Resumen del pedido" ribbon="center" />
      <div className="py-12">
        <div className="bg-app-background px-12 py-8 flex justify-center items-center flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {order.status === 'pending' ? (
            order.checkout_info?.ptId && (
              <PaymentSection
                order_id={Number(params.order_id)}
                orderProducts={order.order_product}
                ptId={order.checkout_info?.ptId}
              />
            )
          ) : (
            <div className="text-xl font-semibold">
              Pedido {orderStatus.text}
            </div>
          )}

          <div className="sm:text-right order-1 sm:order-2 text-center">
            <span className="text-sm text-app-text ">Monto a Pagar</span>
            <p className="font-semibold text-4xl py-2">
              {getCurrencyFormat(
                order?.total_products +
                  order.shipping_cost -
                  order.discount_cost
              )}
            </p>
            <Chip
              className="text-center"
              value={orderStatus.text}
              color={orderStatus.color as colors}
              icon={orderStatus.icon}
            />
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
                  <p>{cartItem?.products?.name}</p>
                  <SeeDetail
                    designId={cartItem.design_id}
                    profileId={cartItem.profile_id}
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold">Cantidad:</p>
                  {cartItem?.quantity}
                </div>
                <div className="text-lg sm:text-2xl text-nowrap">
                  {getCurrencyFormat(cartItem?.unit_price * cartItem?.quantity)}
                </div>
              </div>
            ))}
            <div className="text-right">
              <span className="font-semibold">Costo de envío: </span>
              {getCurrencyFormat(order.shipping_cost)}
            </div>
          </div>
        </div>
        <div className="border-4 border-app-background mt-12 p-12 flex sm:flex-row sm:justify-between gap-4 flex-col items-center justify-center">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <div className="flex flex-col gap-1">
              <span className="font-bold capitalize">
                {order.checkout_info?.clientName}{' '}
                {order.checkout_info?.clientLastName}
              </span>
              <span>Tel: {order.checkout_info?.clientPhone}</span>
              <span>{order.checkout_info.extrasUserData?.user_rut}</span>
            </div>
            <span className="text-app-accent">
              {order.checkout_info?.clientEmail}
            </span>
          </div>
          <span className="block h-1 w-[220px] sm:h-[120px] sm:w-1 bg-app-background"></span>
          {order.checkout_info?.withdrawStore === 0 ? (
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <h3 className="font-bold">Datos de delivery</h3>
              <span className="capitalize">
                {order.checkout_info?.clientStreet}{' '}
                {order.checkout_info?.clientBuildingNumber},{' '}
                {order.checkout_info?.clientCityZone}
              </span>
              <span className="capitalize">
                {order.checkout_info?.clientState}{' '}
                {order.checkout_info?.clientPostcode} -{' '}
                {order.checkout_info?.clientCountry}
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
