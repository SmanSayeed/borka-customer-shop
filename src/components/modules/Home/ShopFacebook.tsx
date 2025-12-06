import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '@/components/shared/Container';

const images = [
  '/images/shop-1.jpg',
  '/images/shop-2.jpg',
  '/images/shop-3.jpg',
  '/images/shop-4.jpg',
  '/images/shop-5.jpg',
];

const ShopFacebook = () => {
  return (
    <section className='px-2 md:px-0 mt-12 md:mt-24 md:container mx-auto'>
      <h2 className='text-2xl md:text-5xl font-bold text-center mb-4 md:mb-8'>
        Follow Us on{' '}
        <span className='text-primary'>Facebook</span>
      </h2>

      <div className='grid grid-cols-12 gap-2 md:gap-6'>
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
                className='group relative block overflow-hidden z-0'
              >
                <div
                  className={cn(
                    'relative w-full overflow-hidden',
                    aspectRatio
                  )}
                >
                  <Image
                    src={image}
                    alt={`Shop image ${index + 1}`}
                    width={756}
                    height={340}
                    className='object-cover w-full h-full transition-transform duration-700 group-hover:scale-110'
                  />

                  <div className='absolute inset-0 z-10 pointer-events-none'>
                    <div className='absolute inset-0 bg-linear-to-t from-black/40 via-primary/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out' />
                  </div>

                  <div className='absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                    <div className='flex items-center gap-2 bg-white/90 backdrop-blur-md text-foreground px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'>
                      <ArrowUpRight
                        size={18}
                        className='text-primary group-hover:rotate-45 transition-transform duration-300'
                      />
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
    </section>
  );
};

export default ShopFacebook;
