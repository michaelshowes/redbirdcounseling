import Image from 'next/image';

import { Media } from '@/payload-types';

export default function ImageWithPlaceholder({
  image
  // placeholderText
}: {
  image: Media;
  placeholderText?: string;
}) {
  // function concatPlaceholderText(placeholderText: string) {
  //   const text = placeholderText || 'Hello+World';
  //   const words = text.split('+');
  //   return words.join(' ');
  // }

  if (image?.url === null || image?.url === undefined) {
    return (
      <img
        src={
          'https://g-iupnhjku2gy.vusercontent.net/placeholder.svg?height=1440&width=400'
        }
        alt='placeholder image'
        className={'h-full w-full object-cover'}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.alt || ''}
      fill
      className={'object-cover'}
    />
  );
}
