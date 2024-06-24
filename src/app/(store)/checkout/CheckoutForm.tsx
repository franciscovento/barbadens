'use client';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Button, Input } from '@/ui/materialComponents';
import OptionsDeliveryRadio from '@/ui/molecules/OptionsDeliveryRadio/OptionsDeliveryRadio';

import SelectCard from '@/ui/atoms/selectCard/SelectCard';
import { paymentOptions } from '@/utils/data/paymentOptions';
import { CheckoutInfo, generateCheckout } from '@/utils/generateCheckout';
import useCart from '@/utils/hooks/useCart.hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CartResume from './CartResume';
import OptionsPayments from './OptionsPayments';

import { createCheckout } from '@/services/api/bsale/checkout.services';
import { errorToast } from '@/services/modals/appModal';
import { useCartStore } from '@/stores/cart/cart.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

export type DeliveryOptions = 0 | 1;

const schema: yup.ObjectSchema<CheckoutInfo> = yup
  .object({
    clientEmail: yup.string().email().required(),
    code: yup.string().required(),
    clientName: yup.string().required('Nombre es requerido'),
    clientLastName: yup.string().required('Apellido es requerido'),
    clientPhone: yup.string().required('Necesitas un teléfono'),
    shippingComment: yup.string().default(''),
    ptId: yup.number().required().default(1),
    shippingCost: yup.number(),
    withdrawStore: yup.number().default(0).required(),
    //? 0: Datos dependientes de withdrawStore
    pickCode: yup.string().when('withdrawStore', {
      is: 1,
      then: (schema) => schema.required('N° Documento es requerido'),
    }),
    pickName: yup.string().when('withdrawStore', {
      is: 1,
      then: (schema) => schema.required('Nombre es requerido'),
    }),
    clientStreet: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Dirección es requerida'),
    }),
    clientCityZone: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Distrito es requerido'),
    }),
    clientState: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Provincia es requerida'),
    }),
    clientCountry: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('País es requerido'),
    }),
    clientBuildingNumber: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Ingresa número de calle'),
    }),
    clientPostcode: yup.string().when('withdrawStore', {
      is: 0,
      then: (schema) => schema.required('Ingresa tu código postal'),
    }),
    // ? Datos dependientes de boleta o factura
    // extrasUserData: yup.object().nullable(),
  })
  .required();

const CheckoutForm = () => {
  // const [checkBoxPick, setCheckBoxPick] = useState(true);
  const { cart_products = [] } = useCart();
  const router = useRouter();
  const checkCart = useCartStore((state) => state.checkCart);
  const {
    register,
    handleSubmit,
    watch,
    unregister,
    setValue,
    formState: { isValid, isSubmitSuccessful, isSubmitting },
  } = useForm<CheckoutInfo>({
    defaultValues: {
      ptId: 2,
      withdrawStore: 0,
      shippingCost: 0,
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const watchWithdrawStore = watch('withdrawStore');
  const watchPdId = watch('ptId');

  const onSelect = (id: DeliveryOptions) => {
    setValue('withdrawStore', id);
  };

  const onSubmit = async (data: CheckoutInfo) => {
    try {
      const checkout = generateCheckout(data, cart_products);
      const { data: checkoutData, error: checkoutError } =
        await createCheckout(checkout);
      if (checkoutError) {
        return errorToast(
          checkoutError?.message ||
            'Ocurrió un error por favor inténtalo más tarde'
        );
      }
      checkCart();
      router.refresh();
      return router.push(`/checkout/${checkoutData?.data.token}`);
    } catch (error) {
      return errorToast(
        'Ocurrió un error creando el pedido, por favor inténtalo nuevamente'
      );
    }
  };

  useEffect(() => {
    if (watchWithdrawStore == 1) {
      unregister('clientStreet');
      unregister('clientCityZone');
      unregister('clientState');
      unregister('clientCountry');
    }

    if (watchWithdrawStore == 0) {
      unregister('pickCode');
      unregister('pickName');
    }
  }, [watchWithdrawStore, unregister]);

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
            <Input
              className="!invalid:border-red-400"
              label="Correo electrónico"
              {...register('clientEmail')}
            />
            <div className="grid lg:grid-cols-2 gap-4">
              <Input {...register('clientName')} label="Nombre" />
              <Input label="Apellido" {...register('clientLastName')} />

              <Input label="Teléfono" {...register('clientPhone')} />
              <Input label="Dni" {...register('code')} />
            </div>
          </div>
        </div>
        {/* OPCIÓN DE ENTREGA */}
        <div className="pt-8">
          <h3 className="text-xl font-medium">Opción de entrega</h3>
          <div className="pt-4">
            <OptionsDeliveryRadio
              defaultValue={watchWithdrawStore}
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
                {/* <Input label="zip" /> */}
                {/* <Input label="Teléfono" {...register('clientPhone')} /> */}
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

              {/* <Checkbox
                onChange={(e) => setCheckBoxPick(e.target.checked)}
                label="Yo mismo lo iré a buscar"
              /> */}
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
              defaultValue={watchPdId}
              options={paymentOptions.filter((opt) => opt.active)}
              onSelect={(id) => setValue('ptId', id)}
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
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
