import Image from 'next/image';

import { LinkFields } from '@payloadcms/richtext-lexical';

import { TextGenerateEffect } from './utils/TextGenerateEffect';

type ImageProps = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export interface AboutHeroProps {
  title: string;
  subtext: string;
  image: ImageProps;
  secondaryImage: ImageProps;
  links: LinkFields[];
}

export default function AboutHero({ data: hero }: { data: AboutHeroProps }) {
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
              words={hero.title}
            />
          </h1>
          <p className={'max-w-[520px]'}>{hero.subtext}</p>
        </header>

        <div className={'grid aspect-[1440/770] grid-cols-[3fr_2fr] gap-12'}>
          <div className={'relative overflow-hidden rounded-2xl'}>
            <Image
              src={hero.image.url}
              alt={hero.image.alt}
              fill
              priority
              className={'object-cover'}
            />
          </div>

          <div className={'relative overflow-hidden rounded-2xl'}>
            <Image
              src={hero.secondaryImage.url}
              alt={hero.secondaryImage.alt}
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
