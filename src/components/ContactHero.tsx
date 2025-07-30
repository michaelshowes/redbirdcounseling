import ContactForm from "./ContactForm";
import { TextGenerateEffect } from "./utils/TextGenerateEffect";

export default function ContactHero() {
  return (
    <section className={'section-spacing bg-secondary-1 relative md:px-0'}>
      <div
        className={
          'md:site-padding mx-auto mb-10 max-w-[1440px] text-center lg:mb-20'
        }
      >
        <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
          <TextGenerateEffect
            hasPeriod
            words={'Book an Appointment'}
          />
        </h1>
        <p className={'mx-auto max-w-[765px]'}>{'Arcu semper urna diam arcu tristique scelerisque fringilla tincidunt leo. Metus leo elit feugiat varius dictum gravida donec sit lacus. Sit leo platea urna sagittis eu in.'}</p>
      </div>

      <ContactForm />
    </section>
  )
}