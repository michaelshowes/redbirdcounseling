import type { Page } from '@/payload-types';

import AccordionSection from './AccordionSection';
import CTA from './CTA';
import CardGrid from './CardGrid';
import CredentialsGrid from './CredentialsGrid';
import FiftyFifty from './FiftyFifty';
import InfoGrid from './InfoGrid';
import RichText from './RichText';
import Selection from './Selection';
import ServiceGrid from './ServiceGrid';

const blockComponents = {
  cta: CTA,
  selection: Selection,
  'card-grid': CardGrid,
  'rich-text': RichText,
  'credentials-grid': CredentialsGrid,
  accordion: AccordionSection,
  'info-grid': InfoGrid,
  'service-grid': ServiceGrid,
  'fifty-fifty': FiftyFifty
} as const;

type BlockType = keyof typeof blockComponents;

export const RenderBlocks: React.FC<{
  blocks: Page['content'];
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
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
      </>
    );
  }

  return null;
};
