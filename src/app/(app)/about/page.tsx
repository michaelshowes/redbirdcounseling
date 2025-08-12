import { draftMode } from 'next/headers';

import AboutHero, { AboutHeroProps } from '@/components/AboutHero';
import { RenderBlocks } from '@/components/RenderBlocks';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getPageBySlug } from '@/db/queries/pages';

export default async function AboutPage() {
  const { isEnabled: draft } = await draftMode();
  const page = await getPageBySlug('about');

  return (
    <div>
      {draft && <LivePreviewListener />}
      {page?.hero?.hero && (
        <AboutHero data={page.hero.hero as unknown as AboutHeroProps} />
      )}
      <div className={'[&>section]:even:bg-secondary-1'}>
        {page?.content.content && (
          <RenderBlocks blocks={page.content.content} />
        )}
      </div>
    </div>
  );
}
