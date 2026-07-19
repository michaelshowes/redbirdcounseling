'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { MenuItems, Page, Subpages } from '@/payload-types';

import MobileSubMenu from './MobileSubMenu';

type SiteMenuProps = {
  menuItems: MenuItems;
  className?: string;
};

export default function SiteMenu({ menuItems, className }: SiteMenuProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <nav className={cn('relative', className)}>
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
              className={'relative'}
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
                <div
                  className={
                    'absolute top-full left-0 z-50 w-[340px] overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_22px_44px_-18px_rgba(10,19,22,0.22)]'
                  }
                >
                  <MobileSubMenu subpages={subpages as Subpages} />
                  <Link
                    href={'/specialties'}
                    className={
                      'group bg-secondary-3 flex items-center justify-between gap-3 border-t border-neutral-300 px-5 py-3.5'
                    }
                  >
                    <span
                      className={
                        'sans text-xs font-semibold tracking-[0.14em] text-neutral-600 uppercase transition-colors group-hover:text-redbird'
                      }
                    >
                      View all specialties
                    </span>
                    <ArrowRightIcon
                      className={
                        'size-4 text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-redbird'
                      }
                    />
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
