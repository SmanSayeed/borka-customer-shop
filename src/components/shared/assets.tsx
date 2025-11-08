import Image from 'next/image';

export const Logo = ({
  height = 80,
  width = 80,
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
          className='object-contain'
          style={{height: 'auto', width: 'auto'}}
          priority
        />
    </div>
  );
};
