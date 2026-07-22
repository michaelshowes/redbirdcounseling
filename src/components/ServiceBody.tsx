import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { cn } from '@/lib/utils';
import {
  Media,
  Service,
  ServiceDetailHero as ServiceDetailHeroProps
} from '@/payload-types';

import { RenderBlocks } from './RenderBlocks';
import RichTextRenderer from './RichTextRenderer';
import ServiceDetails from './ServiceDetails';
import ServiceDetailHero from './heroes/ServiceDetailHero';

type Props = {
  service: Service;
  /** True while rendered inside the admin live-preview iframe. */
  preview?: boolean;
  orderedServices?: { service: Service }[];
};

/**
 * Shared, server- and client-safe render tree for a Service detail page.
 * Rendered directly on the server for production and re-rendered on the client
 * (with live data) by `ServiceLivePreview`.
 */
export default function ServiceBody({
  service,
  preview,
  orderedServices
}: Props) {
  const hero = service.hero as ServiceDetailHeroProps & { image: Media };

  return (
    <>
      <ServiceDetailHero
        {...hero}
        preview={preview}
      />
      <div className={'flex justify-center px-4'}>
        <div
          className={cn('w-full max-w-[700px]', {
            'grid max-w-[1092px] gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]':
              service.details?.showDetails
          })}
        >
          <div className={'relative'}>
            <div className={'sticky top-10'}>
              <ServiceDetails {...service} />
            </div>
          </div>
          <RichTextRenderer
            data={service.content.description as DefaultTypedEditorState}
            enableProse
          />
        </div>
        <div className={'[&>section]:even:bg-secondary-1'}>
          <RenderBlocks
            blocks={service.content?.content}
            orderedServices={orderedServices}
          />
        </div>
      </div>
    </>
  );
}
