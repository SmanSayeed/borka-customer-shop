'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const images = [
  {
    src: 'https://cdn.media.amplience.net/i/lmg/1348MPBlack-1348CP04-03-2024_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-m-prt-pdp-2x$',
    link: 'https://facebook.com/yourpage1',
  },
  {
    src: 'https://www.rayaancouture.com/cdn/shop/files/AirBrush-20240929161742.jpg?v=1727598036&width=1946',
    link: 'https://facebook.com/yourpage2',
  },
  {
    src: 'https://www.shophijabheaven.com/cdn/shop/files/imgonline-com-ua-resize-ajygLhkjs3Y_1024x1024.jpg?v=1692989061',
    link: 'https://facebook.com/yourpage3',
  },
  {
    src: 'https://emaanbd.com/wp-content/uploads/2025/10/539529651_801477815562993_5279600447241961793_n.jpg',
    link: 'https://facebook.com/yourpage4',
  },
  {
    src: 'https://emaanbd.com/wp-content/uploads/2023/08/2460bc70-36b5-4107-985c-53bc3857626d.jpg',
    link: 'https://facebook.com/yourpage5',
  },
];

export default function ShopFacebook() {
  return (
    <div className='max-w-7xl mx-auto mt-24 rounded-2xl px-6 lg:px-0'>
      {/* Section Header */}
      <div className='text-center mb-12'>
        <h2 className='mt-4 text-3xl md:text-4xl font-bold text-heading'>
          Explore Faith Journey Facebook
        </h2>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-12 gap-6'>
        {images.map((image, index) => {
          const colSpanClass =
            index < 3
              ? 'col-span-12 md:col-span-4'
              : 'col-span-12 md:col-span-6';
          const aspectRatio = index < 3 ? 'aspect-[4/3]' : 'aspect-[4/1.8]';

          return (
            <div key={index} className={colSpanClass}>
              <a
                href='https://www.facebook.com/Hijabicrown'
                target='_blank'
                rel='noopener noreferrer'
                className='group relative rounded-sm overflow-hidden bg-white transition duration-1000 block'
              >
                {/* Image Section */}
                <div
                  className={cn(
                    'relative w-full overflow-hidden rounded-sm',
                    aspectRatio
                  )}
                >
                  <Image
                    src={image.src}
                    alt={`Shop image ${index + 1}`}
                    fill
                    className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
                  />

                  {/* Overlay Animation */}
                  <div className='absolute inset-0 z-10 pointer-events-none'>
                    <div className='absolute inset-0 bg-secondary/70 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-1000 ease-in-out' />
                    <div className='absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 delay-100 ease-in-out' />
                  </div>

                  {/* Hover Button with Text */}
                  <div className='absolute inset-0 flex items-center justify-center z-40 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                    <div className='flex items-center gap-2 bg-primary text-foreground px-4 py-2 rounded-full shadow-md'>
                      <ArrowUpRight size={18} />
                      <span className='text-sm font-medium'>
                        Visit Facebook Page
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
