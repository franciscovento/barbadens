'use client';
import { appModal, successToast } from '@/services/modals/appModal';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Input } from '@/ui/materialComponents';
import OptionsDeliveryRadio from '@/ui/molecules/OptionsDeliveryRadio/OptionsDeliveryRadio';
import LoginModal from '@/ui/organisms/loginModal/LoginModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

const MockCheckoutForm = () => {
  const router = useRouter();

  const onLoginSuccess = async () => {
    router.refresh();
    successToast('Inicio de sesión exitoso');
  };

  useLayoutEffect(() => {
    const element = document.getElementById('stepper-container');
    element!.style.filter = 'blur(4px)';

    return () => {
      const element = document.getElementById('stepper-container');
      element!.style.filter = 'none';
    };
  }, []);

  useLayoutEffect(() => {
    appModal.fire({
      html: (
        <LoginModal onLoginSuccess={onLoginSuccess} defaultForm="register" />
      ),
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCloseButton: false,
    });
  }, []);

  return (
    <div>
      <div className="w-full h-screen fixed bg-[#6A6A6A2B] z-40 top-0 left-0 overflow-hidden"></div>
      <div className="grid md:grid-cols-2 md:py-8 gap-8 h-[calc(100vh-250px)] overflow-hidden blur-sm">
        <div>
          <StepTitle title="Checkout" />
          {/* INFORMACIÓN DEL CLIENTE */}
          <div className="pt-4">
            <h3 className="text-xl font-medium">Información del cliente</h3>
            <form className="grid gap-4 pt-4">
              <Input disabled label="Correo electrónico" />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input disabled label="Nombre" />
                <Input disabled label="Apellido" />
              </div>
              <Input disabled label="Dirección" />
            </form>
          </div>
          {/* OPCIÓN DE ENTREGA */}
          <div className="pt-8">
            <h3 className="text-xl font-medium">Opción de entrega</h3>
            <div className="pt-4">
              <OptionsDeliveryRadio
                onSelect={() => null}
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
          <div>
            <h3 className="text-xl font-medium pt-8">Datos de delivery</h3>
            <form className="pt-4 flex flex-col gap-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Input disabled label="Nombre del que recibe" />
                <Input disabled label="N° Documento" />
              </div>
              <Input disabled label="Dirección" />
              <Input disabled label="City" />
              <div className="grid lg:grid-cols-2 gap-4">
                <Input disabled label="country" />
                <Input disabled label="state" />
                <Input disabled label="zip" />
                <Input disabled label="phone" />
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className=" bg-app-background p-8">
            <h3 className="text-xl font-medium">Resumen de compra</h3>
            <div className="grid grid-cols-2 items-center gap-2">
              <div className="flex gap-2 items-center pt-4">
                <Image
                  src={'/images/tela1.png'}
                  width={82}
                  height={82}
                  alt=""
                />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockCheckoutForm;
