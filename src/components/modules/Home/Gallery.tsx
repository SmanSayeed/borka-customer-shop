'use client';

import Image from 'next/image';

const Gallery = () => {
  const images = [
    'https://cdn.media.amplience.net/i/lmg/1348MPBlack-1348CP04-03-2024_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-m-prt-pdp-2x$',
    'https://www.rayaancouture.com/cdn/shop/files/AirBrush-20240929161742.jpg?v=1727598036&width=1946',
    'https://www.shophijabheaven.com/cdn/shop/files/imgonline-com-ua-resize-ajygLhkjs3Y_1024x1024.jpg?v=1692989061',
    'https://emaanbd.com/wp-content/uploads/2025/10/539529651_801477815562993_5279600447241961793_n.jpg',
    'https://emaanbd.com/wp-content/uploads/2023/08/2460bc70-36b5-4107-985c-53bc3857626d.jpg',
    'https://res.cloudinary.com/do6tvtff8/image/upload/v1761205484/1730173954017210_lkkzx0.jpg',
  ];

  return (
    <div className='container mx-auto mt-20'>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        Top Customer Reviews
      </h2>
      <div className='grid grid-cols-12'>
        {images.map((img, idx) => (
          <div
            key={idx}
            className='col-span-4 row-span-1 h-120 relative overflow-hidden group'
          >
            <Image
              src={img}
              alt={`Gallery-${idx}`}
              fill
              className='object-cover transition-transform duration-700 ease-in-out group-hover:scale-115'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-120 h-112 border-4 border-white/24 hover:border-none'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
