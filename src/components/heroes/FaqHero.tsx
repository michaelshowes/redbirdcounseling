import Image from 'next/image';

import { Page } from '@/payload-types';

export default function FaqHero({ faqHero }: { faqHero: Page['hero'] }) {
  // @ts-expect-error - hero exists
  const { image } = faqHero || {};

  return (
    <section className={'bg-secondary-1 relative px-8 pt-10'}>
      <span className={'absolute right-0 bottom-0 left-0 h-20 bg-white'} />
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
        />
      </div>
    </section>
  );
}
