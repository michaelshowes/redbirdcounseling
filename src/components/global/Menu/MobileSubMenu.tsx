import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { Page, Service, Subpages } from '@/payload-types';

type MobileSubMenuProps = {
  subpages: Subpages;
  handleToggleMenu?: () => void;
};

export default function MobileSubMenu({
  subpages,
  handleToggleMenu
}: MobileSubMenuProps) {
  return (
    <ul className={'flex flex-col'}>
      {subpages?.map((page) => {
        const { subpage }: NonNullable<Subpages>[number] = page;
        const pageValue =
          subpage?.relationTo === 'pages'
            ? (subpage?.value as Page)
            : (subpage?.value as Service);
        const isService = subpage?.relationTo === 'services';

        function url({ subpage }: NonNullable<Subpages>[number]) {
          if (subpage?.relationTo === 'pages') {
            return `/${pageValue.slug}`;
          }

          return `/specialties/${pageValue.slug}`;
        }

        return (
          <li key={page.id}>
            <Link
              href={url({ subpage })}
              onClick={handleToggleMenu}
              className={
                'group hover:bg-secondary-1 flex items-center justify-between gap-3 px-3 py-2 transition-all hover:pl-6'
              }
            >
              {isService ? (
                <>
                  <span className={'serif text-base font-medium'}>
                    {pageValue.title}
                    <span className={'text-redbird ml-0.5 text-xl'}>.</span>
                  </span>
                  <ArrowRightIcon
                    className={
                      'text-redbird size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'
                    }
                  />
                </>
              ) : (
                <span className={'sans text-base font-medium'}>
                  {pageValue.title}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
