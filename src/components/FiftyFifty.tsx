import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { cn } from '@/lib/utils';
import { FiftyFifty as FiftyFiftyProps, Media } from '@/payload-types';

import RichText from './RichTextRenderer';
import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

export default function FiftyFifty({
  header,
  leftContentType,
  leftContentText,
  leftContentImage,
  rightContentType,
  rightContentText,
  rightContentImage,
  ctaLink
}: FiftyFiftyProps & {
  leftContentImage: Media;
  rightContentImage: Media;
}) {
  return (
    <section
      data-component='fifty-fifty'
      className={'section-spacing'}
    >
      <SectionHeader
        title={header.title || ''}
        headline={header.headline || ''}
      />
      <div
        className={cn(
          'mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-20',
          {
            'items-center': leftContentType === 'image'
          }
        )}
      >
        <div className={'relative flex flex-col items-center'}>
          {leftContentType === 'richText' ? (
            <>
              <div className={'absolute inset-0 scale-75 opacity-[.04]'}>
                <Image
                  src={'/images/redbird.svg'}
                  alt={'Logo'}
                  fill
                  className={'rounded-full'}
                />
              </div>
              <RichText data={leftContentText as DefaultTypedEditorState} />
            </>
          ) : (
            <Image
              src={leftContentImage?.url || ''}
              alt={leftContentImage?.alt || ''}
              width={leftContentImage?.width || 0}
              height={leftContentImage?.height || 0}
            />
          )}
        </div>
        <div className={'relative flex flex-col items-center'}>
          {rightContentType === 'richText' ? (
            <>
              {leftContentType !== 'richText' && (
                <div className={'absolute inset-0 scale-75 opacity-[.04]'}>
                  <Image
                    src={'/images/redbird.svg'}
                    alt={'Logo'}
                    fill
                    className={'rounded-full'}
                  />
                </div>
              )}
              <RichText data={rightContentText as DefaultTypedEditorState} />
            </>
          ) : (
            <Image
              src={rightContentImage?.url || ''}
              alt={rightContentImage?.alt || ''}
              width={rightContentImage?.width || 0}
              height={rightContentImage?.height || 0}
            />
          )}
        </div>
      </div>

      <div className={'mt-8 flex justify-center'}>
        <Button
          size={'lg'}
          className={'mt-8 lg:mt-12'}
          link
          href={ctaLink?.link?.url || ''}
          target={ctaLink?.link?.newTab ? '_blank' : '_self'}
        >
          {ctaLink?.link?.label || ''}
        </Button>
      </div>
    </section>
  );
}
