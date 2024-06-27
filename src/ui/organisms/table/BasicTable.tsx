'use client';
import { Order } from '@/utils/types/order.interface';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FC, useCallback, useMemo, useState } from 'react';

interface Props {
  orders: Order[];
}

const BasicTable: FC<Props> = ({ orders }) => {
  const [data, setData] = useState(orders);
  const columns = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
      },
      {
        header: 'Nombre',
        accessorFn: (info: Order) =>
          info.checkout_info.clientName +
          ' ' +
          info.checkout_info.clientLastName,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <Chip className="text-center w-fit" value={status} color="amber" />
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
        accessorFn: (info: Order) => info.total_products + info.shipping_cost,
      },
      {
        id: 'actions',
        header: ' ',
        cell: ({ row }) => {
          return (
            <Menu>
              <MenuHandler>
                <EllipsisVerticalIcon className="cursor-pointer block w-7 h-7" />
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => makeAnAction(row.id)}>
                  Menu Item 1
                </MenuItem>
                <MenuItem onClick={() => makeAnAction(row.id)}>
                  Menu Item 2
                </MenuItem>
                <MenuItem onClick={() => makeAnAction(row.id)}>
                  Menu Item 3
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

  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto py-12">
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
            <tr
              key={row.id}
              className="bg-white hover:bg-gray-100 duration-100 "
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
