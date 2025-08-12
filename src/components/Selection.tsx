'use client';

import Image from 'next/image';

import { Selection as SelectionProps } from '@/payload-types';

import SectionHeader from './shared/SectionHeader';

export default function Selection(props: SelectionProps) {
  const { title, items } = props;

  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[900px]'}>
        <SectionHeader title={title!} />

        <div className={'my-10 flex flex-col gap-14 lg:gap-20'}>
          {items?.map((item, i) => (
            <div key={i}>
              <div className={'relative'}>
                <div
                  className={
                    'absolute -top-7 -left-7 size-14 lg:-top-8 lg:-left-8'
                  }
                >
                  <Image
                    src={'/images/redbird.svg'}
                    alt={'Logo'}
                    fill
                    className={'rounded-full'}
                  />
                </div>
                <h3 className={'lg:text-display-3 mb-2'}>{item.title}</h3>
              </div>
              <p className={'text-base'}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
