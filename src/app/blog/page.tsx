import { createClient } from '@/utils/supabase/server';
import { PostWithAuthor } from '@/utils/types/post.interface';
import { getFormatPostDate } from '@/utils/utilities';
import { UserIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '../../../routes';

export const metadata: Metadata = {
  title: 'Barbadens - Blog',
  description: 'Contenido a la medida',
  keywords: ['camisas', 'medida', 'blog', 'barbadens'],
};

const Page = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*, company_users(*)')
    .eq('status', 1)
    .returns<PostWithAuthor[]>();

  if (error) {
    throw error;
  }
  const posts = data;
  const featuredPost = posts[0];

  return (
    <main className="mt-16">
      <div className="p-4">
        <div className=" rounded-2xl w-full h-[500px] relative">
          <Image
            src={featuredPost?.featured_image}
            className=" rounded-2xl object-cover object-center"
            fill
            alt=""
          />
          <div className="absolute w-full h-full top-0 left-0 bg-black/35 rounded-2xl"></div>
          <div className="absolute bottom-8 left-4 text-white px-4 flex flex-col gap-2">
            <span className="font-medium">Destacado</span>
            <h3 className="text-3xl font-bold">{featuredPost?.title}</h3>
            <p className="max-w-[650px] text-balance">
              {featuredPost?.excerpt}
            </p>
            <Link
              href={routes.blog.post.replace('[slug]', featuredPost.slug)}
              className="underline "
            >
              Leer más
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h3 className="text-2xl font-semibold">Post más recientes</h3>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-8 py-4">
          {posts.map((post) => (
            <article key={post?.id} className="flex flex-col gap-2">
              <div className="relative w-full h-48">
                <Image
                  src={post?.featured_image}
                  className="rounded-2xl object-cover"
                  fill
                  alt=""
                />
              </div>

              <Link
                href={routes.blog.post.replace('[slug]', post?.slug)}
                className="group"
              >
                <h3 className="text-lg font-semibold group-hover:underline ">
                  {post?.title}
                </h3>
              </Link>
              <p>{post?.excerpt}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <UserIcon className="w-4" />
                  <span>
                    {post?.company_users?.first_name}{' '}
                    {post?.company_users?.last_name}
                  </span>
                </div>
                <span>{getFormatPostDate(post?.created_at)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
