import Image from 'next/image';
import Link from 'next/link';

import { getMenu } from '@/db/queries/settings';
import { Page } from '@/payload-types';

import { Button } from '../ui/button';

export default async function SiteHeader() {
  const menu = await getMenu('main');

  return (
    <header className={'site-padding bg-neutral-100'}>
      <div
        className={
          'mx-auto flex w-full max-w-[1440px] items-center justify-between'
        }
      >
        <div>
          <Link
            href={'/'}
            className={
              'relative inline-block size-[80px] rounded-full md:size-[140px]'
            }
          >
            <Image
              src={'/images/logo.svg'}
              alt={'Logo'}
              fill
              className={'rounded-full'}
            />
          </Link>
        </div>

        <nav>
          <ul className={'flex items-center gap-4'}>
            {menu?.menuItems?.map(({ id, page }) => (
              <li key={id}>
                <Link
                  href={`/${(page as Page)?.slug}`}
                  className={'px-4 py-10'}
                >
                  {(page as Page)?.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Button>
            <Link href={'/contact'}>Book an appointment</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
