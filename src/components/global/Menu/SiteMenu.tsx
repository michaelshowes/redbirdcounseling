'use client';

import Link from 'next/link';
import { useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

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

          // Items with a dropdown are triggers, not destinations - there is no
          // landing page behind them, so they open the submenu instead of
          // navigating. A button keeps that reachable by keyboard, which a
          // hover-only element would not be.
          const triggerClassName = cn(
            'flex items-center gap-2 px-4 py-10 font-bold transition-colors',
            {
              'text-redbird': isActive
            }
          );

          return (
            <li
              key={id}
              className={'relative'}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setActiveId(null);
              }}
            >
              {subpageOption ? (
                <button
                  type={'button'}
                  aria-expanded={isActive}
                  onClick={() => setActiveId(isActive ? null : id!)}
                  className={triggerClassName}
                >
                  {(page as Page)?.title}
                  <ChevronDownIcon
                    className={cn('size-5 transition-transform duration-250', {
                      'rotate-180': isActive
                    })}
                  />
                </button>
              ) : (
                <Link
                  href={`/${(page as Page)?.slug}`}
                  className={triggerClassName}
                >
                  {(page as Page)?.title}
                </Link>
              )}

              {isActive && (
                <div
                  className={
                    'absolute top-full left-0 z-50 w-[340px] overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-[0_22px_44px_-18px_rgba(10,19,22,0.22)]'
                  }
                >
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
