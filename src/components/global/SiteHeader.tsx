import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/routes';

import { Button } from '../ui/button';

export default function SiteHeader() {
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
            {routes.map((route) => (
              <li key={route.name}>
                <Link
                  href={route.href}
                  className={'px-4 py-10'}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Button>Book an appointment</Button>
        </div>
      </div>
    </header>
  );
}
