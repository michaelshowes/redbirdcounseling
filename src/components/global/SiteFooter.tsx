import Image from 'next/image';

import { getServices } from '@/db/queries/services';
import { getSettings } from '@/db/queries/settings';

export default async function SiteFooter() {
  const services = await getServices();
  const { footer } = await getSettings();
  const { contact } = footer;

  return (
    <footer className='bg-secondary-1 pt-40'>
      <div className='md: site-padding mx-auto flex max-w-[300px] flex-col justify-between gap-4 pb-10 md:max-w-[1220px] md:flex-row md:items-end md:gap-8'>
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
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/services/${service.slug}`}
                    className='block text-base'
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className={'mb-2'}>Contact</h3>
          <div>
            {contact.phone && (
              <p>
                <span className='font-medium'>P:</span> {contact.phone}
              </p>
            )}
            {contact.email && (
              <p>
                <span className='font-medium'>E: </span>
                <a
                  href={`mailto:${contact.email}`}
                  className={'text-base'}
                >
                  {contact.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={'bg-neutral-100 py-6'}>
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
