'use client';
import { successToast } from '@/services/modals/appModal';
import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import BasicTable from '@/ui/organisms/table/BasicTable';
import { createClient } from '@/utils/supabase/client';
import { ChannelResponse } from '@/utils/types/channelResponse.interface';
import { Order } from '@/utils/types/order.interface';
import { useEffect, useState } from 'react';

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const supabase = createClient();

  const handleInserts = (payload: any) => {
    const response = payload as ChannelResponse<Order>;
    setOrders((prev) => {
      let ordersCopy = [...prev];
      ordersCopy.unshift(response.new);
      return ordersCopy;
    });
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

  useEffect(() => {
    const getOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .returns<Order[]>();

      if (error) {
        console.error('error', error);
      } else {
        setOrders(data);
      }
    };

    getOrders();
  }, [supabase]);

  return (
    <>
      <StepTitle title="Últimas ordenes" />
      {orders.length > 0 && <BasicTable orders={orders} />}
    </>
  );
};

export default Page;
