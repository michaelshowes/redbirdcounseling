import Image from 'next/image';

interface ContactItem {
  prefix: string;
  content: string;
  href?: string;
}

export default function SiteFooter() {
  const services: string[] = ['Relationships', 'Dating', 'Couples'];

  const contactInfo: ContactItem[] = [
    { prefix: 'P:', content: '515.123.4555', href: 'tel:515.123.4555' },
    { prefix: 'E:', content: 'monroe@xxx.com', href: 'mailto:monroe@xxx.com' },
    { prefix: 'A:', content: '1234 Spruce Avenue, Atlanta, GA 00981' }
  ];

  return (
    <footer className='bg-secondary-1 pt-40'>
      <div className='md: site-padding mx-auto flex max-w-[300px] flex-col justify-between gap-4 pb-10 md:max-w-[1440px] md:flex-row md:items-end md:gap-8'>
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
                <li key={service}>
                  <a
                    href='#'
                    className='block text-base'
                  >
                    {service}
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
            {contactInfo.map(({ prefix, content, href }) => (
              <p
                key={prefix}
                className={'text-base'}
              >
                <span className='font-medium'>{prefix}</span>{' '}
                {href ? (
                  <a
                    href={href}
                    className={'text-base'}
                  >
                    {content}
                  </a>
                ) : (
                  <span>{content}</span>
                )}
              </p>
            ))}
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
