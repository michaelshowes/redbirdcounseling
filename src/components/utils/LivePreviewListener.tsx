'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';

import { getClientSideURL } from '@/utils/getURL';

export const LivePreviewListener: React.FC = () => {
  const router = useRouter();
  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL!}
    />
  );
};
