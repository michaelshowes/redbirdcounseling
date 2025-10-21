import { getSettings } from '@/db/queries/settings';

import FooterCTAButton from './FooterCTAButton';

// import Marquee from '../utils/Marquee';

export default async function FooterCTA() {
  const { footer } = await getSettings();
  const { cta } = footer;

  return (
    <section className='section-spacing relative mx-auto mt-20 -mb-20 w-full max-w-[1220px] overflow-hidden rounded-2xl bg-white py-10 shadow-sm md:py-20'>
      {/* Scrolling Background Text */}
      {/* <div className={'absolute top-0 isolate'}>
        <Marquee
          pauseOnHover={false}
          speed={'normal'}
          className={'-z-10'}
        >
          <span
            className={
              'serif text-9xl text-[#f5f1ed] uppercase opacity-50'
            }
          >
            {data.marquee}
          </span>
        </Marquee>
      </div> */}

      {/* Main Content */}
      <div className='relative z-10 mx-auto text-center'>
        <p className='mb-8 text-sm font-medium tracking-widest text-gray-600 uppercase'>
          {cta.eyebrow}
        </p>

        <h2 className='serif mb-12 text-6xl font-light tracking-tight text-black md:text-7xl'>
          {cta.headline}
        </h2>
        <FooterCTAButton link={cta.link as { url: string; label: string }} />
      </div>
    </section>
  );
}
