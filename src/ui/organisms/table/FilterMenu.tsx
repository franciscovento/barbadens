'use client';

import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  ListBulletIcon,
  TruckIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FC } from 'react';

const orderStatus = [
  {
    accessor: 'confirmed',
    name: 'confirmados',
    icon: <CurrencyDollarIcon width={18} height={18} />,
  },
  {
    accessor: 'pending',
    name: 'pendiente',
    icon: <ExclamationCircleIcon width={18} height={18} />,
  },
  {
    accessor: 'shipped',
    name: 'en camino',
    icon: <TruckIcon width={18} height={18} />,
  },
  {
    accessor: 'delivered',
    name: 'entregado',
    icon: <CheckCircleIcon width={18} height={18} />,
  },
  {
    accessor: 'cancelled',
    name: 'cancelado',
    icon: <XCircleIcon width={18} height={18} />,
  },
];

const FilterMenu = () => {
  const querySearch = useSearchParams();
  const pathName = usePathname();
  const currentStatus = querySearch.get('status');
  const router = useRouter();
  const action = (status: string) => {
    if (status === 'all') {
      return router.push(pathName + '?status=');
    }
    return router.push(`${pathName}?status=${status}`);
  };
  console.log(currentStatus);

  return (
    <div className="w-full h-11 mt-8 rounded-t-xl flex items-center bg-app-background gap-1">
      <ChipButton isActive={!currentStatus} action={() => action('all')}>
        <ListBulletIcon />
        Todos
      </ChipButton>
      {orderStatus.map((status) => (
        <ChipButton
          key={status.accessor}
          isActive={currentStatus === status.accessor}
          action={() => action(status.accessor)}
        >
          {status.icon}
          <p className="text-nowrap"> {status.name}</p>
        </ChipButton>
      ))}
    </div>
  );
};

export default FilterMenu;

interface Props {
  children: React.ReactNode;
  action: () => void;
  isActive: boolean;
}
const ChipButton: FC<Props> = ({ children, action, isActive }) => {
  return (
    <button
      onClick={action}
      className={clsx(
        'pl-4 pr-8 bg-white duration-300  text-app-text h-full rounded-[5px_20px_0px_0px] flex items-center gap-2',
        {
          'opacity-45': !isActive,
        }
      )}
    >
      {children}
    </button>
  );
};
