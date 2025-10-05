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
} as const;

type HeroType = keyof typeof heroes;

export default function RenderHero({ template, hero }: Page) {
  if (!template) return null;

  if (template && template in heroes) {
    const Hero = heroes[template as HeroType];
    const heroData = hero?.[`${template}Hero`];

    if (Hero) {
      return <Hero {...(heroData as any)} />;
    }
  }
}
