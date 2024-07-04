'use client';
import { Button } from '@/ui/materialComponents';
import { paymentOptions } from '@/utils/data/paymentOptions';
import { OrderProduct } from '@/utils/types/order.interface';
import Image from 'next/image';
import { FC } from 'react';
import makePayment, { MpProductItem } from './actions';

interface Props {
  ptId: number;
  orderProducts: OrderProduct[];
}

const PaymentSection: FC<Props> = ({ ptId, orderProducts }) => {
  const paymentOptionSelected = paymentOptions.find((pt) => pt.id === ptId);

  if (paymentOptionSelected?.id === 2) {
    return <BankTransfer image={paymentOptionSelected?.icon || ''} />;
  }

  if (paymentOptionSelected?.id === 12)
    return (
      <Yape
        image={paymentOptionSelected.icon}
        qr={paymentOptionSelected.qr || ''}
      />
    );

  if (paymentOptionSelected?.id === 8) {
    return (
      <MercadoPago
        orderProducts={orderProducts}
        image={paymentOptionSelected.icon}
      />
    );
  }
  return null;
};

export default PaymentSection;

const BankTransfer = ({ image }: { image: string }) => {
  return (
    <div className="flex flex-col gap-2 order-2 sm:order-1 text-center sm:text-left">
      <span className="text-sm text-app-text ">
        Datos para pagar con transferencia
      </span>
      <Image
        className="mx-auto sm:mx-0"
        src={image}
        alt="logo interbank"
        width={121}
        height={23}
      />
      <div className="flex flex-col gap-0">
        <span> N° Cta. 3895729835749283475293 </span>
        <span>Barbadens</span>
        <span> DNI 04513050</span>
      </div>
    </div>
  );
};

const Yape = ({ image, qr }: { image: string; qr: string }) => {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="bg-white p-3 order-2 sm:order-1">
        <Image src={qr} alt="yape qr" width={120} height={120} />
      </div>
      <div className="flex flex-col gap-4 order-1 sm:order-2 items-center sm:items-start ">
        <span className="text-sm text-app-text ">Escanea para pagar por:</span>
        <Image src={image} alt="logo yape" width={120} height={25} />
      </div>
    </div>
  );
};

const MercadoPago = ({
  image,
  orderProducts,
}: {
  image: string;
  orderProducts: OrderProduct[];
}) => {
  const generatePayment = async () => {
    const items: MpProductItem[] = orderProducts.map((item) => ({
      id: `${item.design_id}${item.fabric_id}`,
      quantity: item.quantity,
      unit_price: item.unit_price,
      title: item.products.name,
    }));
    makePayment(items);
  };

  return (
    <div className="flex flex-col gap-4">
      <Image src={image} alt="logo mercadopago" width={120} height={40} />
      <Button onClick={generatePayment} type="submit">
        Ir a pagar
      </Button>
    </div>
  );
};
