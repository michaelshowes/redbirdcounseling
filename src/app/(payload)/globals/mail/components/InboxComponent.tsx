'use client';

import { DefaultTemplate, MinimalTemplate } from '@payloadcms/next/templates';
import {
  Button,
  DocumentControls,
  Gutter,
  TabComponent,
  TabsProvider,
  useDocumentInfo
} from '@payloadcms/ui';
import type { CollectionSlug, DocumentViewServerProps } from 'payload';

type Inbox = {
  formState: DocumentViewServerProps['formState'];
};

export default function InboxComponent({ formState }: Inbox) {
  const inbox = formState['inbox.inbox'];
  const document = useDocumentInfo();
  console.log(document);

  return (
    <main>
      <DocumentControls
        slug={document.globalSlug as CollectionSlug}
        apiURL={document.apiURL!}
        permissions={document.docPermissions!}
      />
      <Gutter>
        <div className={'flex'}>
          <TabComponent
            tab={{
              label: 'Inbox',
              fields: [
                {
                  name: 'subject',
                  type: 'text'
                }
              ]
            }}
            parentPath='inbox.inbox'
            setIsActive={() => {}}
          />
          <TabComponent
            tab={{
              label: 'Contact Form',
              fields: [
                {
                  name: 'subject',
                  type: 'text'
                }
              ]
            }}
            parentPath='inbox.contactForm'
            setIsActive={() => {}}
          />
        </div>
        <h3>Custom Default Root View</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          facilis reiciendis temporibus minus ratione tenetur magnam harum,
          perferendis natus ut placeat enim quod voluptate quas alias libero
          nesciunt illum. Error.
        </p>
      </Gutter>
    </main>
  );
}
