import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BUSINESS_URL } from '@/app/constants/business';
import FeaturedPost from '@/components/blog/FeaturedPost';
import Pagination, { pageHref } from '@/components/blog/Pagination';
import PostCard from '@/components/blog/PostCard';
import { getFeaturedPost, getPagedPosts } from '@/db/queries/posts';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import { StructuredData, generateWebPageSchema } from '@/utils/structuredData';

const TITLE = 'Blog | Redbird Counseling';
const DESCRIPTION =
  'Articles on hyper-independence, overwhelm, the mental load, and drinking to cope - written for moms who carry it all. From Nicole Michels, LPC.';

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

/** `?page=` is a filter over one collection, not a separate document, so every
 * page canonicalises to itself and page 1 canonicalises to the bare `/blog`. */
export async function generateMetadata({
  searchParams
}: BlogPageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const title = currentPage > 1 ? `Blog - Page ${currentPage}` : TITLE;
  const canonical = `${BUSINESS_URL}${pageHref(currentPage)}`;

  return {
    title: { absolute: title },
    description: DESCRIPTION,
    alternates: { canonical },
    openGraph: mergeOpenGraph({
      title,
      description: DESCRIPTION,
      url: pageHref(currentPage)
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description: DESCRIPTION
    }
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const requestedPage = Number(page) || 1;

  if (requestedPage < 1 || !Number.isInteger(requestedPage)) {
    notFound();
  }

  // The newest post is featured above the grid, so it is excluded from the grid
  // itself rather than appearing twice.
  const featured = await getFeaturedPost();

  const posts = await getPagedPosts({
    page: requestedPage,
    excludeId: featured?.id
  });

  // A page number past the end is a dead end, not an empty shelf.
  if (requestedPage > 1 && posts.docs.length === 0) {
    notFound();
  }

  const webPageSchema = generateWebPageSchema({
    url: `${BUSINESS_URL}${pageHref(requestedPage)}`,
    title: TITLE,
    description: DESCRIPTION,
    breadcrumbs: [
      { name: 'Home', url: BUSINESS_URL },
      { name: 'Blog', url: `${BUSINESS_URL}/blog` }
    ]
  });

  const isFirstPage = requestedPage === 1;

  return (
    <>
      <StructuredData data={webPageSchema} />

      <section
        className={
          'section-spacing bg-secondary-1 relative mb-16 pb-0 md:mb-24'
        }
      >
        <span className={'absolute right-0 bottom-0 left-0 h-20 bg-white'} />
        <div
          className={'md:site-padding mx-auto max-w-[1440px] pb-20 text-center'}
        >
          <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
            Blog
            <span className={'text-redbird'}>.</span>
          </h1>
          <p className={'mx-auto max-w-[765px] text-balance'}>{DESCRIPTION}</p>
        </div>
      </section>

      <div className={'site-padding mx-auto max-w-[1220px] pb-24'}>
        {featured && isFirstPage && <FeaturedPost post={featured} />}

        {posts.docs.length > 0 ? (
          <div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10'}>
            {posts.docs.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                priority={isFirstPage ? false : index < 3}
              />
            ))}
          </div>
        ) : (
          !featured && (
            <p className={'py-16 text-center'}>
              No posts yet - check back soon.
            </p>
          )
        )}

        <Pagination
          currentPage={requestedPage}
          totalPages={posts.totalPages}
        />
      </div>
    </>
  );
}
