"use client";

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
    <div className="w-full mt-24">
      <h2 className="text-4xl font-semibold mb-10 text-center">
        Top Customer Reviews
      </h2>

      <Carousel
        opts={{ align: "start", loop: true }}
        className="relative w-full max-w-7xl mx-auto"
      >
        <CarouselContent>
          {reviewImages.map((image, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/3"
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={image}
                  alt="Review"
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
