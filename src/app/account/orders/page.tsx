import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import { Card, Typography } from '@/ui/materialComponents';
import { createClient } from '@/utils/supabase/server';
import { Order } from '@/utils/types/order.interface';

const Page = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .returns<Order[]>();

  const TABLE_HEAD = ['Order', 'Client', 'Status', 'Total', 'Created'];
  return (
    <>
      <StepTitle title="Últimas ordenes" />

      <Card className="h-full w-full overflow-scroll mt-8">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map(
              ({
                id,
                checkout_info: { clientName, clientLastName },
                status,
                total_products,
                created_at,
              }) => (
                <tr key={id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {clientName} {clientLastName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {total_products}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {String(created_at)}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default Page;
