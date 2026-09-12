import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Media, Post } from '@/payload-types';

import { formatPostDate } from '../utils/formatPostDate';

type Props = {
  post: Post;
};

/** The newest published post, given the full width of the listing so the most
 * recent article is the first thing a reader lands on. */
export default function FeaturedPost({ post }: Props) {
  const image = post.image as Media;
  const published = formatPostDate(post.publishedAt);

  return (
    <article
      className={
        'group relative mb-16 grid gap-8 rounded-2xl md:mb-24 md:grid-cols-2 md:items-center md:gap-12'
      }
    >
      <div
        className={
          'relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-[4/3]'
        }
      >
        <Image
          src={image?.url || ''}
          alt={image?.alt || ''}
          fill
          sizes={'(min-width: 768px) 50vw, 90vw'}
          className={'object-cover'}
          priority
        />
      </div>

      <div>
        <p
          className={
            'text-single-100 sans mb-4 flex items-center gap-2 font-medium tracking-widest text-neutral-800 uppercase'
          }
        >
          <span>Latest</span>
          <span className={'bg-redbird size-2 rounded-full'} />
          {published && <time dateTime={post.publishedAt!}>{published}</time>}
        </p>

        <h2
          className={'text-display-4 md:text-display-3 serif mb-4 text-balance'}
        >
          <Link
            href={`/blog/${post.slug}`}
            className={'text-[length:inherit]'}
          >
            <span className={'absolute inset-0'} />
            {post.title}
          </Link>
        </h2>

        <p className={'mb-6'}>{post.excerpt}</p>

        <span
          className={
            'relative inline-flex items-center gap-1 px-2 transition-all duration-200'
          }
        >
          <span
            className={
              'bg-redbird absolute -top-0.5 bottom-0 left-0 -z-10 w-0.5 transition-all duration-200 group-hover:w-full'
            }
          />
          <span className={'transition-colors group-hover:text-white'}>
            Read the latest post
          </span>
          <ArrowRight
            size={22}
            className={
              '-rotate-45 transition-all duration-200 group-hover:rotate-0 group-hover:text-white'
            }
          />
        </span>
      </div>
    </article>
  );
}
