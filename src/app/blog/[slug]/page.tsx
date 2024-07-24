import { createClient } from '@/utils/supabase/server';
import { PostWithAuthor } from '@/utils/types/post.interface';
import { getFormatPostDate, getFormatPostTime } from '@/utils/utilities';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const Page: FC<Props> = async ({ params }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, company_users(*)')
    .eq('slug', params.slug)
    .single<PostWithAuthor>();

  if (error) {
    throw error;
  }

  if (!data) {
    return notFound();
  }

  return (
    <main className="mt-16 max-w-3xl mx-auto px-4">
      <article className="pt-12 flex flex-col gap-4">
        <h3 className="text-app-primary text-4xl font-bold">{data?.title}</h3>
        <div className="border-y border-gray-500 flex items-center gap-4 py-4 text-app-text">
          <div className="flex items-center gap-1">
            <UserCircleIcon className="w-4" />
            <span className="text-sm">
              {data.company_users?.first_name} {data.company_users?.last_name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4" />
            <span className="text-sm">
              {getFormatPostDate(data?.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4" />
            <span className="text-sm">
              {getFormatPostTime(data?.created_at)}
            </span>
          </div>
        </div>
        <div className="w-full h-[250px] relative">
          <Image
            src={data?.featured_image}
            alt="blog-image"
            fill
            className="object-cover object-center"
          />
        </div>
        <div
          className="post"
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        ></div>
      </article>
      <div className="py-8">
        Compartir en:
        <div className="flex items-center gap-2 ">
          <button className="py-4 px-2 bg-blue-700 text-white flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="white"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 310 310"
            >
              <g id="XMLID_834_">
                <path
                  id="XMLID_835_"
                  d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
		c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
		V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
		C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
		c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
                />
              </g>
            </svg>
            Facebook
          </button>
          <button className="py-4 px-2 bg-green-500 text-white flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                fill="white"
              />
            </svg>
            Whatsapp
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
