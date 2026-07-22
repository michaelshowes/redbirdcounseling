import { Page, Service, Setting } from '@/payload-types';

import { RenderBlocks } from './RenderBlocks';
import RenderHero from './heroes/RenderHero';

type Props = {
  page: Page;
  /** True while rendered inside the admin live-preview iframe. */
  preview?: boolean;
  orderedServices?: { service: Service }[];
  contactForm?: Setting['contactForm']['contactForm'];
};

/**
 * Shared, server- and client-safe render tree for a Page. Rendered directly on
 * the server for production and re-rendered on the client (with live data) by
 * `PageLivePreview`. It must not use any server-only APIs so both paths work.
 */
export default function PageBody({
  page,
  preview,
  orderedServices,
  contactForm
}: Props) {
  return (
    <>
      <RenderHero
        page={page}
        preview={preview}
        orderedServices={orderedServices}
        contactForm={contactForm}
      />
      <div className={'[&>section]:even:bg-secondary-1'}>
        <RenderBlocks
          blocks={page.content?.content}
          orderedServices={orderedServices}
        />
      </div>
    </>
  );
}
