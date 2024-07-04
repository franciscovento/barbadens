'use client';
import { objectToQueryString } from '@/utils/objectToQueryString';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

interface Props {
  gap: number;
  limit: number;
  offset: number;
  totalItems: number;
}
const Pagination: FC<Props> = ({ limit, offset, totalItems, gap }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let hasNext = !(totalItems < gap);
  let hasPrev = !(offset <= 0);

  let obj = Object.fromEntries(searchParams.entries());

  const nextPage = () => {
    if (totalItems < gap) return null;
    const newOffset = limit + 1;
    const newLimit = newOffset + gap;
    obj = {
      ...obj,
      offset: newOffset.toString(),
      limit: newLimit.toString(),
    };
    objectToQueryString(obj);
    router.push(pathname + `?${objectToQueryString(obj)}`);
  };

  const prevPage = () => {
    if (offset <= 0) return null;
    const newLimit = offset - 1;
    const newOffset = newLimit - gap < 0 ? 0 : newLimit - gap;
    obj = {
      ...obj,
      offset: newOffset.toString(),
      limit: newLimit.toString(),
    };
    objectToQueryString(obj);
    router.push(pathname + `?${objectToQueryString(obj)}`);
  };

  return (
    <div className="flex items-center gap-4 flex-wrap justify-end">
      <Button
        disabled={!hasPrev}
        variant="outlined"
        size="sm"
        onClick={prevPage}
        className="flex items-center"
      >
        <ChevronLeftIcon width={11} height={11} />
        Anterior
      </Button>
      <Button
        disabled={!hasNext}
        variant="outlined"
        size="sm"
        onClick={nextPage}
        className="flex items-center"
      >
        Siguiente
        <ChevronRightIcon width={11} height={11} />
      </Button>
    </div>
  );
};

export default Pagination;
