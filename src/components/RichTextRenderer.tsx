import Image from 'next/image';
import { Fragment, type ReactNode } from 'react';

import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedLinkNode,
  SerializedParagraphNode
} from '@payloadcms/richtext-lexical';
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter
} from '@payloadcms/richtext-lexical/react';

import { cn } from '@/lib/utils';
import type { Media, MediaBlock as MediaBlockProps } from '@/payload-types';

import MediaBlock from './MediaBlock';

const replaceNameInChildren = (
  children: ReactNode,
  name: string
): ReactNode => {
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (typeof child === 'string') {
        const parts = child.split('<name>');
        if (parts.length > 1) {
          return (
            <Fragment key={index}>
              {parts.map((part, partIndex) => (
                <Fragment key={partIndex}>
                  {part}
                  {partIndex < parts.length - 1 && <span>{name}</span>}
                </Fragment>
              ))}
            </Fragment>
          );
        }
      }
      return child;
    });
  }

  if (typeof children === 'string') {
    const parts = children.split('<name>');
    if (parts.length > 1) {
      return parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 && <span>{name}</span>}
        </Fragment>
      ));
    }
  }

  return children;
};

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps>
  | SerializedParagraphNode;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'services' ? `/services/${slug}` : `/${slug}`;
};

const createJsxConverters =
  (name?: string): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });
      const tag = node.tag;

      const baseHeading = 'mb-4 font-semibold';

      if (tag === 'h1') {
        return <h1 className={cn('', baseHeading)}>{children}</h1>;
      }

      if (tag === 'h2') {
        return <h2 className={cn('', baseHeading)}>{children}</h2>;
      }

      if (tag === 'h3') {
        return <h3 className={cn('!text-xl', baseHeading)}>{children}</h3>;
      }

      if (tag === 'h4') {
        return <h4 className={cn('', baseHeading)}>{children}</h4>;
      }

      if (tag === 'h5') {
        return <h5 className={cn('', baseHeading)}>{children}</h5>;
      }

      if (tag === 'h6') {
        return <h6 className={cn('', baseHeading)}>{children}</h6>;
      }

      return null;
    },
    paragraph: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });

      return <p>{name ? replaceNameInChildren(children, name) : children}</p>;
    },
    autolink: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });

      return (
        <a
          href={node.fields.url}
          className={
            'group relative isolate inline-block leading-normal hover:text-white'
          }
        >
          <span
            className={
              'bg-redbird absolute top-[90%] right-0 bottom-0 left-0 -z-100 rounded-md text-white transition-all group-hover:top-0 group-hover:-right-1 group-hover:-left-1'
            }
          />
          {children}
        </a>
      );
    },
    link: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });

      return (
        <a
          href={node.fields.url}
          className={
            'group relative isolate inline-block leading-normal hover:text-white'
          }
        >
          <span
            className={
              'bg-redbird absolute top-[90%] right-0 bottom-0 left-0 -z-100 rounded-md text-white transition-all group-hover:top-0 group-hover:-right-1 group-hover:-left-1'
            }
          />
          {children}
        </a>
      );
    },
    list: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children });

      if (node.tag === 'ul') {
        return (
          <ul className={'marker:text-redbird mb-4 ml-4 list-disc'}>
            {children}
          </ul>
        );
      }

      if (node.tag === 'ol') {
        return (
          <ol className={'marker:text-redbird mb-4 ml-4 list-decimal'}>
            {children}
          </ol>
        );
      }
    },
    upload: ({ node }) => {
      const image = node.value as Media;

      return (
        <div className={'my-8 flex items-center justify-center'}>
          <Image
            src={image.url || ''}
            alt={image.alt}
            width={image.width || 0}
            height={image.height || 0}
          />
        </div>
      );
    },
    blocks: {
      'media-block': ({ node }) => (
        <MediaBlock
          className='col-span-3 col-start-1'
          imgClassName='m-0'
          {...node.fields}
          captionClassName='mx-auto max-w-[48rem]'
          enableGutter={false}
          disableInnerContainer={true}
        />
      )
    }
  });

type Props = {
  data: DefaultTypedEditorState;
  name?: string;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const {
    className,
    enableProse = false,
    enableGutter = false,
    name,
    ...rest
  } = props;
  return (
    <ConvertRichText
      converters={createJsxConverters(name)}
      className={cn(
        'payload-richtext items-center [&>*]:text-base [&>p]:not-last:mb-4',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md prose-ul:marker:text-redbird mx-auto': enableProse
        },
        className
      )}
      {...rest}
    />
  );
}
