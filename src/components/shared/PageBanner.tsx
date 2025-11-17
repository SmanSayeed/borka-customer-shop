'use client';

import { images } from '@/constants';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import CustomBreadcrumb from './CustomBreadcrumb';

const PageBanner = ({ text }: { text: string }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: 'performance',
      slides: {
        perView: 7,
        spacing: 0,
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  return (
    <div className='relative h-[100px] md:h-[180px] lg:h-60 w-full overflow-hidden'>
      {/* Slider */}
      <div ref={sliderRef} className='keen-slider h-full'>
        {images.map((src, index) => (
          <div
            className='keen-slider__slide relative h-full w-full'
            key={index}
          >
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width={400}
              height={450}
              className='object-cover'
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className='absolute inset-0 bg-linear-to-t from-secondary/70 to-transparent z-10' />
      <div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] z-20'>
        <div className='max-w-7xl mx-auto text-white'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4'>
            {text}
          </h1>

          <CustomBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
            ]}
            separator={<ChevronsRight size={16} />}
            className='text-sm sm:text-base'
          />
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
