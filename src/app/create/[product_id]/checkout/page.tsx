'use client';
import { Alert, Input } from '@/ui/materialComponents';
import OptionsDeliveryRadio from '@/ui/OptionsDeliveryRadio/OptionsDeliveryRadio';
import StepTitle from '@/ui/stepTitle/StepTitle';

const Checkout = () => {
  const onSelect = (id: string) => {
    console.log(id);
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
        {/* DATOS DEL DELIVERY */}
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
      </div>
      <div>
        <div className=" bg-background p-8">
          <h3 className="text-xl font-medium">Resumen de compra</h3>
          <div></div>
        </div>
      </div>
      {/* <Link href={`/create/${params.product_id}/medidas`}> Medidas</Link> */}
    </div>
  );
};

export default Checkout;
