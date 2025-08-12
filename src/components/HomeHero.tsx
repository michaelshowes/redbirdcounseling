import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { TextGenerateEffect } from './utils/TextGenerateEffect';

interface LinkType {
  link: {
    label: string;
    url: string;
    appearance: 'default' | 'outline';
    newTab: boolean;
    type: string;
  };
}

function LeftSide({
  title,
  subtext,
  links
}: {
  title: string;
  subtext: string;
  links: LinkType[];
}) {
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
          words={title}
        />
      </h1>
      <p>{subtext}</p>
      <div className={'mt-6 flex flex-wrap gap-4'}>
        <Button
          size={'lg'}
          // asChild
        >
          <Link
            href={links[0].link.url}
            target={links[0].link.newTab === true ? '_blank' : '_self'}
          >
            {links[0].link.label}
          </Link>
        </Button>
        {links[1] && (
          <Button
            size={'lg'}
            variant={'secondary'}
            // asChild
          >
            <Link href={links[1].link.url}>{links[1].link.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

interface RightSideProps {
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

function RightSide({ image }: RightSideProps) {
  return (
    <div
      className={
        'relative aspect-[715/773] h-full w-full max-w-[715px] overflow-hidden rounded-2xl md:rounded-tr-none md:rounded-br-none xl:-mb-40 xl:!rounded-tr-2xl xl:!rounded-br-2xl'
      }
    >
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={'object-cover'}
      />
    </div>
  );
}

export interface HomeHeroProps {
  title: string;
  subtext: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  links: LinkType[];
}

export default function HomeHero({ data: hero }: { data: HomeHeroProps }) {
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
        <LeftSide
          title={hero.title}
          subtext={hero.subtext}
          links={hero.links}
        />
        <RightSide image={hero.image} />
      </div>
    </section>
  );
}
