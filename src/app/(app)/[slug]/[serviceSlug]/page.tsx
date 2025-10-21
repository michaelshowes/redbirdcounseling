import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { RenderBlocks } from '@/components/RenderBlocks';
import RichTextRenderer from '@/components/RichTextRenderer';
import ServiceDetails from '@/components/ServiceDetails';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import ServiceDetailHero from '@/components/heroes/ServiceDetailHero';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getServiceBySlug } from '@/db/queries/services';
import { cn } from '@/lib/utils';
import {
  Media,
  ServiceDetailHero as ServiceDetailHeroProps
} from '@/payload-types';
import { generateMeta } from '@/utils/generateMeta';
import { StructuredData, generateWebPageSchema } from '@/utils/structuredData';

export async function generateMetadata({
  params: paramsPromise
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await paramsPromise;
  const service = await getServiceBySlug(serviceSlug);

  return generateMeta({ doc: service });
}

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

  // Generate breadcrumb structured data for SEO
  const webPageSchema = generateWebPageSchema({
    url: `https://www.meetredbirdcounseling.com/services/${serviceSlug}`,
    title: service.title,
    description:
      service.meta?.description ||
      `${service.title} services in Cincinnati, Ohio. Professional counseling and therapy by Redbird Counseling.`,
    breadcrumbs: [
      {
        name: 'Home',
        url: 'https://www.meetredbirdcounseling.com'
      },
      {
        name: 'Services',
        url: 'https://www.meetredbirdcounseling.com/services'
      },
      {
        name: service.title,
        url: `https://www.meetredbirdcounseling.com/services/${serviceSlug}`
      }
    ]
  });

  return (
    <div>
      <StructuredData data={webPageSchema} />
      <DraftModeBanner
        collection={'services'}
        id={service.id}
        status={service._status}
      />
      {draft && <LivePreviewListener />}
      <ServiceDetailHero {...hero} />
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
          {service?.content?.content && (
            // @ts-expect-error - content exists
            <RenderBlocks blocks={service.content.content} />
          )}
        </div>
      </div>
    </div>
  );
}
