import { draftMode } from 'next/headers';

import { RenderBlocks } from '@/components/RenderBlocks';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import RenderHero from '@/components/heroes/RenderHero';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getPageBySlug } from '@/db/queries/pages';

type Props = {
  params: Promise<{ slug?: string }>;
};

export default async function Page({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await params;
  const page = await getPageBySlug(slug);

  if (!page) return null;

  return (
    <main>
      <DraftModeBanner
        collection={'pages'}
        id={page.id}
        status={page._status}
      />
      {draft && <LivePreviewListener />}
      <RenderHero
        template={page.template}
        hero={page.hero}
      />
      <div className={'[&>section]:even:bg-secondary-1'}>
        {page?.content?.content && (
          // @ts-expect-error - content exists
          <RenderBlocks blocks={page.content.content} />
        )}
      </div>
    </main>
  );
}
