import ShareOnSocialMedia from '@/ui/molecules/shareOnSocialMedia/ShareOnSocialMedia';
import { createClient } from '@/utils/supabase/server';
import { PostWithAuthor } from '@/utils/types/post.interface';
import { getFormatPostDate, getFormatPostTime } from '@/utils/utilities';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Metadata, ResolvingMetadata } from 'next';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const supabase = createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*, company_users(*)')
    .eq('slug', params.slug)
    .single<PostWithAuthor>();

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const previousKeywords = (await parent).keywords || [];

  return {
    title: post?.title,
    description: post?.excerpt,
    keywords: post?.keywords
      ? [...post.keywords, ...previousKeywords]
      : [...previousKeywords],
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: post?.featured_image ? [post.featured_image] : previousImages,
    },
  };
}

// export async function generateStaticParams() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
//   ).then((res) => res.json());
//   const posts = response.posts as PostWithAuthor[];
//   return posts?.map((post) => ({
//     slug: post.slug,
//   }));
// }

const Page: FC<Props> = async ({ params }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*, company_users(*)')
    .eq('slug', params.slug)
    .single<PostWithAuthor>();

  if (!data || error) {
    return notFound();
  }

  return (
    <main className="mt-16 max-w-3xl mx-auto px-4">
      <article className="pt-12 flex flex-col gap-4">
        <h1 className="text-app-primary text-4xl font-bold">{data?.title}</h1>
        <div className="border-y border-gray-500 flex items-center gap-4 py-4 text-app-text">
          <div className="flex items-center gap-1">
            <UserCircleIcon className="w-4" />
            <span className="text-sm">Barbadens</span>
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
        <ShareOnSocialMedia />
      </div>
    </main>
  );
};

export default Page;
