import Image from 'next/image';

export default function Logo() {
  return (
    <div className='logo-container'>
      <Image
        src={'/images/logo.svg'}
        alt={'Logo'}
        fill
      />
    </div>
  );
}
