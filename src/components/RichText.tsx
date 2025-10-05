import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { RichText as RichTextProps } from '@/payload-types';

import RichTextRenderer from './RichTextRenderer';
import SectionHeader from './shared/SectionHeader';

export default function RichText(props: RichTextProps) {
  const { title, headline, content } = props;

  console.log();

  return (
    <div className={'section-spacing'}>
      <article className={'mx-auto max-w-[1440px]'}>
        <SectionHeader
          title={title || ''}
          headline={headline || ''}
        />

        <section className={'mx-auto w-full max-w-[800px]'}>
          <RichTextRenderer
            data={content as DefaultTypedEditorState}
            enableGutter
          />
        </section>
      </article>
    </div>
  );
}
