import { createClient } from '@/utils/supabase/client';
import { OrderStatus, OrderWithProducts } from '@/utils/types/order.interface';

const supabase = createClient();

const getOrders = async (
  offset: number,
  limit: number,
  status?: OrderStatus | null
) => {
  const query = supabase
    .from('orders')
    .select('*, products(*)')
    .range(offset, limit)
    .order('created_at', { ascending: false });

  if (status) {
    query.eq('status', status);
  }

  const { data, error } = await query.returns<OrderWithProducts[]>();

  return {
    data,
    error,
  };
};

export { getOrders };
