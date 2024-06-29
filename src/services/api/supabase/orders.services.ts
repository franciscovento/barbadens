import { createClient } from '@/utils/supabase/client';
import { Order, OrderStatus } from '@/utils/types/order.interface';

const supabase = createClient();

const getOrders = async (
  offset: number,
  limit: number,
  status?: OrderStatus | null
) => {
  console.log(offset, limit);

  const query = supabase
    .from('orders')
    .select('*')
    .range(offset, limit)
    .order('created_at', { ascending: false });

  if (status) {
    query.eq('status', status);
  }

  const { data, error } = await query.returns<Order[]>();

  return {
    data,
    error,
  };
};

export { getOrders };
