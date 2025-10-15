import Image from 'next/image';

import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import { Service } from '@/payload-types';
import { formatPrice } from '@/utils/formatPrice';

import { CMSLink } from './CMSLink';
import RichTextRenderer from './RichTextRenderer';

export default function ServiceDetails(props: Service) {
  const { details } = props || {};

  if (!details?.showDetails) return null;

  return (
    <div className={'bg-secondary-1 flex flex-col gap-4 p-4'}>
      <div className={'relative'}>
        <div className={'absolute -top-7 -left-8 size-12'}>
          <Image
            src={'/images/redbird.svg'}
            alt={'Logo'}
            fill
            className={'rounded-full'}
            priority
          />
        </div>
        <h3 className={'font-sans text-xl font-semibold'}>{details.title}</h3>
        <p className={'text-base'}>{details.subtext}</p>
      </div>
      <p className={'text-2xl font-medium'}>
        {details.price ? (
          <>{formatPrice(details.price as number)}</>
        ) : (
          <>Contact for pricing</>
        )}
      </p>
      <RichTextRenderer data={details.details as DefaultTypedEditorState} />
      {(details.ctaLink?.url || details.secondaryLink?.url) && (
        <div className={'flex flex-wrap gap-4 md:flex-col'}>
          {details.ctaLink?.url && (
            <CMSLink
              size={'lg'}
              {...details.ctaLink}
              className={'w-full sm:w-auto'}
            />
          )}

          {details.secondaryLink?.url && (
            <CMSLink
              size={'lg'}
              appearance={'secondary'}
              {...details.secondaryLink}
              className={'w-full sm:w-auto'}
            />
          )}
        </div>
      )}
    </div>
  );
}
