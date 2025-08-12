import { draftMode } from 'next/headers';

import HomeHero, { HomeHeroProps } from '@/components/HomeHero';
import { RenderBlocks } from '@/components/RenderBlocks';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getPageBySlug } from '@/db/queries/pages';

type Props = {
  params: Promise<{ slug?: string }>;
};

export default async function Page({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await params;
  const page = await getPageBySlug(slug);

  return (
    <main>
      {draft && <LivePreviewListener />}
      {page?.hero && <HomeHero data={page.hero.hero as HomeHeroProps} />}
      <div className={'[&>section]:even:bg-secondary-1'}>
        {page?.content.content && (
          <RenderBlocks blocks={page.content.content} />
        )}
      </div>
    </main>
  );
}
