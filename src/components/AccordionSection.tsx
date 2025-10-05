import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { Accordion as AccordionProps } from '@/payload-types';

import RichText from './RichTextRenderer';
import SectionHeader from './shared/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';

export default function AccordionSection(props: AccordionProps) {
  const { title, headline, text, items } = props;

  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[900px]'}>
        <h1 className={'sr-only'}>{title}</h1>
        <div>
          <SectionHeader
            title={title || ''}
            headline={headline || ''}
          />
          {text && <RichText data={text as DefaultTypedEditorState} />}

          <Accordion
            type='single'
            collapsible
            className={
              'bg-secondary-1 rounded-2xl px-4 py-10 md:px-8 lg:px-32 lg:py-20'
            }
          >
            {items?.map((item, i) => (
              <AccordionItem
                value={`item-${i}`}
                key={item.id}
              >
                <AccordionTrigger
                  className={'cursor-pointer py-8 text-xl md:text-2xl'}
                >
                  {item.itemTitle}
                </AccordionTrigger>
                <AccordionContent>
                  <div className={'flex items-start gap-1'}>
                    <div className={'relative size-8 shrink-0'}>
                      <Image
                        src={'/images/redbird.svg'}
                        alt={'Logo'}
                        fill
                      />
                    </div>
                    <RichText data={item.text as DefaultTypedEditorState} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
