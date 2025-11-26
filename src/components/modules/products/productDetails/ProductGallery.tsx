'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, SearchCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setMainImage(images[newIndex]);
  };

  const handleThumbnailClick = (idx: number) => {
    setCurrentIndex(idx);
    setMainImage(images[idx]);
  };

  return (
    <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-6'>
      <div className='flex lg:flex-col gap-4 md:gap-6 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible'>
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`relative w-20 h-20 lg:w-24 lg:h-24 border cursor-pointer overflow-hidden ${
              mainImage === img
                ? 'border-primary ring-2 ring-primary/30'
                : 'border-gray-200'
            }`}
          >
            <Image src={img} alt='thumbnail' fill className='object-cover' />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className='relative w-full lg:w-[500px] order-1 lg:order-2 flex flex-col'>
        <div
          className='relative w-full aspect-3/4 overflow-hidden'
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
        >
          <Image
            src={mainImage}
            alt={productName}
            fill
            className={`object-contain transition-transform duration-300 ${
              zoom ? 'scale-110 cursor-zoom-in' : ''
            }`}
          />

          {/* Zoom Button */}
          <div className='absolute bottom-4 left-4'>
            <Dialog>
              <DialogTrigger asChild>
                <button className='group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary font-medium text-neutral-200 transition-all duration-300 hover:w-30'>
                  <div className='inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100'>
                    Full View
                  </div>
                  <div className='absolute right-2'>
                    <SearchCheck />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className='max-w-6xl bg-black/95 shadow-none border-0'>
                <Carousel className='w-full'>
                  <CarouselContent>
                    {images.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <div className='w-full flex justify-center p-4 lg:p-0'>
                          <Image
                            src={img}
                            alt={productName}
                            width={900}
                            height={900}
                            className='rounded-lg object-contain'
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Navigation Buttons - Right Aligned */}
        <div className='absolute bottom-4 right-4  flex justify-end gap-2 mt-4'>
          <button
            onClick={prevImage}
            className='p-2 rounded-full bg-white/50  hover:bg-gray-300 transition'
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className='p-2 rounded-full bg-white/50 hover:bg-gray-300 transition'
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
