import { Fragment } from 'react';

import type { Page } from '@/payload-types';

import AccordionSection from './AccordionSection';
import CTA from './CTA';
import CardGrid from './CardGrid';
import CredentialsGrid from './CredentialsGrid';
import InfoGrid from './InfoGrid';
import MediaBlock from './MediaBlock';
import RichText from './RichText';
import Selection from './Selection';
import ServiceGrid from './ServiceGrid';

const blockComponents = {
  cta: CTA,
  selection: Selection,
  'card-grid': CardGrid,
  'rich-text': RichText,
  'media-block': MediaBlock,
  'credentials-grid': CredentialsGrid,
  accordion: AccordionSection,
  'info-grid': InfoGrid,
  'service-grid': ServiceGrid
} as const;

type BlockType = keyof typeof blockComponents;

export const RenderBlocks: React.FC<{
  blocks: Page['content'];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as BlockType];

            if (Block) {
              return (
                <Block
                  {...block}
                  key={block?.id}
                />
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
