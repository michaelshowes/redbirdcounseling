import Image from 'next/image';

import { Button } from './ui/button';
import { TextGenerateEffect } from './utils/TextGenerateEffect';

export default function ComingSoon() {
  return (
    <div className={'mx-auto h-full grid-cols-2 items-center lg:grid'}>
      <div className={'flex flex-col items-start p-4 lg:p-20'}>
        <div className={'relative mb-10 size-[200px] self-center'}>
          <Image
            src={'/images/logo.svg'}
            alt={'Logo'}
            fill
            className={'rounded-full'}
          />
        </div>

        <h1 className={'relative mb-4 max-md:text-5xl'}>
          <div
            className={
              'absolute -top-7 -left-7 size-14 transition duration-1000 lg:-top-12 lg:-left-12 lg:size-20 starting:-translate-y-4 starting:blur-sm'
            }
          >
            <Image
              src={'/images/redbird.svg'}
              alt={'Logo'}
              fill
              className={'rounded-full'}
            />
          </div>
          <TextGenerateEffect
            hasPeriod
            words={'You’ve carried enough. It’s time to learn to fly'}
          />
        </h1>

        <p className={'mb-4 text-2xl font-bold'}>
          Our new website is coming soon.
        </p>
        <p className={'mb-4'}>
          We’re building a space that reflects the heart of our work- helping
          people who are tired of pretending they’re fine and are ready for
          something more honest, more healing and more sustainable.
        </p>
        <p className={'mb-4'}>
          Whether you’re questioning your relationship with alcohol, processing
          trauma or navigating major life transitions, this is a space for you
          to lay it all down.
        </p>
        <p className={'mb-4'}>Therapy that meets you where you are</p>
        <p className={'mb-4'}>
          You don’t need to hit rock bottom to ask for help. We offer
          trauma-informed, nonjudgmental therapy that honors your story and
          supports real change. You deserve care, connection, and healing that
          works for your life.
        </p>

        <Button
          size={'lg'}
          className={'mt-10'}
        >
          <a href='https://nicole-michels.clientsecure.me/'>
            Book an appointment
          </a>
        </Button>
      </div>

      <div className={'relative hidden h-full lg:block'}>
        <Image
          src={'/images/bird.jpg'}
          alt={'Coming soon'}
          fill
          className={'h-full object-cover'}
        />
      </div>
    </div>
  );
}
