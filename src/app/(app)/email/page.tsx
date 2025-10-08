import { EmailTemplate } from '@/components/EmailTemplate';

export default function EmailPage() {
  return (
    <EmailTemplate
      name='John Doe'
      email='john.doe@example.com'
      phone='1234567890'
      subject='Test'
      message='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus minus, harum placeat corporis distinctio pariatur? Ipsam culpa corporis fugit. Error rem a officiis saepe nobis! Labore aut a est nobis.'
    />
  );
}
