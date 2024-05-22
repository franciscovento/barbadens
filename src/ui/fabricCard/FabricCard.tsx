'use client';
import { appModal } from '@/services/modals/appModal';
import Image from 'next/image';
import Link from 'next/link';
const FabricCard = () => {
  const showFabricModal = () => {
    appModal.fire({
      width: 900,
      title: 'Fabric Modal',
      html: (
        <div className="grid sm:grid-cols-2">
          <div>
            <Image
              src="/images/tela-test.png"
              alt=""
              className="w-full"
              width={900}
              height={900}
            />
          </div>
          <div>Detales de la tela</div>
        </div>
      ),
    });
  };

  return (
    <article className="grid  rounded-md text-sm  hover:shadow-[rgba(0,_0,_0,_0.09)_0px_3px_12px] hover:scale-105 duration-300 ">
      <h3 className="font-bold px-4 py-2 capitalize">
        celeste 100% algodón pima
      </h3>
      <div onClick={showFabricModal} className="relative group cursor-pointer">
        <Image
          className="w-full max-h-44 "
          src="/images/tela-test.png"
          alt="tela"
          width={240}
          height={240}
          // className="object-cover"
        />
        <div className=" bg-white rounded-full w-10 h-10 flex items-center justify-center absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-700">
          <svg
            width="30"
            height="20"
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_164_2708)">
              <path
                d="M15 13.75C17.0711 13.75 18.75 12.0711 18.75 10C18.75 7.92893 17.0711 6.25 15 6.25C12.9289 6.25 11.25 7.92893 11.25 10C11.25 12.0711 12.9289 13.75 15 13.75Z"
                fill="#377DD7"
              />
              <path
                d="M28.7603 8.98047C27.21 6.58281 25.1984 4.54609 22.9437 3.09004C20.4494 1.47754 17.6955 0.625 14.9803 0.625C12.4889 0.625 10.0391 1.33691 7.69882 2.74082C5.3123 4.17227 3.15019 6.26348 1.27226 8.95586C1.06026 9.26014 0.943504 9.62058 0.936827 9.99137C0.93015 10.3622 1.03385 10.7266 1.23476 11.0383C2.78222 13.46 4.77382 15.4996 6.99336 16.9357C9.49238 18.5547 12.1818 19.375 14.9803 19.375C17.7172 19.375 20.4769 18.5295 22.9607 16.9305C25.2143 15.4791 27.2217 13.4348 28.7662 11.0172C28.9602 10.7127 29.0628 10.359 29.0617 9.99797C29.0607 9.63696 28.9561 9.28382 28.7603 8.98047V8.98047ZM15.0002 15.625C13.8877 15.625 12.8001 15.2951 11.8751 14.677C10.9501 14.0589 10.2291 13.1804 9.80337 12.1526C9.37763 11.1248 9.26623 9.99376 9.48328 8.90262C9.70032 7.81147 10.236 6.80919 11.0227 6.02252C11.8094 5.23585 12.8117 4.70013 13.9028 4.48308C14.994 4.26604 16.125 4.37744 17.1528 4.80318C18.1806 5.22892 19.0591 5.94989 19.6772 6.87492C20.2953 7.79994 20.6252 8.88748 20.6252 10C20.6235 11.4913 20.0303 12.9211 18.9758 13.9756C17.9213 15.0301 16.4915 15.6233 15.0002 15.625V15.625Z"
                fill="#377DD7"
              />
            </g>
            <defs>
              <clipPath id="clip0_164_2708">
                <rect width="30" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base">Container</h3>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          quia unde corporis alias eveniet ut optio dicta eos tempora, aperiam
          qui.
        </p>
        <div className="pt-4 text-right">
          <Link href={'/create/1231/personaliza'} className="duration-300 ">
            <button className="flex items-end justify-end gap-2 duration-700 border-b border-transparent hover:border-text">
              Seleccionar tela{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FabricCard;
