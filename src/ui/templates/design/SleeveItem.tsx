'use client';
import { useCustomShirt } from '@/stores';
import { sleeveOptions } from '@/utils/data/shirtOptions';

const SleeveItem = () => {
  const sleeveType = useCustomShirt((state) => state.sleeve_type);
  const currentSleeve = sleeveOptions.find((p) => p.label === sleeveType);
  return currentSleeve?.label === 'manga corta' ? (
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
  ) : null;
};

export default SleeveItem;
