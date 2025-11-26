'use client';

import CarouselIcon from '@/components/shared/CarouselIcon';
import Container from '@/components/shared/Container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { videos } from '@/constants';

export default function TrendingVideo() {
  return (
    <section className='px-2 md:px-0 mt-12 md:mt-24 md:container mx-auto'>
        <h2 className='md:text-5xl text-2xl font-bold mb-4 md:mb-8 text-center'>
          Trending on <span className='text-primary'>Facebook</span>
        </h2>

      <Carousel className="w-full">
        
        <CarouselContent>
          {videos.map((video) => (
            <CarouselItem
            key={video.id}
            className="basis-full md:basis-1/2 lg:basis-1/4 group"
            >
              <div className="relative border border-primary/20 overflow-hidden">

                <div className="absolute inset-0 z-10"></div>

                <div className="relative aspect-9/16 overflow-hidden">
                  <iframe
                    src={video.iframe}
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="yes"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    ></iframe>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselIcon />
      </Carousel>
    </section>
  );
}
