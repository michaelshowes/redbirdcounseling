import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { TextGenerateEffect } from './utils/TextGenerateEffect';

function LeftSide() {
  return (
    <div className={'relative flex flex-col gap-2'}>
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
      <h1 className={'text-display-3 lg:text-display-1'}>
        <TextGenerateEffect
          hasPeriod
          words={'Professional guidance for mental health'}
        />
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
      </p>
      <div className={'mt-6 flex flex-wrap gap-4'}>
        <Button size={'lg'}>Book an appointment</Button>
        <Button
          size={'lg'}
          variant={'secondary'}
        >
          Browse our services
        </Button>
      </div>
    </div>
  );
}

function RightSide() {
  return (
    <div
      className={
        'relative aspect-[715/773] h-full w-full max-w-[715px] overflow-hidden rounded-2xl md:rounded-tr-none md:rounded-br-none xl:-mb-40 xl:!rounded-tr-2xl xl:!rounded-br-2xl'
      }
    >
      <Image
        src={'/images/hero-img.png'}
        alt={'Hero'}
        fill
        className={'object-cover'}
      />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section
      className={
        'bg-secondary-1 px-4 py-8 md:px-8 md:pr-0 lg:py-20 xl:mb-20 xl:pr-8'
      }
    >
      <div
        className={
          'mx-auto flex max-w-[1440px] flex-col items-center gap-x-12 gap-y-6 md:flex-row'
        }
      >
        <LeftSide />
        <RightSide />
      </div>
    </section>
  );
}
