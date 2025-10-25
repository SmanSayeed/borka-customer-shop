// pages/index.tsx
'use client'

import { SidePaddingCarousel } from './banner/SidePaddingCarousel';


const data = [
  { id: 1, title: 'Slide 1', img: '/banner-1.png' },
  { id: 2, title: 'Slide 2', img: '/banner-2.png' },
  { id: 1, title: 'Slide 3', img: '/banner-1.png' },
  { id: 2, title: 'Slide 4', img: '/banner-2.png' },
];

export default function HomeBanner() {
  return (
    <div>
      <SidePaddingCarousel
        items={data}
        renderSlide={(item) => (
          <div>
            <img
              src={item.img}
              alt={item.title}
              className='w-full h-auto object-cover'
            />
          </div>
        )}
        perPage={1}
        gap='1.5rem'
        padding={{ left: '12rem', right: '12rem' }}
        autoplay={true}
        interval={4000}
      />
    </div>
  );
}
