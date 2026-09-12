import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { BUSINESS_URL } from '@/app/constants/business';
import PostBody from '@/components/PostBody';
import DraftModeBanner from '@/components/global/DraftModeBanner';
import PostLivePreview from '@/components/utils/PostLivePreview';
import { getPostBySlug } from '@/db/queries/posts';
import { generateMeta } from '@/utils/generateMeta';
import { StructuredData, generateArticleSchema } from '@/utils/structuredData';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return generateMeta({ doc: post, path: `/blog/${slug}` });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    post,
    url: `${BUSINESS_URL}/blog/${post.slug}`
  });

  return (
    <div>
      <StructuredData data={articleSchema} />
      <DraftModeBanner
        collection={'posts'}
        id={post.id}
        status={post._status}
      />
      {draft ? (
        <PostLivePreview initialData={post} />
      ) : (
        <PostBody post={post} />
      )}
    </div>
  );
}
