// 'use client';

// import { fetchFabrics } from '@/app/(store)/create/actions';
// import { errorToast } from '@/services/modals/appModal';
// import { fabrics } from '@/utils/data/fabrics';
// import { Fabric } from '@/utils/types/fabrics.interface';
// import { FC, useCallback, useEffect, useRef, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import FabricCard from '../../molecules/fabricCard/FabricCard';

// interface Props {
//   initialData: Fabric[];
// }
// const InfiniteScrollFabrics: FC<Props> = ({ initialData }) => {
//   const LIMIT = 10;
//   const [data, setData] = useState(initialData);
//   const [next, setNext] = useState<boolean | undefined>(true);
//   const [ref, inView] = useInView();
//   const nextRef = useRef({ offset: 11, limit: 20 });

//   const loadMoreProducts = useCallback(async () => {
//     console.log('loading more products');
//     const { data: fabrics, error } = await fetchFabrics(
//       nextRef.current.offset,
//       nextRef.current.limit
//     );

//     if (error) {
//       console.log('error', error);

//       return errorToast(error.message);
//     }

//     if (fabrics && fabrics?.length < LIMIT) {
//       setNext(false);
//     }

//     if (fabrics && fabrics?.length > 0) {
//       setData((prevData) => [...prevData, ...fabrics]);
//       nextRef.current = {
//         offset: nextRef.current.limit + 1,
//         limit: nextRef.current.limit + LIMIT,
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (inView) {
//       loadMoreProducts();
//     }
//   }, [inView, loadMoreProducts]);

//   useEffect(() => {
//     if (nextRef.current === undefined) {
//       setNext(false);
//     }
//   }, [nextRef]);

//   return (
//     <>
//       {data.map((fabric) => (
//         <FabricCard
//           key={fabric.id}
//           description={fabric.description || 'No description'}
//           fabricType={fabric.fabric_type || 'No type'}
//           image={fabrics[0].image}
//           name={fabric.name}
//           price={fabric.price}
//           discount={fabric.discount ? fabric.discount : undefined}
//           isNew={fabric.featured}
//           id={fabric.id.toString()}
//         />
//       ))}
//       {next && (
//         <div
//           ref={ref}
//           className="col-span-full flex items-center justify-center "
//         >
//           <svg
//             className="animate-spin"
//             width="53"
//             height="53"
//             viewBox="0 0 53 53"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle cx="26.5" cy="26.5" r="26.5" fill="#ECEDF1" />
//             <circle cx="14.5" cy="16.5" r="5.5" fill="white" />
//             <circle cx="14.5" cy="37.5" r="5.5" fill="white" />
//             <circle cx="37.5" cy="16.5" r="5.5" fill="white" />
//             <circle cx="37.5" cy="37.5" r="5.5" fill="white" />
//           </svg>
//         </div>
//       )}
//     </>
//   );
// };

// export default InfiniteScrollFabrics;
'use client';

import { fetchFabrics } from '@/app/(store)/create/actions';
import { Fabric } from '@/utils/types/bsale/fabrics.interface';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import FabricCard from '../../molecules/fabricCard/FabricCard';

interface Props {
  initialData: Fabric[];
  nextPage?: string;
}
const InfiniteScrollFabrics: FC<Props> = ({ initialData, nextPage }) => {
  const [data, setData] = useState(initialData);
  const [next, setNext] = useState<string | undefined>(nextPage);
  const [ref, inView] = useInView();
  const nextRef = useRef(next);
  nextRef.current = next;
  const loadMoreProducts = useCallback(async () => {
    console.log('loading more products');
    const nextPageUrl = nextRef.current;
    if (nextPageUrl === undefined) return;
    const offset = Number(new URLSearchParams(nextPageUrl).get('offset'));
    const fabrics = await fetchFabrics({ offset });
    setData((prevData) => [...prevData, ...fabrics.data]);
    setNext(fabrics.next || undefined);
  }, []);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView, loadMoreProducts]);

  return (
    <>
      {data.map((fabric) => (
        <FabricCard
          key={fabric.id}
          description={`Disponibilidad: ${fabric.totalStock.toString()}`}
          fabricType={fabric.displayNotice}
          image={fabric.urlImg}
          name={fabric.name}
          price={fabric.variant.finalPrice}
          discount={
            fabric.variant.discount.percent > 0
              ? fabric.variant.discount.percent
              : undefined
          }
          isNew={fabric.order < 6}
          id={fabric.idVariantDefault.toString()}
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
