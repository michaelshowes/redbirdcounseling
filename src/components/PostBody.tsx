import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { Media, Post } from '@/payload-types';

import { RenderBlocks } from './RenderBlocks';
import RichTextRenderer from './RichTextRenderer';
import ImageWithPlaceholder from './utils/ImageWithPlaceholder';
import { formatPostDate } from './utils/formatPostDate';

type Props = {
  post: Post;
  /** True while rendered inside the admin live-preview iframe. */
  preview?: boolean;
};

/**
 * Shared, server- and client-safe render tree for a single post. Rendered
 * directly on the server in production and re-rendered on the client (with live
 * data) by `PostLivePreview` - mirroring the Page/Service split.
 */
export default function PostBody({ post }: Props) {
  const image = post.image as Media;
  const published = formatPostDate(post.publishedAt);

  return (
    <>
      <article>
        <header
          className={
            'section-spacing bg-secondary-1 relative mb-10 pb-0 md:mb-[100px] md:px-0'
          }
        >
          <span className={'absolute right-0 bottom-0 left-0 h-20 bg-white'} />
          <div
            className={
              'md:site-padding mx-auto mb-10 max-w-[1440px] text-center lg:mb-20'
            }
          >
            {published && (
              <p
                className={
                  'text-single-200 sans mb-4 font-medium tracking-widest text-neutral-800 uppercase'
                }
              >
                <time dateTime={post.publishedAt!}>{published}</time>
              </p>
            )}
            <h1 className={'text-display-3 lg:text-display-1 mb-4'}>
              {post.title}
              <span className={'text-redbird'}>.</span>
            </h1>
            <p className={'mx-auto max-w-[765px] text-balance'}>
              {post.excerpt}
            </p>
          </div>

          <div
            className={
              'relative mx-auto h-[200px] max-w-[1440px] overflow-hidden rounded-2xl sm:h-[300px] md:h-[400px]'
            }
          >
            <ImageWithPlaceholder image={image} />
          </div>
        </header>

        <div className={'flex justify-center px-4'}>
          <div className={'w-full max-w-[700px]'}>
            <RichTextRenderer
              data={post.content.body as DefaultTypedEditorState}
              enableProse
            />
          </div>
        </div>
      </article>

      <div className={'[&>section]:even:bg-secondary-1'}>
        <RenderBlocks blocks={post.content?.content} />
      </div>
    </>
  );
}
