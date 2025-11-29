'use client';

import { RigthArrow } from '@/components/shared/assets';
import { IHomeProduct } from '@/types/home';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomeBanner({
  slides,
  isLoading,
}: {
  slides: IHomeProduct[];
  isLoading?: boolean;
}) {
  const [current, setCurrent] = useState(0);

  // Helper function to get image URL from slide content
  const getImageUrl = (slide: IHomeProduct): string => {
    if (!slide.content) return '';

    // If content is an array, get the first item
    if (Array.isArray(slide.content) && slide.content.length > 0) {
      return slide.content[0]?.url || slide.content[0]?.path || '';
    }

    // If content is an object
    if (typeof slide.content === 'object') {
      return slide.content.url || slide.content.path || '';
    }

    return '';
  };

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Preload all images when slides are loaded
  useEffect(() => {
    if (slides.length === 0) return;

    slides.forEach((slide) => {
      const imageUrl = getImageUrl(slide);
      if (imageUrl) {
        const img = new window.Image();
        img.src = imageUrl;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className='w-full flex justify-center relative -mt-[150px] pt-0'>
        <div className='relative w-full h-[80vh] overflow-hidden'>
          <Skeleton className='w-full h-full bg-muted-foreground/20' />
        </div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className='w-full flex justify-center relative -mt-[150px] pt-0'>
      <div className='relative w-full h-[80vh] overflow-hidden'>
        {slides.map((slide, index) => {
          const imageUrl = getImageUrl(slide);
          if (!imageUrl) return null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 
                ${index === current ? 'opacity-100 z-[15]' : 'opacity-0 z-[10]'}`}
            >
              <Image
                src={imageUrl}
                alt={`banner image ${index + 1}`}
                fill
                priority={index === 0}
                className='object-cover'
                sizes='100vw'
                onError={(e) => {
                  console.error('Failed to load banner image:', imageUrl);
                }}
              />

              <div className='absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent' />

              <div className='absolute inset-0 flex flex-col items-center justify-end pb-20 text-center text-white px-4 sm:px-6 pointer-events-none'>
                <Link
                  prefetch={true}
                  href='/products'
                  className='pointer-events-auto'
                >
                  <button className='group relative inline-flex h-8 md:h-10 items-center justify-center overflow-hidden rounded-md bg-black/50 hover:bg-black/70 hover:text-primary px-5 md:px-6 md:font-medium text-neutral-200'>
                    <span>Browse Collection</span>
                    <div className='w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100'>
                      <RigthArrow className='text-primary' />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className='absolute top-1/2 -translate-y-1/2 left-7 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition flex items-center gap-1 text-xs sm:text-sm backdrop-blur-md z-[20]'
        >
          <ChevronLeft size={18} />
          <span className='hidden md:block'>Prev</span>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className='absolute top-1/2 -translate-y-1/2 right-7 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition flex items-center gap-1 text-xs sm:text-sm backdrop-blur-md z-[20]'
        >
          <span className='hidden md:block'>Next</span>
          <ChevronRight size={18} />
        </button>

        {/* Indicators */}
        <div className='absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-[20]'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-all 
                ${current === index
                  ? 'bg-white/60 w-10 sm:w-12'
                  : 'bg-white/10 w-3 sm:w-6'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
