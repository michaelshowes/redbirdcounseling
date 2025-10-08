import { draftMode } from 'next/headers';
import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { BasicHero as BasicHeroProps, Media } from '@/payload-types';

import RichText from '../RichTextRenderer';
import { TextGenerateEffect } from '../utils/TextGenerateEffect';

type Props = BasicHeroProps & {
  image: Media;
};

export default async function BasicHero(props: Props) {
  if (!props) return null;
  const { isEnabled: draft } = await draftMode();

  const { title, subtext } = props;
  const image = props.image;

  return (
    <section className={'bg-secondary-1 relative px-8 pt-10'}>
      <span className={'absolute right-0 bottom-0 left-0 h-20 bg-white'} />
      <header className={'mb-10 text-center'}>
        <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
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
          className={'mx-auto max-w-[765px]'}
          data={subtext as DefaultTypedEditorState}
        />
      </header>
      <div
        className={
          'relative mx-auto h-56 max-w-[1440px] overflow-hidden rounded-2xl lg:h-[400px]'
        }
      >
        <Image
          src={image.url || ''}
          fill
          alt={image.alt || ''}
          className={'object-cover'}
          priority
        />
      </div>
    </section>
  );
}
