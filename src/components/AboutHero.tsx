import Image from 'next/image';

import { TextGenerateEffect } from './utils/TextGenerateEffect';

export default function AboutHero() {
  return (
    <section className={'bg-secondary-1 py-20'}>
      <div className={'site-padding mx-auto max-w-[1440px]'}>
        <header
          className={
            'relative mb-20 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'
          }
        >
          <div
            className={
              'absolute -top-7 -left-7 size-14 transition duration-1000 lg:-top-10 lg:-left-10 lg:size-20 starting:-translate-y-4 starting:blur-sm'
            }
          >
            <Image
              src={'/images/redbird.svg'}
              alt={'Logo'}
              fill
              className={'rounded-full'}
            />
          </div>
          <h1
            className={
              'text-display-3 lg:text-display-1 shrink-0 text-balance lg:max-w-[565px]'
            }
          >
            <TextGenerateEffect
              hasPeriod
              words={'About Dr. Nicole Michels'}
            />
          </h1>
          <p className={'max-w-[520px]'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua quis
            nostrud exercitation ullamco.
          </p>
        </header>

        <div className={'grid aspect-[1440/770] grid-cols-[3fr_2fr] gap-12'}>
          <div className={'relative overflow-hidden rounded-2xl'}>
            <Image
              src={'/images/about-img.png'}
              alt={'About Dr. Nicole Michels'}
              fill
              priority
              className={'object-cover'}
            />
          </div>

          <div className={'relative overflow-hidden rounded-2xl'}>
            <Image
              src={'/images/about-img-secondary.png'}
              alt={'alt'}
              fill
              priority
              className={'object-cover'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
