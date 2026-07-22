import type { Page, Service } from '@/payload-types';

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
  // The array of layout blocks (Page and Service share the same block union).
  blocks?: NonNullable<Page['content']>['content'];
  // Global settings needed by settings-driven blocks (e.g. ServiceGrid). Passed
  // in from the page so blocks stay pure and render in both server and client
  // (live preview) trees. Blocks that don't need it ignore the extra prop.
  orderedServices?: { service: Service }[];
}> = ({ blocks, orderedServices }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[
              blockType as BlockType
            ] as unknown as React.ComponentType<Record<string, unknown>>;

            if (Block) {
              return (
                <Block
                  {...block}
                  orderedServices={orderedServices}
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
