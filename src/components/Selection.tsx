'use client';

import Image from 'next/image';

import SectionHeader from './shared/SectionHeader';

const selectionItems = [
  {
    title: 'Struggling to find a fulfilling romantic relationship',
    text: 'Amet nisl suscipit adipiscing bibendum est ultricies integer. Erat pellentesque adipiscing commodo elit at imperdiet.'
  },
  {
    title: 'Feeling burnt out from the modern dating world',
    text: 'Amet nisl suscipit adipiscing bibendum est ultricies integer. Erat pellentesque adipiscing commodo elit at imperdiet.'
  },
  {
    title: "Wondering if you're in the right relationship",
    text: 'Amet nisl suscipit adipiscing bibendum est ultricies integer. Erat pellentesque adipiscing commodo elit at imperdiet.'
  }
];

export default function Selection() {
  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[900px]'}>
        <SectionHeader title={"Maybe You're..."} />

        <div className={'my-10 flex flex-col gap-14 lg:gap-20'}>
          {selectionItems.map((item, i) => (
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
