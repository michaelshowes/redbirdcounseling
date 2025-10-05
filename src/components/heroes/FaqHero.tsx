import Image from 'next/image';

import { FaqHero as FaqHeroProps, Media } from '@/payload-types';

type Props = FaqHeroProps & {
  image: Media;
};

export default function FaqHero(props: Props) {
  const image = props.image;

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
