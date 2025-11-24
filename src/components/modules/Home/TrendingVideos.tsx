'use client';

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
    <Container>
      <div className='text-center mb-12'>
        <h2 className='md:text-5xl text-2xl font-bold mb-4'>
          Trending on <span className='text-primary'>Facebook</span>
        </h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Watch our latest fashion reels — unboxings, try-ons & new arrivals.
        </p>
      </div>

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

        <CarouselPrevious
  className="
    absolute top-1/2 -translate-y-1/2 left-2 z-50
    bg-black/60 text-white 
    md:static md:translate-y-0 md:bg-white md:text-black
  "
/>
<CarouselNext
  className="
    absolute top-1/2 -translate-y-1/2 right-2 z-50
    bg-black/60 text-white
    md:static md:translate-y-0 md:bg-white md:text-black
  "
/>
      </Carousel>
    </Container>
  );
}
