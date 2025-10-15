'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Media, MenuItems, Page, Service, Subpages } from '@/payload-types';

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
                  <MobileSubMenu subpages={subpages as Subpages} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
