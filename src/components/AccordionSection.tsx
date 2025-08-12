import Image from 'next/image';

import { Accordion as AccordionProps } from '@/payload-types';

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
            title={title}
            headline={headline}
          />
          {text && <p>{text}</p>}

          <Accordion
            type='single'
            collapsible
            className={
              'bg-secondary-1 mt-20 rounded-2xl px-4 py-10 md:px-8 lg:px-32 lg:py-20'
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
                  {item.question}
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
                    <p className={'mb-4 text-base'}>{item.answer}</p>
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
