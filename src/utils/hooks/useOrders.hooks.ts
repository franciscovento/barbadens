import { getOrders } from '@/services/api/supabase/orders.services';
import { errorToast } from '@/services/modals/appModal';
import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { OrderStatus, OrderWithProducts } from '../types/order.interface';

const useOrders = (offset: number, limit: number, status?: OrderStatus) => {
  const [data, setData] = useState<OrderWithProducts[] | null>(null);
  const [error, setError] = useState<PostgrestError | unknown>();
  const [isLoading, setIsLoading] = useState(true);

  const mutate = async () => {
    try {
      const { data, error } = await getOrders(offset, limit, status);
      if (error) {
        throw error;
      }
      setData(data);
    } catch (error) {
      errorToast('Ocurrió un error actualizando la data');
    }
  };

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const { data, error } = await getOrders(offset, limit, status);
        if (error) {
          throw error;
        }
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitData();
  }, [offset, limit, status]);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useOrders;
