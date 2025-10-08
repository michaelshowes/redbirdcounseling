'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Media, MenuItems, Page, Service, Subpages } from '@/payload-types';

export default function SiteMenu({ menuItems }: { menuItems: MenuItems }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <nav className={'relative'}>
      <ul className={'flex items-center gap-4'}>
        {menuItems?.map(({ id, page, subpageOption, subpages }) => {
          const isActive = activeId === id;

          function handleMouseOver() {
            if (!subpageOption) return;
            setActiveId(id!);
          }

          function handleMouseLeave() {
            if (!subpageOption) return;
            setActiveId(null);
          }

          return (
            <li
              key={id}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/${(page as Page)?.slug}`}
                className={cn(
                  'flex items-center gap-2 px-4 py-10 font-bold transition-colors',
                  {
                    'text-redbird': isActive
                  }
                )}
              >
                {(page as Page)?.title}
                {subpageOption && (
                  <ChevronDownIcon
                    className={cn('size-5 transition-transform duration-250', {
                      'rotate-180': isActive
                    })}
                  />
                )}
              </Link>

              {isActive && (
                <div className={'absolute left-0 w-full bg-white p-4'}>
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
                            className={'group'}
                          >
                            {subpage?.relationTo === 'services' ? (
                              <article
                                className={
                                  'bg-secondary-1 group-hover:border-redbird grid items-center gap-4 rounded-lg border border-neutral-300 p-2 transition-all'
                                }
                                style={{
                                  gridTemplateColumns: '120px 1fr'
                                }}
                              >
                                <div
                                  className={
                                    'relative size-[120px] w-full overflow-hidden rounded-lg'
                                  }
                                >
                                  <Image
                                    src={image.url!}
                                    alt={image.alt!}
                                    fill
                                    className={'object-cover'}
                                  />
                                </div>
                                <div>
                                  <h3
                                    className={
                                      'font-sans text-[22px] font-medium'
                                    }
                                  >
                                    {pageValue.title}
                                    <span
                                      className={'text-redbird ml-1 !text-3xl'}
                                    >
                                      .
                                    </span>
                                  </h3>
                                  <p className={'text-base'}>
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
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
