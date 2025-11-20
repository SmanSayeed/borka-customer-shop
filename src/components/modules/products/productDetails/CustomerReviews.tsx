'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { reviewImages } from '@/constants';
import Image from 'next/image';

export default function CustomerReviews() {
  return (
    <section className='mt-24 px-10 '>
      <h2 className='text-3xl font-semibold text-center mb-8'>
        What Our Customers Say
      </h2>

      <Carousel className='w-full max-w-7xl mx-auto'>
        <CarouselContent className='-ml-2'>
          {reviewImages.map((src, idx) => (
            <CarouselItem key={idx} className='pl-2 md:basis-1/2 lg:basis-1/3'>
              <div className='p-2'>
                <div className='overflow-hidden'>
                  <div className='p-0'>
                    <Image
                      src={src}
                      alt={`Customer review ${idx + 1}`}
                      width={500}
                      height={500}
                      className='w-full h-110 object-cover rounded-lg'
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
