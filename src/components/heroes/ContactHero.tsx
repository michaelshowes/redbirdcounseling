import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { ContactHero as ContactHeroProps, Media, Setting } from '@/payload-types';

import ContactForm from '../ContactForm';
import { TextGenerateEffect } from '../utils/TextGenerateEffect';

type Props = ContactHeroProps & {
  image: Media;
  preview?: boolean;
  contactForm?: Setting['contactForm']['contactForm'];
};

export default function ContactHero(props: Props) {
  const { title, subtext, contactForm, preview } = props || {};
  const draft = preview;

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

      <ContactForm
        confirmationMessage={
          contactForm?.confirmationMessage as DefaultTypedEditorState
        }
      />
    </section>
  );
}
