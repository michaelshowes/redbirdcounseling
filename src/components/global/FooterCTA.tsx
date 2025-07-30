'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import Marquee from '../utils/Marquee';

const data = {
  marquee: 'Book a Consultation',
  link: {
    text: 'Schedule a Consultation',
    href: '#'
  },
  eyebrow: 'Ready to get started?',
  title: "You're worth it.",
  subtitle: 'Ready to get started?'
};

export default function FooterCTA() {
  return (
    <section className='section-spacing relative mx-auto mt-20 -mb-20 w-full max-w-[1220px] overflow-hidden rounded-2xl bg-neutral-100 py-10 shadow-sm md:py-20'>
      {/* Scrolling Background Text */}
      <div className={'absolute top-0 isolate'}>
        <Marquee
          pauseOnHover={false}
          speed={'normal'}
          className={'-z-10'}
        >
          <span
            className={
              'font-serif text-9xl text-[#f5f1ed] uppercase opacity-50'
            }
          >
            {data.marquee}
          </span>
        </Marquee>
      </div>

      {/* Main Content */}
      <div className='relative z-10 mx-auto text-center'>
        <p className='mb-8 text-sm font-medium tracking-widest text-gray-600 uppercase'>
          {data.eyebrow}
        </p>

        <h2 className='mb-12 font-serif text-6xl font-light tracking-tight text-black md:text-7xl'>
          {data.title}
        </h2>

        <Button size='lg'>
          <Link href={data.link.href}>{data.link.text}</Link>
        </Button>
      </div>
    </section>
  );
}
