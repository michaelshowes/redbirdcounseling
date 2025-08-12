// import CardGrid from './CardGrid';
import { TextGenerateEffect } from './utils/TextGenerateEffect';

export default function ServicesHero() {
  return (
    <section className={'section-spacing bg-secondary-1 relative'}>
      <div className={'mx-auto mb-10 max-w-[1440px] text-center lg:mb-20'}>
        <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
          <TextGenerateEffect
            hasPeriod
            words={'Professional Therapeutic Services'}
          />
        </h1>
        <p className={'mx-auto max-w-[765px]'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua quis
          ullamco.
        </p>
      </div>

      <div className={'[&>section]:py-0'}>{/* <CardGrid /> */}</div>
    </section>
  );
}
