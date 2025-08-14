import Link from 'next/link';

import { getServices } from '@/db/queries/services';
import { Media } from '@/payload-types';

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
  const services = await getServices();

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
          {services
            .slice(0, showCount === 'all' ? undefined : showCount)
            .map((service) => {
              return (
                <Card
                  key={service.id}
                  title={service.title}
                  description={service.meta?.description || ''}
                  image={service.meta?.image as Media}
                  link={{
                    url: `/services/${service.slug}`,
                    label: 'Read more'
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
