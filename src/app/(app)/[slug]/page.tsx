import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { RenderBlocks } from '@/components/RenderBlocks';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import RenderHero from '@/components/heroes/RenderHero';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getPageBySlug } from '@/db/queries/pages';
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
      'Professional counselor and therapist in Cincinnati, Ohio.',
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
      {draft && <LivePreviewListener />}
      <RenderHero {...page} />
      <div className={'[&>section]:even:bg-secondary-1'}>
        {page?.content?.content && (
          // @ts-expect-error - content exists
          <RenderBlocks blocks={page.content.content} />
        )}
      </div>
    </>
  );
}
