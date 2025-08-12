import { draftMode } from 'next/headers';

import FaqHero, { FaqHeroProps } from '@/components/FaqHero';
import { RenderBlocks } from '@/components/RenderBlocks';
import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getPageBySlug } from '@/db/queries/pages';

export default async function FaqPage() {
  const { isEnabled: draft } = await draftMode();
  const page = await getPageBySlug('faq');

  return (
    <div>
      {draft && <LivePreviewListener />}
      {page?.hero?.hero && <FaqHero data={page.hero.hero as FaqHeroProps} />}
      <div className={'[&>section]:even:bg-secondary-1'}>
        {page?.content.content && (
          <RenderBlocks blocks={page.content.content} />
        )}
      </div>
    </div>
  );
}
