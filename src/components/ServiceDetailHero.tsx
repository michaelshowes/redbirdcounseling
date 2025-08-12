import { draftMode } from 'next/headers';
import Image from 'next/image';

import { TextGenerateEffect } from './utils/TextGenerateEffect';

export default async function ServiceDetailHero({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  const { isEnabled: draft } = await draftMode();

  return (
    <section className={'section-spacing bg-secondary-1 relative md:px-0'}>
      <div
        className={
          'md:site-padding mx-auto mb-10 max-w-[1440px] text-center lg:mb-20'
        }
      >
        <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
          {draft ? (
            <>{title}</>
          ) : (
            <TextGenerateEffect
              hasPeriod
              words={title}
            />
          )}
        </h1>
        <p className={'mx-auto max-w-[765px]'}>{description}</p>
      </div>

      <div
        className={
          'grid h-52 gap-4 md:grid-cols-[2fr_1fr] lg:h-[400px] lg:gap-10'
        }
      >
        <div
          className={
            'relative overflow-hidden rounded-2xl md:rounded-tl-none md:rounded-bl-none'
          }
        >
          <Image
            src={'/images/service-img-1.png'}
            alt={'Service Image'}
            fill
            className={'object-cover'}
          />
        </div>
        <div
          className={
            'relative hidden overflow-hidden rounded-tl-2xl rounded-bl-2xl md:block'
          }
        >
          <Image
            src={'/images/service-img-2.png'}
            alt={'Service Image'}
            fill
            className={'object-cover'}
          />
        </div>
      </div>
    </section>
  );
}
