'use client';
import { appSidebar } from '@/services/sidebar/appSidebar';
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

  // const confirmPayment = useCallback(async (order: OrderWithProducts) => {
  //   return appModal
  //     .fire({
  //       html: <ConfirmPayment order={order} />,
  //       showCancelButton: true,
  //       showConfirmButton: true,
  //       confirmButtonText: 'Generar documento',
  //       reverseButtons: true,
  //       showLoaderOnConfirm: true,
  //       preConfirm: async () => {
  //         try {
  //           const doc = generateDocument(order);
  //           const response = await axios.post('/api/document', {
  //             data: doc,
  //             order_id: order.id,
  //           });
  //           mutate();
  //           return response.data;
  //         } catch (error) {
  //           Swal.showValidationMessage(`
  //           Request failed: ${error}
  //         `);
  //         }
  //       },
  //       allowOutsideClick: () => !Swal.isLoading(),
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         appModal.fire({
  //           title: `${result}`,
  //           html: JSON.stringify(result.value),
  //         });
  //       }
  //     });
  // }, []);

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
