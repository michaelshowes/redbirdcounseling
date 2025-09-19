// import CardGrid from './CardGrid';
import { draftMode } from 'next/headers';

import { getServices } from '@/db/queries/services';
import { Media, Page } from '@/payload-types';

import Card from '../Card';
import { TextGenerateEffect } from '../utils/TextGenerateEffect';

export default async function ServicesHero({
  servicesHero
}: {
  servicesHero: Page['hero'];
}) {
  // @ts-expect-error - hero exists
  const { title, subtext } = servicesHero || {};
  const { isEnabled: draft } = await draftMode();
  const services = await getServices();

  return (
    <section className={'section-spacing bg-secondary-1 relative'}>
      <div
        className={
          'mx-auto mb-10 flex max-w-[1440px] flex-col gap-20 text-center lg:mb-20'
        }
      >
        <header>
          <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
            {draft ? (
              <>
                {title}
                <span className='text-redbird'>.</span>
              </>
            ) : (
              <TextGenerateEffect
                hasPeriod
                words={title}
              />
            )}
          </h1>
          <p className={'mx-auto max-w-[765px]'}>{subtext}</p>
        </header>

        <div className={'[&>section]:py-0'}>
          <div
            className={
              'w-full grid-cols-3 justify-center sm:grid md:gap-6 lg:gap-10'
            }
          >
            {services.map((service) => {
              return (
                <Card
                  key={service.id}
                  title={service.title}
                  description={service.meta?.description || ''}
                  image={service.meta?.image as Media}
                  link={{
                    type: 'reference',
                    reference: {
                      value: {
                        slug: service.slug || ''
                      }
                    },
                    url: `/services/${service.slug}`,
                    label: 'Read more'
                  }}
                  fullCardLink
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
