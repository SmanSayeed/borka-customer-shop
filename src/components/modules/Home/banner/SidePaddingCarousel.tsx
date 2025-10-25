// components/SidePaddingCarousel.tsx

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

interface SidePaddingCarouselProps<T> {
  items: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;
  perPage?: number;
  gap?: string | number;
  padding?:
    | string
    | number
    | { left?: string | number; right?: string | number };
  autoplay?: boolean;
  interval?: number;
}

export function SidePaddingCarousel<T>({
  items,
  renderSlide,
  perPage = 3,
  gap = '1rem',
  padding = { left: '12rem', right: '12rem' },
  autoplay = false,
  interval = 3000,
}: SidePaddingCarouselProps<T>) {
  return (
    <Splide
      options={{
        type: 'loop',
        perPage,
        gap,
        padding,
        autoplay,
        interval,
        arrows: true,
        pagination: false,
      }}
      aria-label='Side padding carousel'
    >
      {items.map((item, index) => (
        <SplideSlide key={index}>{renderSlide(item, index)}</SplideSlide>
      ))}
    </Splide>
  );
}
