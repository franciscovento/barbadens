'use client';
import { successToast } from '@/services/modals/appModal';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import BasicTable from '@/ui/organisms/table/BasicTable';
import FilterMenu from '@/ui/organisms/table/FilterMenu';
import Pagination from '@/ui/organisms/table/Pagination';
import useOrders from '@/utils/hooks/useOrders.hooks';
import { createClient } from '@/utils/supabase/client';
import { ChannelResponse } from '@/utils/types/channelResponse.interface';
import { Order, OrderStatus } from '@/utils/types/order.interface';

interface Props {
  searchParams: {
    limit?: string;
    offset?: string;
    status?: string;
  };
}
const Page = ({ searchParams }: Props) => {
  const GAP = 4;
  const offset = Number(searchParams?.offset) || 0;
  const limit = Number(searchParams?.limit) || 4;
  const status = (searchParams.status as OrderStatus) || null;

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useOrders(offset, limit, status);

  const supabase = createClient();

  const handleInserts = (payload: any) => {
    const response = payload as ChannelResponse<Order>;
    mutate();
    successToast('Nueva orden recibida!');
  };

  supabase
    .channel('orders')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      handleInserts
    )
    .subscribe();

  return (
    <>
      <StepTitle title="Últimas ordenes" />
      {isLoading && <div>Cargando....</div>}
      {error && <div>Ocurrió un error...</div>}

      <div className="overflow-x-auto pb-8">
        {orders && (
          <>
            <FilterMenu />
            <div className="bg-white p-4 min-h-[calc(100vh-320px)]">
              {orders.length > 0 ? (
                <BasicTable orders={orders} mutate={mutate} />
              ) : (
                <div className="flex items-center justify-center pt-12">
                  Esta lista está vacía...
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Pagination
        gap={GAP}
        offset={offset}
        limit={limit}
        totalItems={orders?.length || 0}
      />
    </>
  );
};

export default Page;
