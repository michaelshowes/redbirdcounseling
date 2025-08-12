import Link from 'next/link';

import { CTA as CTAProps } from '@/payload-types';

import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

export default function CTA(props: CTAProps) {
  const { title, headline, text, links } = props;

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
          <Link href={links?.[0]?.link?.url || ''}>
            {links?.[0]?.link?.label}
          </Link>
        </Button>
      </div>
    </section>
  );
}
