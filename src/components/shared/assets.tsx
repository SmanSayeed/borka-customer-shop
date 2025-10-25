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
    <div>
        <Image
          src='/logo.png'
          alt='logo'
          height={height}
          width={width}
          style={{ height: 'auto', width: 'auto' }}
          className='object-contain'
          priority
        />
    </div>
  );
};
