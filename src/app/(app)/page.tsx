import CTA from '@/components/CTA';
import CardGrid from '@/components/CardGrid';
import HomeHero from '@/components/HomeHero';
import Selection from '@/components/Selection';
import { getPageBySlug } from '@/db/queries/pages';

export default async function Home() {
  // const page = await getPageBySlug('home');

  // console.log(page);

  return (
    <main>
      <HomeHero />
      <div className={'[&>section]:even:bg-secondary-1'}>
        <CTA />
        <Selection />
        <CardGrid />
      </div>
    </main>
  );
}
