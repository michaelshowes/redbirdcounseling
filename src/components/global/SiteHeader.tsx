import Image from 'next/image';
import Link from 'next/link';

import { getMenu, getSettings } from '@/db/queries/settings';
import { MenuItems } from '@/payload-types';

import { Button } from '../ui/button';
import MobileMenuButton from './Menu/MobileMenu';
import SiteMenu from './Menu/SiteMenu';

export default async function SiteHeader() {
  const menu = await getMenu('main');
  const { mainMenuCTA } = await getSettings();

  return (
    <header className={'site-padding relative z-50 bg-white'}>
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

        <SiteMenu
          menuItems={menu?.menuItems as MenuItems}
          className={'hidden lg:block'}
        />

        <div className={'flex items-center gap-2'}>
          <Button className={'hidden sm:inline-flex'}>
            <Link
              href={mainMenuCTA.url!}
              target={mainMenuCTA.newTab ? '_blank' : '_self'}
            >
              {mainMenuCTA.label}
            </Link>
          </Button>

          <MobileMenuButton
            menuItems={menu?.menuItems as MenuItems}
            mainMenuCTA={mainMenuCTA}
          />
        </div>
      </div>
    </header>
  );
}
