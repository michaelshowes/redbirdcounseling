import Image from 'next/image';

import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { getSettings } from '@/db/queries/settings';
import { Service } from '@/payload-types';

export default async function SiteFooter() {
  const { footer, orderedServices } = await getSettings();
  const { contact } = footer;

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

        {/* Specialties */}
        <div>
          <h3 className={'mb-2'}>Specialties</h3>
          <nav>
            <ul className={'flex flex-col gap-2'}>
              {orderedServices?.map((serviceData) => {
                const service = serviceData.service as Service;

                return (
                  <li key={service.id}>
                    <a
                      href={`/specialties/${service.slug}`}
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

          {/*
            Professional verification provided by Psychology Today.

            Their loader runs on DOMContentLoaded, finds this anchor via the
            script's previousElementSibling, and sets the seal as a background
            image - so the two elements must stay adjacent and in this order.
            The size below matches the seal it injects (186x60), reserving the
            space up front so the footer does not shift when it loads. The
            aria-label is ours: the injected anchor has no text of its own.
          */}
          <div className={'mt-6'}>
            <a
              href='https://www.psychologytoday.com/profile/1086696'
              className='sx-verified-seal block h-[60px] w-[186px]'
              aria-label='Nicole Michels, verified by Psychology Today'
            ></a>
            {/*
              `defer` rather than a bare script: deferred scripts run after
              parsing but still before DOMContentLoaded, so the seal loader's
              listener is registered in time while no longer blocking the
              parser. `async` would be a race - it can fire after that event,
              leaving the seal permanently unrendered.
            */}
            <script
              defer
              type='text/javascript'
              src='https://member.psychologytoday.com/verified-seal.js'
              data-badge='14'
              data-id='1086696'
              data-code='aHR0cHM6Ly93d3cucHN5Y2hvbG9neXRvZGF5LmNvbS9hcGkvdmVyaWZpZWQtc2VhbC9zZWFscy8xNC9wcm9maWxlLzEwODY2OTY/Y2FsbGJhY2s9c3hjYWxsYmFjaw=='
            ></script>
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
