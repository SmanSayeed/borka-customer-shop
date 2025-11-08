'use client';

import ScrollStack, { ScrollStackItem } from '@/components/shared/ScrollStack';
import { categoryLinks } from '@/constants/category';
import Image from 'next/image';

export function Testimonial() {
  const slideData = categoryLinks.map((category, index) => ({
    title: category.name,
    button: `Explore ${category.name}`,
    src: `/images/review-${(index % 7) + 1}.jpg`,
  }));

  return (
    <div className='w-full py-16 px-4 sm:px-8 lg:px-16'>
      <h2 className='text-3xl sm:text-4xl font-semibold mb-10 text-center'>
        Top Customer Reviews
      </h2>

      <ScrollStack className='border border-rose-400'>
        {slideData.map((slide, index) => (
          <ScrollStackItem key={index}>
            <div className='flex flex-col items-center justify-center p-6 bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'>
              <div className='relative w-full h-full rounded-xl overflow-hidden mb-4'>
                <Image
                  src={slide.src}
                  alt={slide.title}
                  height={800}
                  width={800}
                  className='object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
              <h3 className='text-lg sm:text-xl font-medium mb-2 text-center'>
                {slide.title}
              </h3>
              <button className='mt-2 text-primary hover:underline text-sm sm:text-base'>
                {slide.button}
              </button>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}
