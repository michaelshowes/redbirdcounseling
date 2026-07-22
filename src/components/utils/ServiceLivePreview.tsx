'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';

import { Service } from '@/payload-types';

import ServiceBody from '../ServiceBody';
import { resolveServerURL } from './resolveServerURL';

type Props = {
  initialData: Service;
  orderedServices?: { service: Service }[];
};

/**
 * Client wrapper used only in draft mode. See `PageLivePreview` for how
 * `useLivePreview` drives in-place updates without a reload.
 */
export default function ServiceLivePreview({
  initialData,
  orderedServices
}: Props) {
  const { data } = useLivePreview<Service>({
    initialData,
    serverURL: resolveServerURL(),
    depth: 2
  });

  return (
    <ServiceBody
      service={data}
      preview
      orderedServices={orderedServices}
    />
  );
}
