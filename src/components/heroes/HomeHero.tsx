import { draftMode } from 'next/headers';
import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { Button } from '@/components/ui/button';
import { HomeHero as HomeHeroProps, Media } from '@/payload-types';

import RichText from '../RichTextRenderer';
import { TextGenerateEffect } from '../utils/TextGenerateEffect';

interface LinkType {
  link: {
    label: string;
    url: string;
    appearance: 'default' | 'outline';
    newTab: boolean;
    type: string;
  };
}

type Props = HomeHeroProps & {
  image: Media;
};

type LeftSideProps = {
  title: string;
  subtext: DefaultTypedEditorState;
  links: LinkType[];
};

async function LeftSide({ title, subtext, links }: LeftSideProps) {
  const { isEnabled: draft } = await draftMode();

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
      <RichText data={subtext} />

      <div className={'mt-6 flex flex-wrap gap-4'}>
        {links.map((link, i) => (
          <Button
            key={i}
            size={'lg'}
            variant={i === 1 ? 'secondary' : 'default'}
            link
            href={link.link.url}
            target={link.link.newTab === true ? '_blank' : '_self'}
          >
            {link.link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function RightSide({ image }: { image: Media }) {
  return (
    <div
      className={
        'relative aspect-[715/773] h-full w-full max-w-[715px] overflow-hidden rounded-2xl md:rounded-tr-none md:rounded-br-none xl:-mb-40 xl:!rounded-tr-2xl xl:!rounded-br-2xl'
      }
    >
      <Image
        src={image?.url || 'https://placehold.co/600x400?text=Hello+World'}
        alt={image?.alt || ''}
        width={image?.width || 0}
        height={image?.height || 0}
        className={'h-full w-full object-cover'}
        priority
      />
    </div>
  );
}

export default function HomeHero(props: Props) {
  const { title, richTextSubtext, image, links } = props || {};

  return (
    <section
      className={'bg-secondary-1 px-4 py-8 md:px-8 md:pr-0 lg:py-20 xl:pr-8'}
    >
      <div
        className={
          'mx-auto flex max-w-[1440px] flex-col items-center gap-x-12 gap-y-6 md:flex-row'
        }
      >
        <LeftSide
          title={title || ''}
          subtext={(richTextSubtext as DefaultTypedEditorState) || ''}
          links={links as LinkType[]}
        />
        <RightSide image={image} />
      </div>
    </section>
  );
}
