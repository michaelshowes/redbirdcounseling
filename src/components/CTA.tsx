import Link from 'next/link';

import { CTA as CTAProps } from '@/payload-types';

import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

export default function CTA(props: CTAProps) {
  const { title, headline, text, link } = props;

  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto flex max-w-[900px] flex-col items-center'}>
        <SectionHeader
          title={title || ''}
          headline={headline || ''}
        />
        <p>{text}</p>
        <Button
          variant={'secondary'}
          size={'lg'}
          className={'mt-10'}
        >
          {link && (
            <Link
              href={
                link.type === 'reference' &&
                link.reference?.value &&
                typeof link.reference.value === 'object'
                  ? `/${link.reference.value.slug}`
                  : link.url || '#'
              }
            >
              {link.label}
            </Link>
          )}
        </Button>
      </div>
    </section>
  );
}
