import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Media, Page, Service, Subpages } from '@/payload-types';

type MobileSubMenuProps = {
  subpages: Subpages;
  hideImages?: boolean;
  handleToggleMenu?: () => void;
};

export default function MobileSubMenu({
  subpages,
  hideImages = false,
  handleToggleMenu
}: MobileSubMenuProps) {
  return (
    <ul className={'flex flex-col gap-4'}>
      {subpages?.map((page) => {
        const { subpage }: NonNullable<Subpages>[number] = page;
        const pageValue =
          subpage?.relationTo === 'pages'
            ? (subpage?.value as Page)
            : (subpage?.value as Service);
        const image = pageValue.meta?.image as Media;

        function url({ subpage }: NonNullable<Subpages>[number]) {
          if (subpage?.relationTo === 'pages') {
            return `/${pageValue.slug}`;
          }

          return `/${subpage?.relationTo}/${pageValue.slug}`;
        }

        return (
          <li key={page.id}>
            <Link
              href={url({ subpage })}
              onClick={handleToggleMenu}
              className={'group'}
            >
              {subpage?.relationTo === 'services' ? (
                <article
                  className={cn(
                    'bg-secondary-1 group-hover:border-redbird grid items-center gap-4 rounded-lg border border-neutral-300 p-2 transition-all',
                    {
                      'grid grid-cols-[120px_1fr]': !hideImages
                    }
                  )}
                >
                  {!hideImages && (
                    <div
                      className={
                        'relative size-[120px] w-full overflow-hidden rounded-lg'
                      }
                    >
                      <Image
                        src={image.url!}
                        alt={image.alt!}
                        fill
                        className={
                          'object-cover transition-all duration-200 group-hover:scale-110'
                        }
                      />
                    </div>
                  )}
                  <div>
                    <h3 className={'sans text-lg font-medium lg:text-[22px]'}>
                      {pageValue.title}
                      <span className={'text-redbird ml-1 !text-3xl'}>.</span>
                    </h3>
                    <p className={'text-sm lg:text-base'}>
                      {pageValue.meta?.description}
                    </p>
                  </div>
                </article>
              ) : (
                <>{pageValue.title}</>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
