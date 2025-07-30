import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

interface CardProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  url: string;
}

const cards: CardProps[] = [
  {
    title: 'Family Therapy',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore euiatur.',
    url: '#',
    image: {
      src: '/images/card1.png',
      alt: 'Family Therapy'
    }
  },
  {
    title: 'Personal Therapy',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore euiatur.',
    url: '#',
    image: {
      src: '/images/card2.png',
      alt: 'Personal Therapy'
    }
  },
  {
    title: 'Clinical Diagnosis',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore euiatur.',
    url: '#',
    image: {
      src: '/images/card3.png',
      alt: 'Clinical Diagnosis'
    }
  }
];

function Card({ card }: { card: CardProps }) {
  return (
    <article>
      <div
        className={
          'relative mb-8 aspect-[373/400] w-full overflow-hidden rounded-2xl'
        }
      >
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          className={'object-cover'}
        />
      </div>

      <h3 className={'mb-6 border-b border-neutral-400 pb-6'}>{card.title}</h3>
      <p>{card.description}</p>
      <div className={'mt-8'}>
        <Link
          href={card.url}
          className={
            'group relative inline-flex items-center gap-1 px-2 transition-all duration-200 hover:text-neutral-100'
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
      </div>
    </article>
  );
}

export default function CardGrid() {
  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[1220px]'}>
        <SectionHeader
          title={'Services'}
          headline={'Experienced in different types of therapy'}
        />
        <div className={'flex flex-col items-center gap-12'}>
          <div className={'w-full justify-center gap-6 md:flex lg:gap-10'}>
            {cards.map((card) => (
              <div
                key={card.title}
                className={'mx-auto w-full max-w-[500px]'}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
          <Button
            variant={'secondary'}
            size={'lg'}
          >
            View all services
          </Button>
        </div>
      </div>
    </section>
  );
}
