import {
  BuildingStorefrontIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { STORE_URL } from '../../../../constants';

const BlogHeader = () => {
  return (
    <header className="bg-app-primary h-16 w-full px-8 flex items-center justify-between fixed top-0 left-0 z-40">
      <Link href={'/blog'} className="flex items-center">
        <Image
          width={160}
          height={45}
          src="/images/logo.png"
          alt="logo barbadens"
        />
        <span className="text-white"> | Blog</span>
      </Link>
      <div className="text-sm text-white flex items-center gap-2">
        <Link
          href={'/create'}
          target="_blank"
          className="duration-300 hover:text-app-accent"
        >
          <span className="hidden sm:block"> Construye tu camisa</span>
          <PlusCircleIcon
            title="Construye tu camisa"
            width={20}
            height={20}
            className="block sm:hidden"
          />
        </Link>
        <span>|</span>
        <Link
          target="_blank"
          href={STORE_URL}
          className="duration-300 hover:text-app-accent"
        >
          <span className="hidden sm:block"> Ir a la tienda</span>
          <BuildingStorefrontIcon
            title="Ir a la tienda"
            width={20}
            height={20}
            className="block sm:hidden"
          />
        </Link>
      </div>
    </header>
  );
};

export default BlogHeader;
