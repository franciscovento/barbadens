'use client';
import { clsx } from 'clsx';

import { FC } from 'react';

interface Props {
  isActive: boolean;
  title: string;
  description: string;
  onClick?: () => void;
}
const SelectCard: FC<Props> = ({ isActive, description, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      className={clsx('cursor-pointer duration-500 w-full', {
        'border border-purple-500 p-4': isActive,
        'border border-[#BDBDBD] p-4 bg-[#F9F9F9]': !isActive,
      })}
    >
      <h3 className="text-sm font-semibold flex items-center gap-2">
        {title}

        <svg
          className={clsx('duration-500', {
            'opacity-0': !isActive,
            'opacity-100': isActive,
          })}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clipPath="url(#clip0_94_251)">
            <path
              d="M18.3333 9.23355V10.0002C18.3323 11.7972 17.7504 13.5458 16.6744 14.9851C15.5985 16.4244 14.0861 17.4773 12.3628 17.9868C10.6395 18.4963 8.79771 18.4351 7.11205 17.8124C5.42639 17.1896 3.9872 16.0386 3.00912 14.5311C2.03105 13.0236 1.56648 11.2403 1.68472 9.44714C1.80296 7.65402 2.49766 5.94715 3.66522 4.58111C4.83278 3.21506 6.41064 2.26303 8.16348 1.867C9.91632 1.47097 11.7502 1.65216 13.3917 2.38355"
              stroke="#6FCF97"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3333 3.3335L10 11.6752L7.5 9.17516"
              stroke="#6FCF97"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_94_251">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </h3>
      <p className="text-xs text-app-text pt-2">{description}</p>
    </div>
  );
};

export default SelectCard;
