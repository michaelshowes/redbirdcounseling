import Link from 'next/link';
import React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Page } from '@/payload-types';

type CMSLinkType = {
  appearance?: ButtonProps['variant'];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: 'pages';
    value: Page | string | number;
  } | null;
  size?: ButtonProps['size'] | null;
  type?: 'custom' | 'reference' | null;
  url?: string | null;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance,
    size,
    children,
    className,
    label,
    newTab,
    reference,
    // size: sizeFromProps,
    url
  } = props;

  const href =
    type === 'reference' &&
    typeof reference?.value === 'object' &&
    reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  const newTabProps = newTab
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {};

  const isEmail = href.includes('@');

  /* Ensure we don't break any styles set by richText */
  // if (appearance === 'inline') {
  //   return (
  //     <Link
  //       className={cn(className)}
  //       href={href || url || ''}
  //       {...newTabProps}
  //     >
  //       {label && label}
  //       {children && children}
  //     </Link>
  //   );
  // }

  return (
    <Button
      className={className}
      variant={appearance}
      size={size}
    >
      {isEmail ? (
        <a
          href={`mailto:${href}`}
          {...newTabProps}
        >
          {label && label}
          {children && children}
        </a>
      ) : (
        <Link
          className={cn(className)}
          href={href || url || ''}
          {...newTabProps}
        >
          {label && label}
          {children && children}
        </Link>
      )}
    </Button>
  );
};
