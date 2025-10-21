'use client';

import Link, { LinkProps } from 'next/link';
import { useState } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex relative items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer isolate overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          'bg-primary font-bold text-primary-foreground shadow-xs hover:bg-primary/90',
        secondary:
          'border border-[#0a1316] bg-background text-[#0a1316] shadow-[0px_4px_10px_0px_rgba(20,20,43,0.04)] hover:bg-accent hover:text-primary-foreground'
      },
      size: {
        default:
          'h-8 rounded-[76px] gap-1 px-6 py-[18px] has-[>svg]:px-2.5 text-[16px] leading-[18px]',
        lg: 'h-10 rounded-[96px] gap-1.5 px-[38px] py-[26px] has-[>svg]:px-4 text-[18px] leading-[20px]',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  link?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

// function that gets x and y location of cursor
function getCursorPosition(
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
) {
  // get relative position of cursor to the button
  const { clientX, clientY } = e;
  const { left, top } = e.currentTarget.getBoundingClientRect();
  return { x: clientX - left, y: clientY - top };
}

type ButtonLinkProps =
  | ({
      link: true;
      href: LinkProps['href'];
      className?: string;
      variant?: VariantProps<typeof buttonVariants>['variant'];
      size?: VariantProps<typeof buttonVariants>['size'];
      children?: React.ReactNode;
    } & Omit<React.ComponentProps<typeof Link>, 'className' | 'href'>)
  | ({
      link?: false;
      href?: never;
      asChild?: boolean;
      className?: string;
      variant?: VariantProps<typeof buttonVariants>['variant'];
      size?: VariantProps<typeof buttonVariants>['size'];
      children?: React.ReactNode;
    } & React.ComponentProps<'button'>);

function Button(props: ButtonLinkProps) {
  const {
    className,
    variant,
    size,
    link = false,
    children,
    ...restProps
  } = props;

  const asChild = 'asChild' in props ? props.asChild : false;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Comp = asChild ? Slot : 'button';

  if (link) {
    return (
      <Link
        {...(restProps as Omit<React.ComponentProps<typeof Link>, 'className'>)}
        className={cn(buttonVariants({ variant, size, className }))}
        onMouseEnter={(e) => {
          const { x, y } = getCursorPosition(e);
          setCursorPosition({ x, y });
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {isHovered && (
          <span
            className={cn(
              'bg-redbird ease absolute -z-10 size-[600px] rounded-full transition-all duration-600 starting:size-0',
              {
                'bg-neutral-500': variant === 'secondary'
              }
            )}
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center'
            }}
          />
        )}
        {children}
      </Link>
    );
  }

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...(restProps as React.ComponentProps<'button'>)}
      onMouseEnter={(e) => {
        const { x, y } = getCursorPosition(e);
        setCursorPosition({ x, y });
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && (
        <span
          className={cn(
            'bg-redbird ease absolute -z-10 size-[600px] rounded-full transition-all duration-600 starting:size-0',
            {
              'bg-neutral-500': variant === 'secondary'
            }
          )}
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            transformOrigin: 'center'
          }}
        />
      )}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
