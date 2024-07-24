'use client';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Button, Input } from '@/ui/materialComponents';
import OptionsDeliveryRadio from '@/ui/molecules/OptionsDeliveryRadio/OptionsDeliveryRadio';

import SelectCard from '@/ui/atoms/selectCard/SelectCard';
import { paymentOptions } from '@/utils/data/paymentOptions';
import useCart from '@/utils/hooks/useCart.hooks';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CartResume from './CartResume';
import OptionsPayments from './OptionsPayments';

import { createCheckout } from '@/services/api/bsale/checkout.services';
import { errorToast } from '@/services/modals/appModal';
import { useCartStore } from '@/stores/cart/cart.store';
import { generateCheckout } from '@/utils/generateCheckout';
import { getShippingCost } from '@/utils/getShippingCost';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { routes } from '../../../../routes';
import { FormCheckoutSchema, formCheckoutSchema } from './formSchema';
interface Props {
  defaultValues: {
    firstName: string;
    email: string;
    lastName: string;
    clientId: number;
  };
}

const CheckoutForm: FC<Props> = ({ defaultValues }) => {
  const { cart_products = [], total = 0 } = useCart();
  const router = useRouter();
  const checkCart = useCartStore((state) => state.checkCart);
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setValue,
    formState: { isValid, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: {
      clientEmail: defaultValues.email,
      clientName: defaultValues.firstName,
      clientLastName: defaultValues.lastName,
      ptId: 2,
      pickStoreId: 1,
      generateDocument: 1,
      marketId: 1,
      withdrawStore: 0,
      shippingCost: 0,
      discountCost: 0,
      payProcess: 'for_validate',
    },
    resolver: yupResolver(formCheckoutSchema),
  });
  const watchWithdrawStore = watch('withdrawStore');
  const watchShippingCost = watch('shippingCost');
  const watchPdId = watch('ptId');

  const onSelectDeliveryOption = (id: number) => {
    setValue('withdrawStore', id);
  };

  const onSubmit = async (data: FormCheckoutSchema) => {
    try {
      const checkout = generateCheckout(
        data,
        cart_products,
        defaultValues.clientId
      );
      const { data: checkoutData, error: checkoutError } =
        await createCheckout(checkout);
      if (checkoutError) {
        throw checkoutError;
      }
      checkCart();

      return router.push(
        routes.checkout.resume.replace(
          '[document_number]',
          checkoutData!.checkout_info.documentNumber.toString()
        )
      );
    } catch (error) {
      Sentry.captureException(error);
      return errorToast(
        'Ocurrió un error creando el pedido, por favor inténtalo nuevamente'
      );
    }
  };

  useEffect(() => {
    if (watchWithdrawStore == 1) {
      setValue('shippingCost', 0);
      unregister('clientStreet');
      unregister('clientCityZone');
      unregister('clientBuildingNumber');
      unregister('clientState');
      unregister('clientCountry');
    }

    if (watchWithdrawStore == 0) {
      setValue('shippingCost', getShippingCost(total));
      unregister('pickCode');
      unregister('pickName');
    }
  }, [watchWithdrawStore, unregister]);

  useEffect(() => {
    setValue('shippingCost', getShippingCost(total));
  }, [total]);

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
            <Input label="Correo electrónico" {...register('clientEmail')} />
            <div className="grid lg:grid-cols-2 gap-4">
              <Input {...register('clientName')} label="Nombre" />
              <Input label="Apellido" {...register('clientLastName')} />
              <Input label="Teléfono" {...register('clientPhone')} />
              {/* <Input label="Dni" {...register('clientDocument')} /> */}
            </div>
          </div>
        </div>
        {/* OPCIÓN DE ENTREGA */}
        <div className="pt-8">
          <h3 className="text-xl font-medium">Opción de entrega</h3>
          <div className="pt-4">
            <OptionsDeliveryRadio
              defaultValue={watchWithdrawStore}
              onSelect={onSelectDeliveryOption}
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
        {watchWithdrawStore == 0 ? (
          <div>
            <h3 className="text-xl font-medium pt-8">Datos de delivery</h3>
            <div className="pt-4 flex flex-col gap-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="Nombre de calle" {...register('clientStreet')} />
                <Input label="Número" {...register('clientBuildingNumber')} />
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="Distrito" {...register('clientCityZone')} />
                <Input label="Provincia" {...register('clientState')} />
                <Input label="Código postal" {...register('clientPostcode')} />
                <Input
                  value={'Perú'}
                  label="país"
                  readOnly
                  {...register('clientCountry')}
                />
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
            <div className="pt-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Input
                  label="Nombre del que recibe"
                  {...register('pickName')}
                />
                <Input label="N° Documento" {...register('pickCode')} />
              </div>
            </div>
          </div>
        )}
        {/* <div>
          <h3 className="text-xl font-medium pt-8">Tipo de documento</h3>
          <div className="pt-4">
            <OptionsDeliveryRadio
              defaultValue={watchDocumentType}
              onSelect={onSelectDocumentType}
              options={[
                {
                  id: 0,
                  title: 'Boleta',
                  description: 'Documento simple',
                },
                {
                  id: 1,
                  title: 'Factura',
                  description: 'Necesitas datos de la empresa',
                },
              ]}
            />
          </div>
          {watchDocumentType == 1 && (
            <div className="pt-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Input label="RUC" {...register('ruc')} />
                <Input label="Razón Social" {...register('companyName')} />
                <Input label="Dirección" {...register('companyAddress')} />
                <Input label="Distrito" {...register('companyCityZone')} />
                <Input label="Provincia" {...register('companyState')} />
              </div>
            </div>
          )}
        </div> */}
      </div>
      <div>
        <CartResume shippingCost={watchShippingCost} />
        <div className="p-8">
          <h3 className="text-xl font-medium">Opciones de pago</h3>
          <div className="flex flex-col gap-4 py-4">
            <OptionsPayments
              defaultValue={watchPdId}
              options={paymentOptions.filter((opt) => opt.active)}
              onSelect={(id: number) => setValue('ptId', id)}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            loading={isSubmitting}
            disabled={!isValid || isSubmitting || isSubmitSuccessful}
            type="submit"
          >
            Confirmar e ir a pagar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
