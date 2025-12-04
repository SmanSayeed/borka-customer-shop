'use client';

import { RigthArrow } from '@/components/shared/assets';
import { Skeleton } from '@/components/ui/skeleton';
import { IHomeProduct } from '@/types/home';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomeBanner({
  slides,
  isLoading,
}: {
  slides: IHomeProduct[];
  isLoading?: boolean;
}) {
  const [current, setCurrent] = useState(0);

  const getImageUrl = (slide: IHomeProduct): string => {
    if (!slide.content) return '';

    if (Array.isArray(slide.content) && slide.content.length > 0) {
      return slide.content[0]?.url || slide.content[0]?.path || '';
    }

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

  // Preloading Images
  useEffect(() => {
    if (slides.length === 0) return;

    slides.forEach((slide) => {
      const imageUrl = getImageUrl(slide);
      if (imageUrl) {
        const img = new window.Image();
        img.src = imageUrl;
      }
    });
  }, [slides]);

  // Auto Slide
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => nextSlide(), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className='w-full flex justify-center'>
        <div className='relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden'>
          <Skeleton className='w-full h-full bg-muted-foreground/20' />
        </div>
      </div>
    );
  }

  if (!slides || slides.length === 0) return null;

  return (
    <div className='w-full flex justify-center'>
      <div className='relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden'>
        {slides.map((slide, index) => {
          const imageUrl = getImageUrl(slide);
          if (!imageUrl) return null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 
    ${index === current ? 'opacity-100 z-15' : 'opacity-0 z-10'}`}
            >
              <Image
                src={imageUrl}
                alt={`banner image ${index + 1}`}
                height={915}
                width={1980}
                priority={index === 0}
                className='object-cover w-full h-full'
                sizes='100vw'
              />

              {/* Gradient Overlay */}
              <div className='absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent' />

              {/* Banner Text Box */}
              <div className='absolute inset-0 flex flex-col items-center justify-end pb-14 md:pb-20 text-white pointer-events-none'>
                <Link
                  prefetch={true}
                  href='/products'
                  className='pointer-events-auto'
                >
                  <button className='group relative inline-flex h-10 sm:h-12 md:h-14 items-center justify-center overflow-hidden rounded-lg bg-linear-to-r from-[#e1b320]/20 via-[#e1b320]/30 to-[#e1b320]/20 border-2 border-[#e1b320]/60 hover:border-[#e1b320] px-8 sm:px-10 md:px-12 text-base sm:text-xl md:text-2xl font-bold text-[#e1b320] transition-all duration-300'>
                    <span className='relative z-10'>Browse Collection</span>
                    <div className='relative z-10 w-0 translate-x-full pl-0 opacity-0 transition-all duration-300 group-hover:w-8 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100'>
                      <RigthArrow className='text-[#e1b320]' />
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
          className='hidden lg:grid place-items-center size-12 top-1/2 -translate-y-1/2 left-7  bg-white/10 hover:bg-white/20 text-white rounded-full transition backdrop-blur-md z-20'
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className='hidden lg:grid place-items-center size-12 top-1/2 -translate-y-1/2 right-7  bg-white/10 hover:bg-white/20 text-white rounded-full transition backdrop-blur-md z-20'
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className='absolute bottom-6 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full h-1 transition-all
                ${
                  current === index
                    ? 'bg-white/80 w-10 sm:w-12 md:w-16'
                    : 'bg-white/20 w-4 sm:w-6 md:w-8'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
