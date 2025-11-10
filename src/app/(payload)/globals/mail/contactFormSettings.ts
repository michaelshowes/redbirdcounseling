import { GlobalConfig } from 'payload';

export const contactFormSettings: GlobalConfig['fields'] = [
  {
    name: 'contactForm',
    type: 'group',
    fields: [
      {
        name: 'recipient',
        type: 'text',
        admin: {
          description: 'The email address to send the message to.'
        }
      },
      {
        name: 'confirmationMessage',
        type: 'richText',
        required: true,
        admin: {
          description:
            "The message to display to the user after the form is submitted. Use <name> to display the user's name for extra personalization."
        }
      }
    ]
  }
];
