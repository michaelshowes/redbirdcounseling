import Image from 'next/image';

import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { getServices } from '@/db/queries/services';
import { getSettings } from '@/db/queries/settings';
import { Service } from '@/payload-types';

export default async function SiteFooter() {
  const services = await getServices();
  const { footer } = await getSettings();
  const { contact, serviceLinks } = footer;

  return (
    <footer className='bg-secondary-1 pt-40'>
      <div className='md:site-padding mx-auto flex max-w-[300px] flex-col justify-between gap-4 pb-10 md:max-w-[1220px] md:flex-row md:gap-8'>
        <div className={'relative size-60 self-center md:size-40'}>
          <Image
            src={'/images/logo.svg'}
            alt={'Logo'}
            fill
          />
        </div>

        {/* Services */}
        <div>
          <h3 className={'mb-2'}>Services</h3>
          <nav>
            <ul className={'flex flex-col gap-2'}>
              {serviceLinks?.services?.map((serviceData) => {
                const service = serviceData.service as Service;

                return (
                  <li key={service.id}>
                    <a
                      href={`/services/${service.slug}`}
                      className='block text-base'
                    >
                      {service.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className={'mb-2'}>Contact</h3>
          <div className={'flex flex-col gap-2'}>
            {contact.phone && (
              <p className={'flex items-center gap-2 text-base'}>
                <PhoneIcon className={'size-4'} />
                {contact.phone}
              </p>
            )}
            {contact.email && (
              <p className={'flex items-center gap-2'}>
                <MailIcon className={'size-4'} />
                <a
                  href={`mailto:${contact.email}`}
                  className={'text-base'}
                >
                  {contact.email}
                </a>
              </p>
            )}
            {contact.address && (
              <div className={'flex gap-2 text-base'}>
                <MapPinIcon className={'size-4 translate-y-1'} />
                <p>
                  <span className={'block'}>{contact.address.street}</span>
                  {contact.address.city}, {contact.address.state}{' '}
                  {contact.address.zip}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={'bg-white py-6'}>
        <div className={'site-padding'}>
          <p className={'text-body-small text-center'}>
            &copy; {new Date().getFullYear()} Redbird Counseling and Consulting.
            All rights reserved. | Site by{' '}
            <a
              href='mailto:mshowes@okidigital.io'
              className={'text-body-small font-semibold'}
            >
              Oki Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
