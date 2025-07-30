import SectionHeader from './shared/SectionHeader';
import { Button } from './ui/button';

export default function CTA() {
  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto flex max-w-[900px] flex-col items-center'}>
        <SectionHeader
          title={'About Me'}
          headline={
            'I’m Nicole, a dedicated therapist with 10+ years of experience'
          }
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
          urna duis convallis convallis. Sodales ut etiam sit amet nisl purus
          in. Mollis aliquam ut porttitor leo a diam sollicitudin. Viverra nibh
          cras pulvinar mattis nunc sed blandit. Vulputate eu scelerisque felis
          imperdiet.
        </p>
        <Button
          variant={'secondary'}
          size={'lg'}
          className={'mt-10'}
        >
          Browse our services
        </Button>
      </div>
    </section>
  );
}
