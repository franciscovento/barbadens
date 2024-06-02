'use client';
import { Alert, Button, Input } from '@/ui/materialComponents';
import OptionsDeliveryRadio from '@/ui/OptionsDeliveryRadio/OptionsDeliveryRadio';
import StepTitle from '@/ui/stepTitle/StepTitle';
import Image from 'next/image';
import { useState } from 'react';
import makePayment from './actions';

export type DeliveryOptions = '0' | '1';
const Checkout = () => {
  const [selected, setSelected] = useState<DeliveryOptions>('0');
  const onSelect = (id: DeliveryOptions) => {
    setSelected(id);
  };

  const makeMpPayment = async () => {
    return makePayment({
      id: '1',
      title: 'Camisa a la medida, cuello italiano, sin bolsillo, manga larga',
      quantity: 1,
      unit_price: 15.0,
    });
  };

  return (
    <div className="grid md:grid-cols-2 md:py-8 gap-8 ">
      <div>
        <StepTitle title="Checkout" />
        <Alert color="amber" className="mt-4 bg-[#FFF5ea]">
          ¿Tienes una cuenta?{' '}
          <span className=" text-blue-600 cursor-pointer">Inicia sesión</span>{' '}
          para un checkout rápido
        </Alert>
        {/* INFORMACIÓN DEL CLIENTE */}
        <div className="pt-4">
          <h3 className="text-xl font-medium">Información del cliente</h3>
          <form className="grid gap-4 pt-4">
            <Input label="Correo electrónico" />
            <div className="grid lg:grid-cols-2 gap-4">
              <Input label="Nombre" />
              <Input label="Apellido" />
            </div>
            <Input label="Dirección" />
          </form>
        </div>
        {/* OPCIÓN DE ENTREGA */}
        <div className="pt-8">
          <h3 className="text-xl font-medium">Opción de entrega</h3>
          <div className="pt-4">
            <OptionsDeliveryRadio
              onSelect={onSelect}
              options={[
                {
                  id: 0,
                  title: 'Envío a domicilio',
                  description: 'Dentro de 3 - 5 días hábiles',
                },
                {
                  id: 1,
                  title: 'Recoger en tienda',
                  description: 'Dentro de 3 días hábiles',
                },
              ]}
            />
          </div>
        </div>
        {/* DATOS DEL DELIVERY / RECOJO */}
        {selected === '0' ? (
          <div>
            <h3 className="text-xl font-medium pt-8">Datos de delivery</h3>
            <form className="pt-4 flex flex-col gap-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="Nombre del que recibe" />
                <Input label="N° Documento" />
              </div>
              <Input label="Dirección" />
              <Input label="City" />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="country" />
                <Input label="state" />
                <Input label="zip" />
                <Input label="phone" />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-medium pt-8">Datos de tienda</h3>
            <div className="pt-4 grid gap-4">
              <div className="flex gap-2">
                <span className="font-medium ">Dirección:</span>
                <span> Ca. Chinchón 944, Tda 116. San Isidro</span>
              </div>
              <div>
                <span className="font-medium ">Teléfono:</span>
                <span> +51 962643584</span>
              </div>
              <div>
                <span className="font-medium ">Correo:</span>
                <span> ventas@barbadens.com</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className=" bg-app-background p-8">
          <h3 className="text-xl font-medium">Resumen de compra</h3>
          <div className="grid grid-cols-2 items-center gap-2">
            <div className="flex gap-2 items-center pt-4">
              <Image src={'/images/tela1.png'} width={82} height={82} alt="" />
              <span className="text-xs">
                Camisa a la medida, cuello italiano, sin bolsillo, manga larga
              </span>
            </div>
            <div className="text-center">$12.00</div>
            <div>Subtotal:</div>
            <div className="text-center">$12.00</div>
            <div>Shipping</div>
            <div className="text-center">$2.00</div>
            <div>Tax</div>
            <div className="text-center">$1.00</div>
            <hr className="col-span-full border border-b my-2 border-black/5 " />
            <div>Total</div>
            <div className="text-center">$15.00</div>
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-xl font-medium">Opciones de pago</h3>
          <div className="py-8">PAGAR CON MERCADO PAGO</div>
          <Button onClick={makeMpPayment}>Pagar con mercadopago</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
