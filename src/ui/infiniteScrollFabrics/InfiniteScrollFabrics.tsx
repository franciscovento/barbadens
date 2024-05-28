'use client';

import { fetchProducts } from '@/app/actions';
import { fabrics } from '@/utils/data/fabrics';
import { Product } from '@/utils/types/products.interface';
import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import FabricCard from '../fabricCard/FabricCard';

interface Props {
  initialData: Product[];
  nextPage?: string;
}
const InfiniteScrollFabrics: FC<Props> = ({ initialData, nextPage }) => {
  console.log(nextPage);

  const [data, setData] = useState(initialData);
  const [next, setNext] = useState<string | undefined>(nextPage);
  const [ref, inView] = useInView();

  async function loadMoreProducts() {
    if (next === undefined) return;
    const offset = Number(new URLSearchParams(next).get('offset'));
    const products = await fetchProducts({ offset });
    setData((prevData) => [...prevData, ...products.items]);
    setNext(products.next || undefined);
  }

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <>
      {data.map((product) => (
        <FabricCard
          key={product.id}
          description={fabrics[0].description}
          fabricType={fabrics[0].fabricType}
          image={fabrics[0].image}
          name={fabrics[0].name}
          price={fabrics[0].price}
          discount={product.id}
          isNew={fabrics[0].isNew}
          id={fabrics[0].id}
        />
      ))}
      {next && (
        <div
          ref={ref}
          className="col-span-full flex items-center justify-center "
        >
          <svg
            className="animate-spin"
            width="53"
            height="53"
            viewBox="0 0 53 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="26.5" cy="26.5" r="26.5" fill="#ECEDF1" />
            <circle cx="14.5" cy="16.5" r="5.5" fill="white" />
            <circle cx="14.5" cy="37.5" r="5.5" fill="white" />
            <circle cx="37.5" cy="16.5" r="5.5" fill="white" />
            <circle cx="37.5" cy="37.5" r="5.5" fill="white" />
          </svg>
        </div>
      )}
    </>
  );
};

export default InfiniteScrollFabrics;
