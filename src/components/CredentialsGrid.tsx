import Image from 'next/image';

import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

const credentials = [
  {
    id: 1,
    title: 'Doctorate in Occupational Psychology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit seder do eiusmod tempor incididunt ut labore et dolore magnalet aliqua minim veniam quis nostrud exercitation.',
    source: 'University of Cincinnati',
    year: '2019'
  },
  {
    id: 2,
    title: 'Doctorate in Occupational Psychology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit seder do eiusmod tempor incididunt ut labore et dolore magnalet aliqua minim veniam quis nostrud exercitation.',
    source: 'University of Cincinnati',
    year: '2019'
  },
  {
    id: 3,
    title: 'Doctorate in Occupational Psychology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit seder do eiusmod tempor incididunt ut labore et dolore magnalet aliqua minim veniam quis nostrud exercitation.',
    source: 'University of Cincinnati',
    year: '2019'
  }
];

export default function CredentialsGrid() {
  return (
    <section className={'section-spacing'}>
      <div
        className={'mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-6'}
      >
        <div className={'relative max-w-[600px]'}>
          <div className={'absolute inset-0 scale-75 opacity-[.04]'}>
            <Image
              src={'/images/redbird.svg'}
              alt={'Logo'}
              fill
              className={'rounded-full'}
            />
          </div>
          <div className={'sticky top-8'}>
            <SectionHeader
              title={'Experience'}
              headline={'My experience & credentials'}
              align={'left'}
              className={'mb-4'}
            />
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui.
            </p>
            <Button
              size={'lg'}
              className={'mt-8 lg:mt-12'}
            >
              Book an appointment
            </Button>
          </div>
        </div>

        <div className={'flex flex-col gap-6 md:gap-12'}>
          {credentials.map((credential) => (
            <div
              key={credential.id}
              className={
                'rounded-2xl border border-neutral-300 bg-neutral-100 p-6 lg:p-12'
              }
            >
              <h3 className={'mb-3 text-2xl'}>{credential.title}</h3>
              <p>{credential.description}</p>
              <p
                className={
                  'text-redbird mt-8 flex justify-between gap-4 font-semibold uppercase lg:mt-16'
                }
              >
                <span>{credential.source}</span>
                <span>{credential.year}</span>
              </p>
              <p></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
