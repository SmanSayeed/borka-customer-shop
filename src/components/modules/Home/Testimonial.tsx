"use client";

import CarouselIcon from '@/components/shared/CarouselIcon';
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
    <section className='px-2 md:px-0 mt-12 md:mt-24 md:container mx-auto'>
      <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8 text-center">
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

        <CarouselIcon />
      </Carousel>
    </section>
  );
}
