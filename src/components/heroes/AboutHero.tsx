import { draftMode } from 'next/headers';
import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { AboutHero as AboutHeroProps, Media, Page } from '@/payload-types';

import RichText from '../RichTextRenderer';
import { TextGenerateEffect } from '../utils/TextGenerateEffect';

type Props = AboutHeroProps & {
  image: Media;
  secondaryImage: Media;
};

export default async function AboutHero(props: Props) {
  const { title, richTextSubtext } = props || {};
  const image = props.image;
  const secondaryImage = props.secondaryImage;
  const { isEnabled: draft } = await draftMode();

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
            {draft ? (
              <>
                {title}
                <span className='text-redbird'>.</span>
              </>
            ) : (
              <TextGenerateEffect
                hasPeriod
                words={title || ''}
              />
            )}
          </h1>
          <RichText
            className={'max-w-[520px]'}
            data={richTextSubtext as DefaultTypedEditorState}
          />
        </header>

        <div className={'grid aspect-[1440/770] grid-cols-[3fr_2fr] gap-12'}>
          <div className={'relative overflow-hidden rounded-2xl'}>
            <Image
              src={image.url || ''}
              alt={image.alt}
              width={image.width || 0}
              height={image.height || 0}
              priority
              className={'object-cover'}
            />
          </div>

          <div className={'relative overflow-hidden rounded-2xl'}>
            <Image
              src={secondaryImage.url || ''}
              alt={secondaryImage.alt || ''}
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
