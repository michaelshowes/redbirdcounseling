import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Media, Post } from '@/payload-types';

import { formatPostDate } from '../utils/formatPostDate';

type Props = {
  post: Post;
  /** Set on the first cards so their images are eligible for LCP preloading. */
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const image = post.image as Media;
  const published = formatPostDate(post.publishedAt);

  return (
    <article
      className={
        'relative flex h-full flex-col rounded-2xl p-4 transition-all duration-200 hover:bg-white'
      }
    >
      <div
        className={
          'relative mb-8 aspect-[373/260] w-full overflow-hidden rounded-2xl'
        }
      >
        <Image
          src={image?.url || ''}
          alt={image?.alt || ''}
          fill
          sizes={'(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw'}
          className={'object-cover'}
          priority={priority}
        />
      </div>

      {published && (
        <p
          className={
            'text-single-100 sans mb-3 font-medium tracking-widest text-neutral-800 uppercase'
          }
        >
          <time dateTime={post.publishedAt!}>{published}</time>
        </p>
      )}

      <h3 className={'mb-6 border-b border-neutral-400 pb-6'}>
        <Link
          href={`/blog/${post.slug}`}
          className={'text-[length:inherit]'}
        >
          <span className={'absolute inset-0'} />
          {post.title}
        </Link>
      </h3>

      <p className={'mb-6'}>{post.excerpt}</p>

      <div className={'mt-auto'}>
        <span
          className={
            'group relative inline-flex items-center gap-1 px-2 transition-all duration-200'
          }
        >
          <span>Read more</span>
          <ArrowRight
            size={22}
            className={'-rotate-45 transition-all duration-200'}
          />
        </span>
      </div>
    </article>
  );
}
