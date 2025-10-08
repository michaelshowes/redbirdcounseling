import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
  pixelBasedPreset
} from '@react-email/components';

import { ContactFormSchema } from '@/lib/formSchemas';

export function EmailTemplate(props: ContactFormSchema) {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset]
        }}
      >
        <Body>
          <Preview>New message from {props.name}</Preview>
          <Container>
            <div className={'mb-8 flex flex-col items-center'}>
              <Img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo.png`}
                alt='Redbird Counseling Logo'
                width={100}
                height={100}
                className={'mb-4'}
              />
              <div className={'text-lg font-bold'}>
                You have a new message from {props.name}
              </div>
              {props.subject && (
                <div>
                  <span className={'font-bold'}>Subject:</span> {props.subject}
                </div>
              )}
            </div>

            <div className={'bg-[#f4f4ec] p-4'}>
              <Text className={'rounded-md bg-white/50 p-2'}>
                {props.message}
              </Text>
              <Text>
                <span className={'block'}>Name: {props.name}</span>
                <span className={'block'}>Email: {props.email}</span>
                {props.phone && (
                  <span className={'block'}>Phone: {props.phone}</span>
                )}
              </Text>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
