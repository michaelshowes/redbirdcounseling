'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';
import { MainMenuCTA, MenuItems, Page, Subpages } from '@/payload-types';

import { Button } from '../../ui/button';
import MobileSubMenu from './MobileSubMenu';

type MobileSubMenuProps = {
  menuItems: MenuItems;
  handleToggleMenu: () => void;
  mainMenuCTA: MainMenuCTA;
};

function MobileMenu({
  menuItems,
  handleToggleMenu,
  mainMenuCTA
}: MobileSubMenuProps) {
  const [isActiveSubmenu, setIsActiveSubmenu] = useState(false);
  // const [isActive, setIsActive] = useState(false);

  function handleToggleSubmenu(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setIsActiveSubmenu(!isActiveSubmenu);
  }

  return (
    <div
      className={
        'bg-redbird/90 absolute inset-0 z-[9999] backdrop-blur-xs transition-opacity duration-100 lg:hidden starting:opacity-0'
      }
    >
      <div
        className={
          'absolute top-0 right-0 bottom-0 w-full max-w-[360px] bg-white px-4 pt-28 pb-10 transition-transform duration-300 starting:translate-x-full'
        }
      >
        <div className={'absolute top-4 left-4 size-[80px]'}>
          <Link href={'/'}>
            <Image
              src={'/images/logo.svg'}
              alt={'Logo'}
              fill
            />
          </Link>
        </div>
        <div className={'absolute top-4.5 right-4'}>
          <Button
            aria-label={'Close menu'}
            onClick={handleToggleMenu}
          >
            <XIcon />
          </Button>
        </div>

        <nav>
          <ul>
            {menuItems?.map(({ page, subpageOption, id, subpages }) => {
              return (
                <li key={id}>
                  <Link
                    href={`/${(page as Page)?.slug}`}
                    onClick={
                      subpageOption ? handleToggleSubmenu : handleToggleMenu
                    }
                    className={cn(
                      'flex items-center gap-2 py-2 font-bold transition-colors'
                      // { 'text-redbird': isActive }
                    )}
                  >
                    {(page as Page)?.title}
                    {subpageOption && (
                      <ChevronDownIcon
                        className={cn(
                          'size-5 transition-transform duration-250',
                          { 'rotate-180': isActiveSubmenu }
                        )}
                      />
                    )}
                  </Link>

                  <div
                    className={cn(
                      'grid grid-rows-[0fr] transition-all duration-200',
                      {
                        'grid-rows-[1fr]': isActiveSubmenu
                      }
                    )}
                  >
                    {(page as Page).slug === 'services' && (
                      <div className={'flex flex-col gap-4 overflow-hidden'}>
                        <Link
                          href={'/services'}
                          onClick={handleToggleMenu}
                          className={cn(
                            'bg-secondary-1 hover:border-redbird grid items-center gap-4 rounded-lg border border-neutral-300 p-2 transition-all'
                          )}
                        >
                          <div>
                            <h3
                              className={
                                'font-sans text-lg font-medium lg:text-[22px]'
                              }
                            >
                              Services Overview
                            </h3>
                            <p className={'text-sm lg:text-base'}>
                              See all our services
                            </p>
                          </div>
                        </Link>
                        <MobileSubMenu
                          subpages={subpages as Subpages}
                          handleToggleMenu={handleToggleMenu}
                          hideImages
                        />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div>
          <Button
            className={'mt-8 w-full'}
            link
            href={mainMenuCTA.url!}
            target={mainMenuCTA.newTab ? '_blank' : '_self'}
          >
            {mainMenuCTA.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MobileMenuButton({
  menuItems,
  mainMenuCTA
}: {
  menuItems: MenuItems;
  mainMenuCTA: MainMenuCTA;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <>
      <Button
        variant={'secondary'}
        size={'icon'}
        className={'lg:hidden'}
        onClick={handleToggleMenu}
        aria-label={'Open menu'}
      >
        <MenuIcon />
      </Button>

      {isOpen &&
        createPortal(
          <MobileMenu
            menuItems={menuItems}
            handleToggleMenu={handleToggleMenu}
            mainMenuCTA={mainMenuCTA}
          />,
          document.body
        )}
    </>
  );
}
