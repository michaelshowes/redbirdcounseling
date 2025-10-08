import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  phone: z.string(),
  subject: z.string().min(1),
  message: z.string().min(1)
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
