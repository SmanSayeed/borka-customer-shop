'use client';

import Carousel from '@/components/ui/carousel';
import { categoryLinks } from '@/constants/category';
export function Testimonial() {
  const slideData = categoryLinks.map((category, index) => ({
    title: category.name,
    button: `Explore ${category.name}`,
    src: `/images/review-${(index % 7) + 1}.jpg`,
  }));
  return (
    <div>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        Top Customer Reviews
      </h2>
      <div className='relative overflow-hidden w-full h-full pb-20 px-6 lg:px-0'>
        <Carousel slides={slideData} />
      </div>
    </div>
  );
}
