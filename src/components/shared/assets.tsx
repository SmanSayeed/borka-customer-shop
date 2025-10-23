import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({
  height = 100,
  width = 100,
}: {
  height?: number;
  width?: number;
}) => {
  return (
    <Link href='/'>
      <Image
        src='/logo.png'
        alt='logo'
        height={height}
        width={width}
        className='object-contain'
        priority
      />
    </Link>
  );
};
