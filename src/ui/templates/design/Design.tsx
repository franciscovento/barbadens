import {
  getShirtCollarOptions,
  getShirtCuffOptions,
} from '@/services/api/supabase/design.services';
import { createClient } from '@/utils/supabase/server';
import { Pocket } from '@/utils/types/design.interface';
import CollarItem from './CollarItem';
import CuffItem from './CuffItem';
import PocketItem from './PoketItem';
import SleeveItem from './SleeveItem';

interface Props {
  CuffImage: string;
  PocketImage: string;
  CollarImage: string;
}

const Design = async () => {
  const supabase = createClient();
  const { data: collarOptions, error: collarError } =
    await getShirtCollarOptions();
  const { data: pocketOptions, error: pocketError } = await supabase
    .from('shirt_pockets')
    .select('*')
    .returns<Pocket[]>();
  const { data: cuffOptions, error: cuffError } = await getShirtCuffOptions();

  if (collarError || pocketError || cuffError) {
    return <div>Ocurrió un error, inténtalo de nuevo</div>;
  }
  console.log('pocket', pocketOptions);
  return (
    <div className="relative max-w-full max-h-fit w-[600px] h-[600px] bg-red-100">
      {/* BASE SHIRT */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          width={'100%'}
          height={'auto'}
          viewBox="0 0 634 856"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* BASE PATH */}
          <g>
            <path
              d="M263.427 204L154 238.552C161.938 249.88 177.813 278.202 177.813 300.859C177.813 323.516 170.253 340.131 166.474 345.606L177.813 738.705C209.349 755.552 283.021 785.089 348.474 782.883M510.629 751.166C474.91 750.033 459.601 765.893 371.72 780.62C367.25 781.369 362.708 781.93 358.112 782.318M510.629 751.166L495.888 345.606C489.273 335.788 478.765 309.355 489.651 282.167C500.537 254.978 513.086 238.363 518 233.454L413.5 204M510.629 751.166C511.952 752.865 513.804 756.604 510.629 757.963C506.66 759.662 427.283 781.753 358.112 782.318M348.474 782.883L333.165 228.356L343.371 223.825L358.112 782.318M348.474 782.883C351.709 782.774 354.923 782.588 358.112 782.318"
              stroke="black"
            />
          </g>
          {/* COLLAR */}
          {collarOptions && <CollarItem collarOptions={collarOptions} />}

          {/* POCKET */}
          {pocketOptions && <PocketItem pocketOptions={pocketOptions} />}
          {/* SLEEVE  */}
          <SleeveItem />

          {/* CUFF */}
          {cuffOptions && <CuffItem cuffOptions={cuffOptions} />}
        </svg>
      </div>
    </div>
  );
};

export default Design;
