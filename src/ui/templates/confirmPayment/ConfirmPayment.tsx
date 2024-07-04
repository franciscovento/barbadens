import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { OrderWithProducts } from '@/utils/types/order.interface';
import { FC } from 'react';

interface Props {
  order: OrderWithProducts;
}
const ConfirmPayment: FC<Props> = ({ order }) => {
  return (
    <div>
      <StepTitle title="Confirmar pago" ribbon="center" />
      <div className="flex gap-2 pt-4 justify-start">
        <span className="font-semibold">Cliente:</span>
        {order.checkout_info.clientName} {order.checkout_info.clientLastName}
      </div>
      <div className="py-4 flex flex-col items-start gap-2">
        <div className="flex gap-2">
          <span className="font-semibold">Pedido:</span>
          {order.total_products}
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Envío:</span>
          {order.shipping_cost}
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Total:</span>
          {order.total_products + order.shipping_cost}
        </div>
      </div>
      <div className="flex items-center gap-2 pb-2 text-sm ">
        Cuando confirmas un pago, automáticamente se genera la boleta de venta
        en Bsale.
      </div>
    </div>
  );
};

export default ConfirmPayment;
