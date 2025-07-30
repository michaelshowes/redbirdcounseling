import Image from 'next/image';

export default function FaqHero() {
  return (
    <section className={'bg-secondary-1 relative px-8 pt-10'}>
      <span
        className={'absolute right-0 bottom-0 left-0 h-20 bg-neutral-100'}
      />
      <div
        className={
          'relative mx-auto h-56 max-w-[1440px] overflow-hidden rounded-2xl lg:h-[400px]'
        }
      >
        <Image
          src={'/images/faq-img.jpg'}
          fill
          alt={'alt text'}
          className={'object-cover'}
        />
      </div>
    </section>
  );
}
