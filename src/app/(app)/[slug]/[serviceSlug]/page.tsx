import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import RichTextRenderer from '@/components/RichTextRenderer';
import ServiceDetailHero from '@/components/heroes/ServiceDetailHero';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getServiceBySlug } from '@/db/queries/services';

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

  return (
    <div>
      {draft && <LivePreviewListener />}
      <ServiceDetailHero {...service.hero} />
      <div className={'mx-auto max-w-[700px]'}>
        <RichTextRenderer
          data={service.content.description as DefaultTypedEditorState}
          enableProse
        />
      </div>
      ServicePage
    </div>
  );
}
