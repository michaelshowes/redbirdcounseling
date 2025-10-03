'use server';

import { z } from 'zod';

import { EmailTemplate } from '@/components/EmailTemplate';
import { contactFormSchema } from '@/lib/formSchemas';
import { resend } from '@/lib/resend';

export async function send(formData: z.infer<typeof contactFormSchema>) {
  console.log(formData);

  const { data, error } = await resend.emails.send({
    from: formData.email,
    to: [process.env.EMAIL_RECIPIENT!],
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
}
