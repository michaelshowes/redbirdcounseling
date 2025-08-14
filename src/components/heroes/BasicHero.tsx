import { Page } from '@/payload-types';

export default function BasicHero({ basicHero }: { basicHero: Page['hero'] }) {
  // const { title, subtext, image, links } = basicHero || {};
  console.log(basicHero);

  return <div>BasicHero</div>;
}
