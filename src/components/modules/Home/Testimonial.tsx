"use client";

import Container from '@/components/shared/Container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { reviewImages } from '@/constants';

export function Testimonial() {
  return (
    <Container>
      <h2 className="text-2xl md:text-5xl font-semibold mb-6 text-center">
        Top Customer Reviews
      </h2>

      <Carousel
        opts={{ align: "start", loop: true }}
        className="relative w-full mx-auto"
      >
        <CarouselContent>
          {reviewImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/3"
            >
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt="Review"
                  className="w-full h-[420px] object-cover"
                />
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
