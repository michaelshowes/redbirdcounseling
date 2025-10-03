import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { CardGrid as CardGridProps, Media } from '@/payload-types';

import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

// Add strong types for card and link items
type CardItem = NonNullable<CardGridProps['cards']>[number];
type LinkItem = NonNullable<CardItem['links']>[number];

function Card({ card }: { card: CardItem }) {
  if (!card) return null;

  const image = card?.image as Media;

  return (
    <article>
      <div
        className={
          'relative mb-8 aspect-[373/400] w-full overflow-hidden rounded-2xl'
        }
      >
        <Image
          src={image?.url || ''}
          alt={image?.alt || ''}
          fill
          className={'object-cover'}
        />
      </div>

      <h3 className={'mb-6 border-b border-neutral-400 pb-6'}>{card.title}</h3>
      <p>{card.description}</p>
      <div className={'mt-8'}>
        {card.links?.map(({ link }: LinkItem, i: number) => (
          <Link
            key={i}
            href={link.url || ''}
            className={
              'group relative inline-flex items-center gap-1 px-2 transition-all duration-200 hover:text-white'
            }
          >
            <span
              className={
                'bg-redbird absolute -top-0.5 bottom-0 left-0 -z-10 w-0.5 transition-all duration-200 group-hover:w-full'
              }
            />
            Read more
            <ArrowRight
              size={22}
              className={
                '-rotate-45 transition-all duration-200 group-hover:rotate-0'
              }
            />
          </Link>
        ))}
      </div>
    </article>
  );
}

export default function CardGrid(props: CardGridProps) {
  const { title, headline, links, cards } = props;

  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[1220px]'}>
        <SectionHeader
          title={title || ''}
          headline={headline || ''}
        />
        <div className={'flex flex-col items-center gap-12'}>
          <div className={'w-full justify-center gap-6 md:flex lg:gap-10'}>
            {cards?.map((card) => (
              <div
                key={card.title}
                className={'mx-auto w-full max-w-[500px]'}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
          {links?.map(
            (
              { link }: NonNullable<CardGridProps['links']>[number],
              i: number
            ) => (
              <Button
                key={i}
                variant={'secondary'}
                size={'lg'}
              >
                <Link href={link.url || ''}>{link.label}</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
