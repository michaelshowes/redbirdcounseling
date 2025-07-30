import Image from 'next/image';

import SectionHeader from './shared/SectionHeader';

const values = [
  {
    title: 'Passion',
    description:
      'Lorem ipsum dolor sit amet dolorol consectetur mattis sitole phasellus mollis sit.',
    icon: 'globe'
  },
  {
    title: 'Transparency',
    description:
      'Lorem ipsum dolor sit amet dolorol consectetur mattis sitole phasellus mollis sit.',
    icon: 'star'
  },
  {
    title: 'Integrity',
    description:
      'Lorem ipsum dolor sit amet dolorol consectetur mattis sitole phasellus mollis sit.',
    icon: 'badge'
  },
  {
    title: 'Focus',
    description:
      'Lorem ipsum dolor sit amet dolorol consectetur mattis sitole phasellus mollis sit.',
    icon: 'eye'
  },
  {
    title: 'Empathy',
    description:
      'Lorem ipsum dolor sit amet dolorol consectetur mattis sitole phasellus mollis sit.',
    icon: 'heart'
  },
  {
    title: 'Commitment',
    description:
      'Lorem ipsum dolor sit amet dolorol consectetur mattis sitole phasellus mollis sit.',
    icon: 'circle-check'
  }
];

export default function InfoGrid() {
  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[1440px]'}>
        <SectionHeader
          title={'Values'}
          headline={'The core values that drive everything I do'}
        />

        <div
          className={
            'mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2 md:gap-6 lg:gap-10'
          }
        >
          {values.map((value) => (
            <div
              key={value.title}
              className={
                'flex items-start gap-4 rounded-2xl border border-neutral-300 bg-neutral-100 p-6 md:px-8 md:py-10'
              }
            >
              <Image
                src={`/icons/${value.icon}.svg`}
                alt={'alt'}
                width={32}
                height={32}
              />
              <div>
                <h3 className={'text-2xl'}>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
