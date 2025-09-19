import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Media } from '@/payload-types';

export type CardProps = {
  title: string;
  description: string;
  image: Media;
  link: {
    url?: string;
    label: string;
    type?: 'reference' | 'custom';
    reference?: {
      value?: {
        slug?: string;
      };
    };
  };
  fullCardLink?: boolean;
};

export default function Card({
  title,
  description,
  image,
  link,
  fullCardLink
}: CardProps) {
  return (
    <article
      className={cn(
        'relative rounded-2xl p-4 transition-all duration-200',
        fullCardLink && 'hover:bg-neutral-100'
      )}
    >
      <div
        className={
          'relative mb-8 aspect-[373/400] w-full overflow-hidden rounded-2xl'
        }
      >
        <Image
          src={image?.url || ''}
          alt={image?.alt || ''}
          fill
          className={'object-cover'}
        />
      </div>

      <h3 className={'mb-6 border-b border-neutral-400 pb-6'}>
        {fullCardLink ? (
          <Link
            href={`/${link.reference?.value?.slug}`}
            className={'text-[length:inherit]'}
          >
            <span className={'absolute inset-0'} />
            {title}
          </Link>
        ) : (
          <>{title}</>
        )}
      </h3>
      <p>{description}</p>

      {!fullCardLink && (
        <Link
          href={
            link.type === 'reference' &&
            link.reference?.value &&
            typeof link.reference.value === 'object'
              ? `/${link.reference.value.slug}`
              : link.url || '#'
          }
          className={
            'group inline-flex items-center gap-1 px-2 transition-all duration-200 hover:text-neutral-100'
          }
        >
          <span
            className={
              'bg-redbird absolute -top-0.5 bottom-0 left-0 -z-10 w-0.5 transition-all duration-200 group-hover:w-full'
            }
          />
          <span>{link.label}</span>
          <ArrowRight
            size={22}
            className={
              '-rotate-45 transition-all duration-200 group-hover:rotate-0'
            }
          />
        </Link>
      )}
    </article>
  );
}
