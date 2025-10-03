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
        'payload-richtext items-center [&>p]:not-last:mb-4',
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
