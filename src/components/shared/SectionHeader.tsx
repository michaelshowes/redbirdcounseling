import { cn } from '@/lib/utils';

type Props = {
  title?: string;
  headline?: string;
  align?: 'center' | 'left';
  className?: string;
};

/**
 * Section heading pair: a small uppercase eyebrow above a large serif headline.
 *
 * The headline carries the section's meaning, so it is the `h2` and the eyebrow
 * is a `p`. These were previously inverted - the decorative "Hi there" was the
 * `h2` while the line that actually named the section ("I'm Nicole Michels,
 * LPC, Founder of Redbird Counseling") was a `p` - which left every real
 * section heading on the site invisible to search engines.
 *
 * When a section supplies only an eyebrow and no headline (Selection), the
 * eyebrow stays the `h2`, so that section still has a heading above its `h3`s.
 *
 * Text colours are set explicitly rather than inherited: `h2` and `p` pick up
 * different defaults from globals.css, so pinning them keeps the rendered
 * appearance identical to before the swap.
 */
export default function SectionHeader({
  title,
  headline,
  align = 'center',
  className
}: Props) {
  if (!title && !headline) {
    return null;
  }

  // Without a headline the eyebrow is the only heading the section has.
  const Eyebrow = headline ? 'p' : 'h2';

  return (
    <header
      className={cn('mb-12 flex flex-col gap-6', className, {
        'items-center': align === 'center'
      })}
    >
      <div className={'flex items-end gap-1'}>
        <Eyebrow
          className={
            'text-single-200 lg:text-single-200 sans font-medium tracking-widest text-neutral-800 uppercase'
          }
        >
          {title}
        </Eyebrow>
        <span className={'bg-redbird size-2 -translate-y-1 rounded-full'} />
      </div>
      {headline && (
        <h2
          className={cn(
            'text-display-4 md:text-display-3 lg:text-display-2 serif max-w-[900px] text-balance text-neutral-700',
            {
              'text-center': align === 'center'
            }
          )}
        >
          {headline}
        </h2>
      )}
    </header>
  );
}
