'use client';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Button, Input } from '@/ui/materialComponents';
import OptionsDeliveryRadio from '@/ui/molecules/OptionsDeliveryRadio/OptionsDeliveryRadio';

import { useUser } from '@/stores/user/user.store';
import SelectCard from '@/ui/atoms/selectCard/SelectCard';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CartResume from './CartResume';
import OptionsPayments from './OptionsPayments';

export type DeliveryOptions = '0' | '1';
const CheckoutForm = () => {
  const { email, profiles } = useUser();

  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const mainProfile =
    profiles.find((profile) => profile.is_primary) || profiles[0];
  const [selected, setSelected] = useState<DeliveryOptions>('0');
  const onSelect = (id: DeliveryOptions) => {
    setSelected(id);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 md:py-8 gap-8"
    >
      <div>
        <StepTitle title="Checkout" />
        {/* INFORMACIÓN DEL CLIENTE */}
        <div className="pt-4">
          <h3 className="text-xl font-medium">Información del cliente</h3>
          <div className="grid gap-4 pt-4">
            <Input value={email} readOnly label="Correo electrónico" />
            <div className="grid lg:grid-cols-2 gap-4">
              <Input defaultValue={mainProfile?.profile_name} label="Nombre" />
              <Input label="Apellido" />
            </div>
            <Input label="Teléfono" />
          </div>
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
            <div className="pt-4 flex flex-col gap-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="Nombre del que recibe" />
                <Input label="N° Documento" />
              </div>

              <Input label="Dirección" />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="Distrito" />
                <Input label="Provincia" />
                <Input value={'Perú'} label="país" readOnly />
                {/* <Input label="zip" /> */}
                <Input label="Teléfono" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-medium pt-8">Datos de Retiro</h3>
            <div className="pt-4">
              <SelectCard
                description="Ca. Chichón 944, Tda 116. San Isidro"
                isActive
                title="Barbadens"
                onClick={() => null}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <CartResume />
        <div className="p-8">
          <h3 className="text-xl font-medium">Opciones de pago</h3>
          <div className="flex flex-col gap-4 py-4">
            <OptionsPayments
              options={[
                {
                  id: 0,
                  title: 'Yape',
                  description: 'Paga con tarjeta de crédito o débito',
                  icon: '/images/payments-logos/yape_logo.png',
                },
                {
                  id: 1,
                  title: 'Mercado Pago',
                  description: 'Paga en efectivo al recibir el producto',
                  icon: '/images/payments-logos/mercadopago_logo.png',
                },
                {
                  id: 3,
                  title: 'Transferencia bancaria',
                  description: 'Paga en efectivo al recibir el producto',
                },
              ]}
              onSelect={(id) => console.log(id)}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button>Confirmar e ir a pagar</Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
