import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import {
  LICENSED_STATES,
  PRACTITIONER_FULL_NAME
} from '@/app/constants/business';
import ServiceBody from '@/components/ServiceBody';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import ServiceLivePreview from '@/components/utils/ServiceLivePreview';
import { getServiceBySlug } from '@/db/queries/services';
import { getSettings } from '@/db/queries/settings';
import { Service } from '@/payload-types';
import { generateMeta } from '@/utils/generateMeta';
import { StructuredData, generateWebPageSchema } from '@/utils/structuredData';

export async function generateMetadata({
  params: paramsPromise
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await paramsPromise;
  const service = await getServiceBySlug(serviceSlug);

  return generateMeta({
    doc: service,
    path: `/specialties/${serviceSlug}`
  });
}

type ServicePageProps = {
  params: Promise<{ slug: string; serviceSlug: string }>;
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, serviceSlug } = await params;
  const { isEnabled: draft } = await draftMode();

  if (slug !== 'specialties') {
    notFound();
  }

  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  // ServiceGrid blocks that may appear in the service body need the global
  // ordered-services list; fetch it here so the body stays a pure component.
  const settings = await getSettings();
  const orderedServices = settings.orderedServices as
    | { service: Service }[]
    | undefined;

  // Generate breadcrumb structured data for SEO
  const webPageSchema = generateWebPageSchema({
    url: `https://www.meetredbirdcounseling.com/specialties/${serviceSlug}`,
    title: service.title,
    description:
      service.meta?.description ||
      `${service.title} with ${PRACTITIONER_FULL_NAME}. Virtual therapy for hyper-independent moms in ${LICENSED_STATES.join(', ')}.`,
    breadcrumbs: [
      {
        name: 'Home',
        url: 'https://www.meetredbirdcounseling.com'
      },
      {
        name: 'Specialties',
        url: 'https://www.meetredbirdcounseling.com/specialties'
      },
      {
        name: service.title,
        url: `https://www.meetredbirdcounseling.com/specialties/${serviceSlug}`
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
      {draft ? (
        <ServiceLivePreview
          initialData={service}
          orderedServices={orderedServices}
        />
      ) : (
        <ServiceBody
          service={service}
          orderedServices={orderedServices}
        />
      )}
    </div>
  );
}
