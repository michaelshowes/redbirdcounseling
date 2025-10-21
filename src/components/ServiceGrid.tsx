import Link from 'next/link';

import { getSettings } from '@/db/queries/settings';
import { Media, Service } from '@/payload-types';

import Card from './Card';
import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

type ServiceGridProps = {
  showCount?: number | 'all';
  fullCardLink?: boolean;
  title?: string;
  headline?: string;
  link?: {
    url?: string;
    label: string;
    type?: 'reference' | 'custom';
    reference?: {
      value?: {
        slug?: string;
      };
    };
  };
};

export default async function ServiceGrid({
  showCount = 'all',
  fullCardLink = false,
  title,
  headline,
  link
}: ServiceGridProps) {
  const { orderedServices } = (await getSettings()) as {
    orderedServices: { service: Service }[];
  };

  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[1220px]'}>
        <SectionHeader
          title={title || ''}
          headline={headline || ''}
        />
        <div
          className={
            'w-full grid-cols-3 justify-center gap-6 sm:grid lg:gap-10'
          }
        >
          {orderedServices
            .slice(0, showCount === 'all' ? undefined : showCount)
            .map(({ service }) => {
              if (!service.title) return null;

              return (
                <Card
                  key={service.id}
                  title={service.title}
                  description={service.meta?.description || ''}
                  image={service.meta?.image as Media}
                  link={{
                    url: `/services/${service.slug}`,
                    label: (
                      <>
                        Read more{' '}
                        <span className={'sr-only'}>about{service.title}</span>
                      </>
                    )
                  }}
                  fullCardLink={fullCardLink}
                />
              );
            })}
        </div>
        <div className={'mt-10 flex justify-center'}>
          <Button
            variant={'secondary'}
            size={'lg'}
          >
            <Link
              href={
                link?.type === 'reference' &&
                link.reference?.value &&
                typeof link.reference.value === 'object'
                  ? `/${link.reference.value.slug}`
                  : link?.url || '#'
              }
            >
              {link?.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
