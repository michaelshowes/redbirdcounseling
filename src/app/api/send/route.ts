import { getSettings } from '@/db/queries/settings';
import { resend } from '@/lib/resend';

import { EmailTemplate } from '../../../components/EmailTemplate';

export async function POST(req: Request) {
  const formData = await req.json();
  const { contactForm } = await getSettings();

  console.log(contactForm?.recipient);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Redbird Counseling <noreply@meetredbirdcounseling.com>',
      to: [contactForm?.recipient || 'nicole@meetredbirdcounseling.com'],
      subject: formData.subject,
      react: EmailTemplate({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      })
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
