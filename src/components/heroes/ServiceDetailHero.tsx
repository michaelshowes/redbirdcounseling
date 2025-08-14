import { draftMode } from 'next/headers';
import Image from 'next/image';

import { Media, Service } from '@/payload-types';

import { TextGenerateEffect } from '../utils/TextGenerateEffect';

export default async function ServiceDetailHero(props: Service['hero']) {
  const { isEnabled: draft } = await draftMode();
  const { title, subtext } = props || {};
  const image = props?.image as Media;

  return (
    <section
      className={
        'section-spacing bg-secondary-1 relative mb-[100px] pb-0 md:px-0'
      }
    >
      <span
        className={'absolute right-0 bottom-0 left-0 h-20 bg-neutral-100'}
      />
      <div
        className={
          'md:site-padding mx-auto mb-10 max-w-[1440px] text-center lg:mb-20'
        }
      >
        <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
          {draft ? (
            <>
              {title}
              <span className='text-redbird'>.</span>
            </>
          ) : (
            <TextGenerateEffect
              hasPeriod
              words={title!}
            />
          )}
        </h1>
        <p className={'mx-auto max-w-[765px]'}>{subtext}</p>
      </div>

      <div
        className={
          'relative mx-auto h-[200px] max-w-[1440px] overflow-hidden rounded-2xl sm:h-[300px] md:h-[400px]'
        }
      >
        <Image
          src={image?.url as string}
          alt={'Service Image'}
          fill
          className={'object-cover'}
        />
      </div>
    </section>
  );
}
