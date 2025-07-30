import CTA from '@/components/CTA';
import CardGrid from '@/components/CardGrid';
import HomeHero from '@/components/HomeHero';
import Selection from '@/components/Selection';
import { getPageBySlug } from '@/db/queries/pages';
import type { Page } from '@/payload-types';

// Transform payload hero data to match HomeHero component interface
function transformHeroData(hero: Page['hero']) {
  if (!hero) return null;

  const transformedLinks =
    hero.links?.map((linkItem) => ({
      label: linkItem.link.label,
      url: linkItem.link.url || '#',
      appearance: linkItem.link.appearance || 'default'
    })) || [];

  const transformedImage =
    hero.image && typeof hero.image === 'object' && 'url' in hero.image
      ? {
          url: hero.image.url || '',
          alt: hero.image.alt || '',
          width: hero.image.width || 0,
          height: hero.image.height || 0
        }
      : {
          url: '/images/hero-img.png', // fallback image
          alt: 'Hero image',
          width: 715,
          height: 773
        };

  return {
    title: hero.title || '',
    subtext: hero.subtext || '',
    image: transformedImage,
    links: transformedLinks
  };
}

export default async function Home() {
  const page = await getPageBySlug('home');

  console.log(page);

  const heroData = transformHeroData(page?.hero);

  return (
    <main>
      {heroData && <HomeHero hero={heroData} />}
      <div className={'[&>section]:even:bg-secondary-1'}>
        <CTA />
        <Selection />
        <CardGrid />
      </div>
    </main>
  );
}
