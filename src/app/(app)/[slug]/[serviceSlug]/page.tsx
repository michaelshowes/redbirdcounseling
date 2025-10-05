import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { RenderBlocks } from '@/components/RenderBlocks';
import RichTextRenderer from '@/components/RichTextRenderer';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import ServiceDetailHero from '@/components/heroes/ServiceDetailHero';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getServiceBySlug } from '@/db/queries/services';
import {
  Media,
  ServiceDetailHero as ServiceDetailHeroProps
} from '@/payload-types';

type ServicePageProps = {
  params: Promise<{ slug: string; serviceSlug: string }>;
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, serviceSlug } = await params;
  const { isEnabled: draft } = await draftMode();

  if (slug !== 'services') {
    notFound();
  }

  const service = await getServiceBySlug(serviceSlug);
  const hero = service.hero as ServiceDetailHeroProps & { image: Media };

  return (
    <div>
      <DraftModeBanner
        collection={'services'}
        id={service.id}
        status={service._status}
      />
      {draft && <LivePreviewListener />}
      <ServiceDetailHero {...hero} />
      <div className={'mx-auto max-w-[700px]'}>
        <RichTextRenderer
          data={service.content.description as DefaultTypedEditorState}
          enableProse
        />
      </div>
      <div className={'[&>section]:even:bg-secondary-1'}>
        {service?.content?.content && (
          // @ts-expect-error - content exists
          <RenderBlocks blocks={service.content.content} />
        )}
      </div>
    </div>
  );
}
