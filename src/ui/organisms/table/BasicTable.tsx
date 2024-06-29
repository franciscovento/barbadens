'use client';
import { appModal, errorToast } from '@/services/modals/appModal';
import { appSidebar } from '@/services/sidebar/appSidebar';
import ConfirmPayment from '@/ui/templates/confirmPayment/ConfirmPayment';
import { generateDocument } from '@/utils/generateDocument';
import { getStatusOrder } from '@/utils/getStatusOrder';
import { OrderStatus, OrderWithProducts } from '@/utils/types/order.interface';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/alert';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  orders: OrderWithProducts[];
  mutate: () => void;
}

const BasicTable: FC<Props> = ({ orders, mutate }) => {
  const [data, setData] = useState(orders);
  const isFirstTime = useRef(true);

  const columns = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
      },
      {
        header: 'Nombre',
        accessorFn: (info: OrderWithProducts) =>
          info.checkout_info.clientName +
          ' ' +
          info.checkout_info.clientLastName,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }: { getValue: () => OrderStatus }) => {
          const status = getStatusOrder(getValue()); // "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"

          return (
            <Chip
              className="text-center w-fit text-[11px]"
              value={status.text}
              color={status.color as color}
              icon={status.icon}
            />
          );
        },
      },
      {
        header: 'Costo de envío',
        accessorKey: 'shipping_cost',
      },
      {
        header: 'Costo productos',
        accessorKey: 'total_products',
      },
      {
        header: 'Total',
        accessorFn: (info: OrderWithProducts) =>
          info.total_products + info.shipping_cost,
      },
      {
        id: 'actions',
        header: ' ',
        cell: ({ row }: { row: any }) => {
          return (
            <Menu>
              <MenuHandler>
                <EllipsisVerticalIcon className="cursor-pointer block w-7 h-7" />
              </MenuHandler>
              <MenuList>
                {row.original.status === 'pending' && (
                  <MenuItem onClick={() => confirmPayment(row.original)}>
                    Confirmar pago
                  </MenuItem>
                )}
                <MenuItem onClick={() => viewCheckOut(row.original)}>
                  Ver checkout
                </MenuItem>
              </MenuList>
            </Menu>
          );
        },
      },
    ],
    []
  );

  const makeAnAction = useCallback((_id: number) => {
    console.log(_id);
  }, []);

  const confirmPayment = useCallback(async (order: OrderWithProducts) => {
    try {
      const { isConfirmed } = await appModal.fire({
        html: <ConfirmPayment order={order} />,
        confirmButtonText: 'Confirmar pago',
        reverseButtons: true,
        showCancelButton: true,
        showConfirmButton: true,
      });
      if (isConfirmed) {
        const doc = generateDocument(order);
        await axios.post('/api/document', {
          data: doc,
          order_id: order.id,
        });
        mutate();
      }
    } catch (error) {
      errorToast('ocurrió un inténtalo de nuevo más tarde');
    }
  }, []);

  const viewCheckOut = useCallback((order: OrderWithProducts) => {
    appSidebar.fire({
      html: JSON.stringify(order),
    });
  }, []);

  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!isFirstTime.current) {
      setData(orders);
    }

    isFirstTime.current = false;
  }, [orders]);

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-2 text-app-text text-sm font-semibold"
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {/* Handles all possible header column def scenarios for `header` */}

                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          );
        })}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="bg-white hover:bg-gray-100 duration-100 ">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicTable;
