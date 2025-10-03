import { draftMode } from 'next/headers';
import Link from 'next/link';

import { EditIcon, SettingsIcon } from 'lucide-react';
import { CollectionSlug } from 'payload';

import { cn } from '@/lib/utils';
import { Page } from '@/payload-types';

type Props = {
  collection: CollectionSlug;
  id: number;
  status: Page['_status'];
};

export default async function DraftModeBanner({
  collection,
  id,
  status
}: Props) {
  const { isEnabled: draft } = await draftMode();
  if (!draft) return null;

  const editPath = `/admin/collections/${collection}/${id}`;

  return (
    <div
      className={
        'fixed top-0 left-0 z-50 w-full bg-neutral-800/80 px-4 py-2 text-white backdrop-blur-xs md:px-8 md:text-center'
      }
    >
      <div className={'flex grid-cols-3 flex-col items-center text-sm md:grid'}>
        <div className={'flex items-center gap-4 text-left'}>
          <Link
            href={'/admin'}
            className={
              'flex items-center gap-1 transition-all duration-150 hover:text-white/80'
            }
          >
            <SettingsIcon size={16} />
            Admin Dashboard
          </Link>
          <Link
            href={editPath}
            className={
              'flex items-center gap-1 transition-all duration-150 hover:text-white/80'
            }
          >
            <EditIcon size={16} />
            Edit Page
          </Link>
        </div>
        <div className={'-order-1 md:order-[unset]'}>Preview Mode</div>
        <div className={'hidden md:flex md:justify-end'}>
          <div
            className={cn(
              'rounded-full px-4 py-1 font-semibold transition-all duration-500',
              {
                'bg-redbird': status === 'draft',
                'bg-green-500': status === 'published'
              }
            )}
          >
            {status?.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
