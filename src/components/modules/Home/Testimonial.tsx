'use client';

import Carousel from '@/components/ui/carousel';
export function Testimonial() {
  const slideData = [
    {
      title: 'Mystic Mountains',
      button: 'Explore Component',
      src: '/images/review-1.jpg',
    },
    {
      title: 'Urban Dreams',
      button: 'Explore Component',
      src: '/images/review-2.jpg',
    },
    {
      title: 'Neon Nights',
      button: 'Explore Component',
      src: '/images/review-3.jpg',
    },
    {
      title: 'Desert Whispers',
      button: 'Explore Component',
      src: '/images/review-4.jpg',
    },
    {
      title: 'Desert Whispers',
      button: 'Explore Component',
      src: '/images/review-5.jpg',
    },
    {
      title: 'Desert Whispers',
      button: 'Explore Component',
      src: '/images/review-6.jpg',
    },
    {
      title: 'Desert Whispers',
      button: 'Explore Component',
      src: '/images/review-7.jpg',
    },
  ];
  return (
    <div>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        Top Customer Reviews
      </h2>
      <div className='relative overflow-hidden w-full h-full py-20'>
        <Carousel slides={slideData} />
      </div>
    </div>
  );
}
