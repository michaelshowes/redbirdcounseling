import { Page } from '@/payload-types';

import AboutHero from './AboutHero';
import BasicHero from './BasicHero';
import ContactHero from './ContactHero';
import FaqHero from './FaqHero';
import HomeHero from './HomeHero';
import ServicesHero from './ServicesHero';

const heroes = {
  home: HomeHero,
  about: AboutHero,
  faq: FaqHero,
  basic: BasicHero,
  contact: ContactHero,
  services: ServicesHero
};

export default function RenderHero(props: Page) {
  const { template } = props;

  if (!template) return null;

  const HeroToRender = heroes[template as keyof typeof heroes];

  if (!HeroToRender) return null;

  // @ts-expect-error - TODO: fix this
  return <HeroToRender {...props.hero} />;
}
