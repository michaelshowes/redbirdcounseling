import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { CredentialsGrid as CredentialsGridProps } from '@/payload-types';

import RichText from './RichTextRenderer';
import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

export default function CredentialsGrid(props: CredentialsGridProps) {
  const { title, headline, richTextDescription, links, credentials } = props;

  return (
    <section className={'section-spacing'}>
      <div
        className={'mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-6'}
      >
        <div className={'relative max-w-[600px]'}>
          <div className={'absolute inset-0 scale-75 opacity-[.04]'}>
            <Image
              src={'/images/redbird.svg'}
              alt={'Logo'}
              fill
              className={'rounded-full'}
            />
          </div>
          <div className={'sticky top-8'}>
            <SectionHeader
              title={title || ''}
              headline={headline || ''}
              align={'left'}
              className={'mb-4'}
            />
            <RichText data={richTextDescription as DefaultTypedEditorState} />
            <Button
              size={'lg'}
              className={'mt-8 lg:mt-12'}
              link
              href={links?.[0]?.link?.url || ''}
              target={links?.[0]?.link?.newTab ? '_blank' : '_self'}
            >
              Book an appointment
            </Button>
          </div>
        </div>

        <div className={'flex flex-col gap-6 md:gap-12'}>
          {credentials?.map((credential) => (
            <div
              key={credential.id}
              className={
                'rounded-2xl border border-neutral-300 bg-white p-6 lg:p-12'
              }
            >
              <RichText
                data={credential.richTextDescription as DefaultTypedEditorState}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
