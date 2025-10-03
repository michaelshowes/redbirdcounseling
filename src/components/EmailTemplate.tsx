import * as React from 'react';

import z from 'zod';

import { contactFormSchema } from '@/lib/formSchemas';

export function EmailTemplate(props: z.infer<typeof contactFormSchema>) {
  return (
    <div>
      <h1>Welcome, {props.name}!</h1>
    </div>
  );
}
