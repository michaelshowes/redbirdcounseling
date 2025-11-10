import { GlobalConfig } from 'payload';

export const inbox: GlobalConfig['fields'] = [
  {
    name: 'inbox',
    type: 'array',
    fields: [
      {
        name: 'subject',
        type: 'text'
      },
      {
        name: 'email',
        type: 'text'
      },
      {
        name: 'phone',
        type: 'text'
      },
      {
        name: 'message',
        type: 'text'
      }
    ]
  }
];
