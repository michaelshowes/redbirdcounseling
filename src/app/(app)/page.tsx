// import { draftMode } from 'next/headers';
import HomeHero, { HomeHeroProps } from '@/components/HomeHero';
import { RenderBlocks } from '@/components/RenderBlocks';
// import { LivePreviewListener } from '@/components/utils/LivePreviewListener';
import { getPageBySlug } from '@/db/queries/pages';

export default async function Home() {
  // const { isEnabled: draft } = await draftMode();
  const page = await getPageBySlug('home');

  return (
    <main>
      {/* {draft && <LivePreviewListener />} */}
      {page?.hero && <HomeHero data={page.hero.hero as HomeHeroProps} />}
      <div className={'[&>section]:even:bg-secondary-1'}>
        {page?.content.content && (
          <RenderBlocks blocks={page.content.content} />
        )}
      </div>
    </main>
  );
}
