import { Page, Service, Setting } from '@/payload-types';

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

type RenderHeroProps = {
  page: Page;
  preview?: boolean;
  orderedServices?: { service: Service }[];
  contactForm?: Setting['contactForm']['contactForm'];
};

export default function RenderHero({
  page,
  preview,
  orderedServices,
  contactForm
}: RenderHeroProps) {
  const { template, hero } = page;
  if (!template) return null;

  if (template && template in heroes) {
    // TypeScript can't verify the dynamic template→component→props matching, so
    // we render through a permissive type. `preview`, `orderedServices`, and
    // `contactForm` are forwarded to every hero; heroes that don't need them
    // ignore the extra props. This is what lets the same tree render
    // server-side (production) and client-side (live preview) without any hero
    // reaching for server-only data.
    const Hero = heroes[
      template as HeroType
    ] as unknown as React.ComponentType<Record<string, unknown>>;
    const heroData = hero?.[`${template}Hero`];

    if (Hero && heroData) {
      return (
        <Hero
          {...heroData}
          preview={preview}
          orderedServices={orderedServices}
          contactForm={contactForm}
        />
      );
    }
  }
}
