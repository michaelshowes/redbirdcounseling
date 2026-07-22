'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';

import { Page, Service, Setting } from '@/payload-types';

import PageBody from '../PageBody';
import { resolveServerURL } from './resolveServerURL';

type Props = {
  initialData: Page;
  orderedServices?: { service: Service }[];
  contactForm?: Setting['contactForm']['contactForm'];
};

/**
 * Client wrapper used only in draft mode. `useLivePreview` merges field edits
 * streamed from the admin over `postMessage` into `initialData` and populates
 * relationships via the Payload API to `depth`, so the page updates in place on
 * every keystroke — no route refresh or reload.
 */
export default function PageLivePreview({
  initialData,
  orderedServices,
  contactForm
}: Props) {
  const { data } = useLivePreview<Page>({
    initialData,
    serverURL: resolveServerURL(),
    depth: 2
  });

  return (
    <PageBody
      page={data}
      preview
      orderedServices={orderedServices}
      contactForm={contactForm}
    />
  );
}
