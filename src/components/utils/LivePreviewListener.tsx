'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';

/**
 * Payload's live preview checks `event.origin === serverURL` with strict equality
 * (and posts its `ready` message to that exact target origin). The preview iframe is
 * always same-origin with the admin, so the live window origin is the reliable value —
 * it avoids mismatches from a scheme-less, `www`/non-`www`, or unset
 * `NEXT_PUBLIC_SERVER_URL`. The env value is only a normalized SSR fallback.
 */
function resolveServerURL(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  const raw = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!raw) return '';
  return (/^https?:\/\//.test(raw) ? raw : `https://${raw}`).replace(/\/$/, '');
}

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={resolveServerURL()}
    />
  );
};
