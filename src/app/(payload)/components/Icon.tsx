import Image from 'next/image';

export default function Icon() {
  return (
    <Image
      src={'/images/redbird.svg'}
      alt={'Redbird Logo'}
      fill
    />
  );
}
