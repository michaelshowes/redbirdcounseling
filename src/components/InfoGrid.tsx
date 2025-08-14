import Image from 'next/image';

import { InfoGrid as InfoGridProps } from '@/payload-types';

import SectionHeader from './shared/SectionHeader';

export default function InfoGrid(props: InfoGridProps) {
  const { title, headline, items } = props;

  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[1440px]'}>
        <SectionHeader
          title={title}
          headline={headline}
        />

        <div
          className={
            'mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2 md:gap-6 lg:gap-10'
          }
        >
          {items?.map((item) => (
            <div
              key={item.title}
              className={
                'flex items-start gap-4 rounded-2xl border border-neutral-300 bg-neutral-100 p-6 md:px-8 md:py-10'
              }
            >
              <Image
                src={`/icons/${item.icon}.svg`}
                alt={'alt'}
                width={32}
                height={32}
              />
              <div>
                <h3 className={'text-2xl'}>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
