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
import type { MediaBlock as MediaBlockProps } from '@/payload-types';

import MediaBlock from './MediaBlock';

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

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters
}) => ({
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
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const {
    className,
    enableProse = false,
    enableGutter = false,
    ...rest
  } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
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
