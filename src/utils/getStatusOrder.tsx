import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  TruckIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { OrderStatus } from './types/order.interface';

type OrderStatusObject = Record<
  OrderStatus,
  { icon: React.ReactNode; color: string; text: string }
>;

const orderStatusObj: OrderStatusObject = {
  pending: {
    icon: <ExclamationCircleIcon />,
    color: 'amber',
    text: 'pendiente',
  },
  confirmed: {
    icon: <CurrencyDollarIcon />,
    color: 'light-green',
    text: 'confirmado',
  },
  shipped: {
    icon: <TruckIcon />,
    color: 'blue',
    text: 'en camino',
  },
  delivered: {
    icon: <CheckCircleIcon />,
    color: 'green',
    text: 'entregado',
  },
  cancelled: {
    icon: <XCircleIcon />,
    color: 'red',
    text: 'cancelado',
  },
};

const getStatusOrder = (statusOrder: OrderStatus) => {
  return orderStatusObj[statusOrder];
};

export { getStatusOrder };
