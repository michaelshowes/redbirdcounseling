import { draftMode } from 'next/headers';

import { ContactHero as ContactHeroProps, Media } from '@/payload-types';

import ContactForm from '../ContactForm';
import { TextGenerateEffect } from '../utils/TextGenerateEffect';

type Props = ContactHeroProps & {
  image: Media;
};

export default async function ContactHero(props: Props) {
  const { title, subtext } = props || {};

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
        <p className={'mx-auto max-w-[765px]'}>{subtext}</p>
      </div>

      <ContactForm />
    </section>
  );
}
