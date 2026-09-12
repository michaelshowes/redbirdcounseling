'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';

import { Post } from '@/payload-types';

import PostBody from '../PostBody';
import { resolveServerURL } from './resolveServerURL';

type Props = {
  initialData: Post;
};

/**
 * Client wrapper used only in draft mode. See `PageLivePreview` for how
 * `useLivePreview` drives in-place updates without a reload.
 */
export default function PostLivePreview({ initialData }: Props) {
  const { data } = useLivePreview<Post>({
    initialData,
    serverURL: resolveServerURL(),
    depth: 2
  });

  return (
    <PostBody
      post={data}
      preview
    />
  );
}
