'use client';
import { errorToast } from '@/services/modals/appModal';
import { createClient } from '@/utils/supabase/client';
import { GetDesignResponse } from '@/utils/types/design.interface';
import { Spinner } from '@material-tailwind/react';
import React, { FC, useEffect, useState } from 'react';

interface Props {
  shirt_design_id: number;
  size?: number;
}
const ClientDesign: FC<Props> = ({ shirt_design_id, size = 400 }) => {
  const [loading, setIsLoading] = useState(true);
  const [design, setDesign] = React.useState<GetDesignResponse>();
  useEffect(() => {
    const getShirtDesignById = async () => {
      try {
        const supabase = createClient();
        const { data: design } = await supabase
          .from('shirt_designs')
          .select('*, shirt_collars(*), shirt_cuffs(*), shirt_pockets(*)')
          .eq('id', shirt_design_id)
          .single<GetDesignResponse>();
        if (design) setDesign(design);
      } catch (error) {
        errorToast('Error al cargar el diseño de la camisa');
      } finally {
        setIsLoading(false);
      }
    };
    getShirtDesignById();
  }, [shirt_design_id]);

  if (loading)
    return (
      <div
        className="flex justify-center items-center"
        style={{
          width: size,
          height: size,
        }}
      >
        <Spinner className="h-12 w-12" />
      </div>
    );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 415 438"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M198.6 403.699C198.6 298.999 198.6 194.299 198.6 89.4995C198.6 81.2995 198.6 73.0994 198.6 64.8994"
          stroke="#797E91"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask
          id="mask0_233_569"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x="86"
          y="42"
          width="239"
          height="356"
        >
          <path
            d="M307.8 190.399C307.9 248.399 308 335.099 308.1 393.099C274.1 396.399 245.4 397.599 212.6 397.599L199.8 396.899C167.1 396.899 137.3 398.999 103.3 395.699C103.4 337.699 103.5 248.399 103.6 190.399C103.6 180.899 103.6 171.299 103.4 161.799C102.6 129.899 99.4 97.9995 86.4 69.4995C86.5 69.3995 86.5 69.3994 86.6 69.2994C90 66.4994 94.2 64.9994 98.3 63.3994C117.4 56.3994 136.5 49.3994 155.6 42.3994C158.9 51.7994 166.2 59.5994 175 64.3994C184.3 69.4994 194.9 71.0994 205.7 71.0994C216.4 71.0994 227.1 69.4994 236.4 64.3994C245.2 59.5994 252.6 51.7994 255.8 42.3994C274.9 49.3994 294 56.3994 313.1 63.3994C317.2 64.8994 321.4 66.4994 324.8 69.2994C324.9 69.3994 325 69.3995 325 69.4995C312 97.9995 308.8 129.899 308 161.799C307.8 171.299 307.8 180.899 307.8 190.399Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0_233_569)">
          <path
            d="M101.4 146.499C108.8 138.699 118.2 132.999 128.5 129.899"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M102 156.4C110.1 153.2 118.7 151.3 127.5 150.8"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M116.1 192.1C114.9 221.4 114.8 250.8 115.7 280.1"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M100.2 349.499C119.6 350.199 139.6 383.699 159 384.299"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M303.8 69.2994C289 61.4994 273 55.9994 256.5 52.8994"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M309.9 146.499C302.5 138.699 293.1 132.999 282.8 129.899"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M309.4 156.4C301.3 153.2 292.7 151.3 283.9 150.8"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M295.3 192.1C296.5 221.4 296.6 250.8 295.7 280.1"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M311.2 349.499C291.8 350.199 272 383.299 252.6 383.999"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M107.6 69.2994C122.4 61.4994 138.4 55.9994 154.9 52.8994"
            stroke="#E4E5EB"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <path
          d="M308.1 372.3C308.1 369.7 308.1 367 308.1 364.4C308 306.4 307.9 248.4 307.8 190.4C307.8 180.9 307.8 171.3 308 161.8C308.8 129.9 312 97.9998 325 69.4998C324.9 69.3998 324.9 69.3998 324.8 69.2998C321.4 66.4998 317.2 64.9998 313.1 63.3998C294 56.3998 274.9 49.3998 255.8 42.3998C253 41.3998 243.3 40.2998 240.4 39.2998C240.1 40.2998 204.5 63.7998 178.8 47.3998C177.9 46.8998 170 40.2998 169.7 39.2998C166.9 40.3998 158.3 41.3998 155.5 42.3998C136.4 49.3998 117.3 56.3998 98.2 63.3998C94.1 64.8998 89.9 66.4998 86.5 69.2998C86.4 69.3998 86.3 69.3998 86.3 69.4998C99.3 97.9998 102.5 129.9 103.3 161.8C103.5 171.4 103.5 181 103.5 190.4C103.4 248.4 103.3 306.4 103.2 364.4C103.2 367 103.2 369.7 103.2 372.3"
          stroke="#3B536B"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M210.2 403.7C210.2 298.9 210.2 194.1 210.2 89.1996C210.2 80.9996 210.2 72.7996 210.2 64.5996"
          stroke="#3B536B"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.09"
          d="M309.1 138.8C309.1 138.8 296.2 129.4 289.7 127.5C289.7 127.5 290.2 373 290.2 375.9C290.2 378.8 290.1 391 290.1 391C290.1 391 293 389.4 299 382.8C305 376.2 308.1 372.4 308.1 372.4L308 229.2C308 229.2 307.9 164.1 308 162.7C308 161.2 308.3 140.7 309.1 138.8Z"
          fill="#383838"
        />
        <path
          opacity="0.09"
          d="M102.2 137.5C102.2 137.5 104.9 132.5 109.7 130.6L112 376.5C107.4 373.4 103.5 371.8 103.5 371.8L103.6 228.6C103.6 228.6 103.7 163.5 103.6 162.1C103.5 160.7 103 139.4 102.2 137.5Z"
          fill="#383838"
        />
        <path
          d="M308 372V371.8C303 373.8 299.8 375.2 288.8 387.5C276.4 401.3 260.8 403.8 260.8 403.8H208.3H150.5C150.5 403.8 134.9 401.4 122.5 387.5C111.6 375.3 108.3 373.8 103.3 371.8V372C103.3 372 102.6 374.1 105.9 378.8C108.2 382 118.8 398.9 129.9 405.9C141 412.9 158.9 415.4 158.9 415.4C158.9 415.4 183.3 415.4 208.2 415.2C231.2 415.4 252.3 415.4 252.3 415.4C252.3 415.4 270.2 412.9 281.3 405.9C292.4 398.9 303 382 305.3 378.8C308.7 374.1 308 372 308 372Z"
          fill="#B3BFC2"
        />
        <path
          d="M308 372V371.8C303 373.8 299.8 375.2 288.8 387.5C276.4 401.3 260.8 403.8 260.8 403.8H208.3H150.5C150.5 403.8 134.9 401.4 122.5 387.5C111.6 375.3 108.3 373.8 103.3 371.8V372C103.3 372 102.6 374.1 105.9 378.8C108.2 382 118.8 398.9 129.9 405.9C141 412.9 158.9 415.4 158.9 415.4C158.9 415.4 183.3 415.4 208.2 415.2C231.2 415.4 252.3 415.4 252.3 415.4C252.3 415.4 270.2 412.9 281.3 405.9C292.4 398.9 303 382 305.3 378.8C308.7 374.1 308 372 308 372Z"
          stroke="#3B536B"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M204.7 81.3996C206.025 81.3996 207.1 80.3251 207.1 78.9996C207.1 77.6742 206.025 76.5996 204.7 76.5996C203.374 76.5996 202.3 77.6742 202.3 78.9996C202.3 80.3251 203.374 81.3996 204.7 81.3996Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 122.699C206.025 122.699 207.1 121.625 207.1 120.299C207.1 118.974 206.025 117.899 204.7 117.899C203.374 117.899 202.3 118.974 202.3 120.299C202.3 121.625 203.374 122.699 204.7 122.699Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 163.9C206.025 163.9 207.1 162.825 207.1 161.5C207.1 160.174 206.025 159.1 204.7 159.1C203.374 159.1 202.3 160.174 202.3 161.5C202.3 162.825 203.374 163.9 204.7 163.9Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 205.199C206.025 205.199 207.1 204.125 207.1 202.799C207.1 201.474 206.025 200.399 204.7 200.399C203.374 200.399 202.3 201.474 202.3 202.799C202.3 204.125 203.374 205.199 204.7 205.199Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 246.499C206.025 246.499 207.1 245.425 207.1 244.099C207.1 242.774 206.025 241.699 204.7 241.699C203.374 241.699 202.3 242.774 202.3 244.099C202.3 245.425 203.374 246.499 204.7 246.499Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 287.8C206.025 287.8 207.1 286.725 207.1 285.4C207.1 284.074 206.025 283 204.7 283C203.374 283 202.3 284.074 202.3 285.4C202.3 286.725 203.374 287.8 204.7 287.8Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 328.999C206.025 328.999 207.1 327.925 207.1 326.599C207.1 325.274 206.025 324.199 204.7 324.199C203.374 324.199 202.3 325.274 202.3 326.599C202.3 327.925 203.374 328.999 204.7 328.999Z"
          fill="#3B536B"
        />
        <path
          d="M204.7 370.3C206.025 370.3 207.1 369.225 207.1 367.9C207.1 366.574 206.025 365.5 204.7 365.5C203.374 365.5 202.3 366.574 202.3 367.9C202.3 369.225 203.374 370.3 204.7 370.3Z"
          fill="#3B536B"
        />
      </g>

      {/* COLLARS */}
      {design?.shirt_collars && (
        <g
          dangerouslySetInnerHTML={{
            __html: design?.shirt_collars.component,
          }}
        ></g>
      )}
      {/* POCKETS */}
      {design?.shirt_collars && (
        <g
          dangerouslySetInnerHTML={{
            __html: design?.shirt_pockets.component,
          }}
        ></g>
      )}
      {/* SLEEVES */}
      {design?.sleeve_type === 'manga corta' && (
        <g>
          <mask
            id="mask0_236_592"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x="39"
            y="69"
            width="65"
            height="120"
          >
            <path
              d="M103.4 161.7C98.8 171.1 93.3 180.1 87.2 188.6C70 181.8 53.8 172.5 39.4 161C51.9 135.2 64.6 109.1 77.3 82.9004C79.7 78.0004 82.2 72.9004 86.3 69.4004C99.4 97.9004 102.6 129.8 103.4 161.7Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_236_592)">
            <path
              d="M74 116.1C78.9 103.9 85.5 92.3004 93.6 81.9004"
              stroke="#E4E5EB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M58.9 158.9C66.5 166.9 75.6 173.5 85.6 178.3"
              stroke="#E4E5EB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M87.3 172.101C81.6 169.401 76.6 165.301 72.8 160.301"
              stroke="#E4E5EB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M39.4 161C53.8 172.5 70 181.8 87.2 188.6"
            stroke="#797E91"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.09"
            d="M82.7 194.7C84.2 192.7 85.7 190.7 87.2 188.7C93.3 180.2 98.7 171.2 103.4 161.8C103.2 153.3 102.8 144.7 102.1 136.2C85 159.2 71.9 176.2 64.1 186.3C70 189.4 76.2 192.3 82.7 194.7Z"
            fill="#383838"
          />
          <path
            d="M86.4 69.4004C82.3 72.9004 79.7 78.0004 77.4 82.9004C64.7 109.1 52 135.3 39.5 161C38.5 163.1 37.5 165.2 36.5 167.2C50.1 178.8 65.6 188.2 82.8 194.6C84.3 192.6 85.8 190.6 87.3 188.6C93.4 180.1 98.8 171.1 103.5 161.7C102.6 129.8 99.4 97.9004 86.4 69.4004Z"
            stroke="#3B536B"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <mask
            id="mask1_236_592"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x="308"
            y="69"
            width="64"
            height="120"
          >
            <path
              d="M308 161.7C312.6 171.1 318.1 180.1 324.2 188.6C341.4 181.8 357.6 172.5 372 161C359.5 135.2 346.8 109.1 334.1 82.9004C331.7 78.0004 329.2 72.9004 325.1 69.4004C312 97.9004 308.8 129.8 308 161.7Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_236_592)">
            <path
              d="M337.4 116.1C332.5 103.9 325.9 92.3004 317.8 81.9004"
              stroke="#E4E5EB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M352.5 158.9C344.9 166.9 335.8 173.5 325.8 178.3"
              stroke="#E4E5EB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M324.1 172.101C329.8 169.401 334.8 165.301 338.6 160.301"
              stroke="#E4E5EB"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M372 161C357.6 172.5 341.4 181.8 324.2 188.6"
            stroke="#797E91"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.09"
            d="M309.1 138.8C308.5 146.4 308.2 154.1 308 161.8C312.6 171.2 318.1 180.2 324.2 188.7C325.7 190.7 327.2 192.8 328.7 194.7C335 192.4 341 189.6 346.8 186.6C335.3 166.8 320.6 150.2 309.1 138.8Z"
            fill="#383838"
          />
          <path
            d="M325 69.4004C329.1 72.9004 331.7 78.0004 334 82.9004C346.7 109.1 359.4 135.3 371.9 161C372.9 163.1 373.9 165.2 374.9 167.2C361.3 178.8 345.8 188.2 328.6 194.6C327.1 192.6 325.6 190.6 324.1 188.6C318 180.1 312.6 171.1 307.9 161.7C308.8 129.8 312 97.9004 325 69.4004Z"
            stroke="#3B536B"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M312.6 123C322.2 123 335.4 127.6 345.7 132L312.6 123Z"
            fill="#B3BFC2"
          />
          <path
            d="M312.6 123C322.2 123 335.4 127.6 345.7 132"
            stroke="#3B536B"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {/* CUFFS */}
      {design?.shirt_cuffs && (
        <g
          dangerouslySetInnerHTML={{
            __html: design?.shirt_cuffs.component,
          }}
        ></g>
      )}
    </svg>
  );
};

export default ClientDesign;
