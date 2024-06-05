import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Input } from '@/ui/materialComponents';
import CheckoutStepper from '@/ui/organisms/checkoutStepper/CheckoutStepper';
import LoginRegisterCard from '@/ui/organisms/loginRegisterCard/LoginRegisterCard';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {
  searchParams: {
    returnTo: string;
  };
}
const Page: FC<Props> = ({ searchParams }) => {
  const onLoginSuccess = async () => {
    'use server';
    revalidatePath(searchParams.returnTo);
    redirect(searchParams.returnTo);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  z-40">
        <div className="w-screen overflow-hidden">
          <div className=" bg-white animate-zoomIn p-8 shadow-lg rounded-lg  max-w-full w-[400px] mx-auto">
            <LoginRegisterCard
              onLoginSuccess={onLoginSuccess}
              defaultForm="register"
            />
          </div>
        </div>
      </div>
      <div className="fixed w-full h-full bg-[#00000042] top-0 left-0 z-20"></div>
      <div className="blur-sm ">
        <section
          id="stepper-container"
          className=" max-w-lg mx-auto px-2 md:px-8 py-4 "
        >
          <CheckoutStepper />
        </section>
        <main className="app-container py-12">
          <div className="grid md:grid-cols-2 md:py-8 gap-8 h-[calc(100vh-250px)] overflow-hidden ">
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
                      Camisa a la medida, cuello italiano, sin bolsillo, manga
                      larga
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
        </main>
      </div>
    </div>
  );
};

export default Page;
