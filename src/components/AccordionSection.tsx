import Image from 'next/image';

import SectionHeader from './shared/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';

const faqs = [
  {
    id: 1,
    title: 'What can I expect during my first therapy session?',
    text: "Your first session is an opportunity for us to get to know each other. We'll discuss what brought you to therapy, your goals, and any concerns you may have. I'll explain my approach and answer any questions about the therapeutic process. This session is about creating a safe, comfortable space where you feel heard and understood."
  },
  {
    id: 2,
    title: 'How long does therapy typically take?',
    text: "The length of therapy varies greatly depending on your individual needs, goals, and circumstances. Some people find relief in just a few sessions, while others benefit from longer-term work. We'll regularly check in about your progress and adjust our approach as needed. You're always in control of how long you'd like to continue."
  },
  {
    id: 3,
    title: 'Do you accept insurance?',
    text: 'I accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealth. I also offer a sliding scale fee structure for those without insurance or with high deductibles. Please contact me to verify your specific coverage and discuss payment options that work for your situation.'
  },
  {
    id: 4,
    title: 'Is everything I share in therapy confidential?',
    text: "Yes, confidentiality is a cornerstone of therapy. Everything you share is protected by law and professional ethics. There are only a few exceptions where I'm required to break confidentiality: if there's imminent danger to yourself or others, suspected child or elder abuse, or if records are subpoenaed by a court. I'll always discuss these limits with you."
  },
  {
    id: 5,
    title: 'What types of therapy do you offer?',
    text: "I specialize in Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and mindfulness-based approaches. I also integrate elements of psychodynamic therapy when appropriate. My approach is tailored to each individual's needs, and we'll work together to find the methods that resonate most with you."
  },
  {
    id: 6,
    title: 'How do I know if therapy is working?',
    text: "Progress in therapy can be subtle and gradual. You might notice improved mood, better relationships, increased self-awareness, or more effective coping strategies. We'll regularly discuss your progress and adjust our approach if needed. Remember, healing isn't always linear – some sessions may feel more productive than others, and that's completely normal."
  },
  {
    id: 7,
    title: 'Can I contact you between sessions?',
    text: "For non-emergency situations, you can email me, and I'll typically respond within 24-48 hours. For urgent matters, please call my office number. In case of a mental health emergency, please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room."
  },
  {
    id: 8,
    title: "What if I don't feel comfortable with you as my therapist?",
    text: "The therapeutic relationship is crucial for successful outcomes. If you don't feel we're a good fit, that's completely okay and nothing to feel bad about. I can help you find another therapist who might be better suited to your needs. Your comfort and progress are what matter most."
  },
  {
    id: 9,
    title: 'Do you offer online/virtual sessions?',
    text: 'Yes, I offer secure video sessions through a HIPAA-compliant platform. Online therapy can be just as effective as in-person sessions and offers greater flexibility and accessibility. We can discuss whether virtual sessions are right for your specific needs and situation.'
  },
  {
    id: 10,
    title: 'How often should I attend therapy sessions?',
    text: "Most clients benefit from weekly sessions, especially when starting therapy. As you progress, we might adjust to bi-weekly or monthly sessions. The frequency depends on your needs, goals, and life circumstances. We'll work together to find a schedule that supports your healing journey."
  }
];

export default function AccordionSection() {
  return (
    <section className={'section-spacing'}>
      <div className={'mx-auto max-w-[900px]'}>
        <h1 className={'sr-only'}>Frequently Asked Questions</h1>
        <div>
          <SectionHeader
            title={'FAQ'}
            headline={'Frequently Asked Questions'}
          />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe,
            natus sed voluptates quaerat quasi iste facere dolor reprehenderit
            ipsum vel nostrum quos consequuntur nam rem vero maiores delectus,
            ullam dignissimos.
          </p>

          <Accordion
            type='single'
            collapsible
            className={
              'bg-secondary-1 mt-20 rounded-2xl px-4 py-10 md:px-8 lg:px-32 lg:py-20'
            }
          >
            {faqs.map((item, i) => (
              <AccordionItem
                value={`item-${i}`}
                key={item.id}
              >
                <AccordionTrigger
                  className={'cursor-pointer py-8 text-xl md:text-2xl'}
                >
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className={'flex items-start gap-1'}>
                    <div className={'relative size-8 shrink-0'}>
                      <Image
                        src={'/images/redbird.svg'}
                        alt={'Logo'}
                        fill
                      />
                    </div>
                    <p className={'mb-4 text-base'}>{item.text}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
