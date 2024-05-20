'use client';

import useCustomShirtData from '@/hooks/useCustomShirtData';
import useMeasuresStoreData from '@/hooks/useMeasuresStoreData';

const Checkout = () => {
  const measures = useMeasuresStoreData();
  const customShirt = useCustomShirtData();

  console.log({
    measures,
    customShirt,
  });

  return (
    <div>
      <p>{JSON.stringify(measures)}</p>
      {JSON.stringify(customShirt)}
    </div>
  );
};

export default Checkout;
