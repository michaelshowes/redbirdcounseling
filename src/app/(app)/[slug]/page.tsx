import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import PageBody from '@/components/PageBody';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import PageLivePreview from '@/components/utils/PageLivePreview';
import { getPageBySlug } from '@/db/queries/pages';
import { getSettings } from '@/db/queries/settings';
import { Service } from '@/payload-types';
import { generateMeta } from '@/utils/generateMeta';
import { StructuredData, generateWebPageSchema } from '@/utils/structuredData';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = 'home' } = await params;
  const page = await getPageBySlug(slug);
  return generateMeta({ doc: page });
}

type Props = {
  params: Promise<{ slug?: string }>;
};

export default async function Page({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await params;
  const page = await getPageBySlug(slug);

  // console.log(
  //   page?.content?.content?.filter((block) => block.blockType === 'accordion')
  // );

  if (!page) return null;

  // Global settings consumed by settings-driven heroes/blocks (ServicesHero,
  // ContactHero, ServiceGrid). Fetched here so those components stay pure and
  // can render in both the server (production) and client (live preview) trees.
  const settings = await getSettings();
  const orderedServices = settings.orderedServices as
    | { service: Service }[]
    | undefined;
  const contactForm = settings.contactForm;

  // Generate breadcrumb structured data for pages
  const breadcrumbs =
    slug !== 'home'
      ? [
          {
            name: 'Home',
            url: 'https://www.meetredbirdcounseling.com'
          },
          {
            name: page.title,
            url: `https://www.meetredbirdcounseling.com/${slug}`
          }
        ]
      : undefined;

  const webPageSchema = generateWebPageSchema({
    url: `https://www.meetredbirdcounseling.com/${slug === 'home' ? '' : slug}`,
    title: page.title,
    description:
      page.meta?.description ||
      'Professional counselor and therapist in Denver, Colorado.',
    breadcrumbs
  });

  return (
    <>
      <StructuredData data={webPageSchema} />
      <DraftModeBanner
        collection={'pages'}
        id={page.id}
        status={page._status}
      />
      {draft ? (
        <PageLivePreview
          initialData={page}
          orderedServices={orderedServices}
          contactForm={contactForm}
        />
      ) : (
        <PageBody
          page={page}
          orderedServices={orderedServices}
          contactForm={contactForm}
        />
      )}
    </>
  );
}
