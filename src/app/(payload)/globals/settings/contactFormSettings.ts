import { GlobalConfig } from 'payload';

export const contactFormSettings: GlobalConfig['fields'] = [
  {
    name: 'contactForm',
    type: 'group',
    fields: [
      {
        name: 'recipient',
        type: 'text',
        required: true,
        admin: {
          description: 'The email address to send the form to.'
        }
      }
    ]
  }
];
