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
              <div className={'relative'}>
                <div
                  className={
                    'absolute -top-5 -left-6 size-10 lg:-top-5 lg:-left-6'
                  }
                >
                  <Image
                    src={'/images/redbird.svg'}
                    alt={'Logo'}
                    fill
                    className={'rounded-full'}
                  />
                </div>
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
