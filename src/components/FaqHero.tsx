import Image from 'next/image';

import { Media } from '@/payload-types';

export interface FaqHeroProps {
  image: Media;
}

export default function FaqHero({ data: hero }: { data: FaqHeroProps }) {
  return (
    <section className={'bg-secondary-1 relative px-8 pt-10'}>
      <span
        className={'absolute right-0 bottom-0 left-0 h-20 bg-neutral-100'}
      />
      <div
        className={
          'relative mx-auto h-56 max-w-[1440px] overflow-hidden rounded-2xl lg:h-[400px]'
        }
      >
        <Image
          src={hero.image.url || ''}
          fill
          alt={hero.image.alt || ''}
          className={'object-cover'}
        />
      </div>
    </section>
  );
}
