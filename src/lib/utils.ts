import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The design system defines its own font sizes as Tailwind v4 `--text-*` theme
 * variables in globals.css (`text-display-2`, `text-single-200`, `text-body`…).
 * tailwind-merge does not read the CSS theme, so it files those unknown `text-*`
 * classes under text-colour and treats them as conflicting with a real colour -
 * silently dropping one. `cn('text-display-4', 'text-neutral-700')` returned
 * just `text-neutral-700`, losing the font size.
 *
 * Registering them as font sizes keeps size and colour independent.
 */
const CUSTOM_FONT_SIZES = [
  'body',
  'body-small',
  'body-large',
  'display-1',
  'display-2',
  'display-3',
  'display-4',
  'single-100',
  'single-200',
  'single-300',
  'single-400'
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: CUSTOM_FONT_SIZES }]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
