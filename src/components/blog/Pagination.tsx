import Link from 'next/link';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  currentPage: number;
  totalPages: number;
  /** Base path the page numbers hang off, e.g. `/blog`. */
  basePath?: string;
};

/** Page 1 is the bare path so `/blog` and `/blog?page=1` never both exist. */
export const pageHref = (page: number, basePath = '/blog') =>
  page <= 1 ? basePath : `${basePath}?page=${page}`;

/**
 * Numbered pagination. Every page is a real crawlable link rather than a
 * load-more button, so posts past the first page stay reachable by search
 * engines and by anyone without JavaScript.
 */
export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/blog'
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const arrowClassName =
    'flex size-10 items-center justify-center rounded-full border border-neutral-400 transition-colors hover:bg-white';

  return (
    <nav
      aria-label={'Blog pagination'}
      className={'mt-16 flex items-center justify-center gap-2'}
    >
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1, basePath)}
          rel={'prev'}
          aria-label={'Previous page'}
          className={arrowClassName}
        >
          <ChevronLeftIcon size={18} />
        </Link>
      ) : (
        <span
          aria-hidden
          className={cn(arrowClassName, 'opacity-30')}
        >
          <ChevronLeftIcon size={18} />
        </span>
      )}

      <ul className={'flex items-center gap-2'}>
        {pages.map((page) => {
          const isCurrent = page === currentPage;

          return (
            <li key={page}>
              <Link
                href={pageHref(page, basePath)}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'sans flex size-10 items-center justify-center rounded-full border text-base font-medium transition-colors',
                  isCurrent
                    ? 'bg-redbird border-redbird text-white'
                    : 'border-neutral-400 hover:bg-white'
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>

      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1, basePath)}
          rel={'next'}
          aria-label={'Next page'}
          className={arrowClassName}
        >
          <ChevronRightIcon size={18} />
        </Link>
      ) : (
        <span
          aria-hidden
          className={cn(arrowClassName, 'opacity-30')}
        >
          <ChevronRightIcon size={18} />
        </span>
      )}
    </nav>
  );
}
