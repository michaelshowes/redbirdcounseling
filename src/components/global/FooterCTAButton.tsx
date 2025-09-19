'use client';

import Link from 'next/link';

import { Button } from '../ui/button';

type Props = {
  link: {
    url: string;
    label: string;
  };
};

export default function FooterCTAButton({ link }: Props) {
  return (
    <Button size='lg'>
      <Link href={link.url}>{link.label}</Link>
    </Button>
  );
}
