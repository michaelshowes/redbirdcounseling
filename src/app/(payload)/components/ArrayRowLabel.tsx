'use client';

import { useRowLabel } from '@payloadcms/ui';

export default function ArrayRowLabel() {
  const { data, rowNumber } = useRowLabel<{ itemTitle?: string }>();

  const customLabel = `${data.itemTitle || `Item ${String(rowNumber).padStart(2, '0')}`}`;

  return <div>{customLabel}</div>;
}
