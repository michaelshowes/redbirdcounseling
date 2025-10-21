import { cn } from '@/lib/utils';

type Props = {
  title?: string;
  headline?: string;
  align?: 'center' | 'left';
  className?: string;
};

export default function SectionHeader({
  title,
  headline,
  align = 'center',
  className
}: Props) {
  if (title || headline) {
    return (
      <header
        className={cn('mb-12 flex flex-col gap-6', className, {
          'items-center': align === 'center'
        })}
      >
        <div className={'flex items-end gap-1'}>
          <h2
            className={
              'text-single-200 lg:text-single-200 sans font-medium tracking-widest uppercase'
            }
          >
            {title}
          </h2>
          <span className={'bg-redbird size-2 -translate-y-1 rounded-full'} />
        </div>
        {headline && (
          <p
            className={cn(
              'text-display-4 md:text-display-3 lg:text-display-2 serif max-w-[900px] text-balance',
              {
                'text-center': align === 'center'
              }
            )}
          >
            {headline}
          </p>
        )}
      </header>
    );
  }

  return null;
}
