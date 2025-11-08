'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { ChevronsRight } from 'lucide-react';
import CustomBreadcrumb from './CustomBreadcrumb';

const images = [
  'https://plus.unsplash.com/premium_photo-1668714068992-2a146166b860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1lZGljaW5lfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1681995751324-462c07cf331d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fG1lZGljaW5lfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1609188076864-c35269136b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fG1lZGljaW5lfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1626870884221-5d1f44f61bbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxtZWRpY2luZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://images.unsplash.com/photo-1612363584451-cd060fb62018?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGRvY2N0b3J8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1682130171029-49261a5ba80a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGRvY2N0b3J8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1668714068992-2a146166b860?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1lZGljaW5lfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1681995751324-462c07cf331d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fG1lZGljaW5lfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
];

const PageBanner = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      renderMode: 'performance',
      slides: {
        perView: 7,
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
    <div className='relative h-[200px] sm:h-[300px] md:h-[200px] lg:h-[260px] overflow-hidden'>
      <div ref={sliderRef} className='keen-slider h-full'>
        {images.map((src, index) => (
          <div
            className='keen-slider__slide relative h-full w-full'
            key={index}
          >
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width={900}
              height={700}
              className='object-cover'
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-secondary to-transparent z-10' />

      <div className='absolute bottom-4 left-0 w-full z-20'>
        <div className='max-w-7xl mx-auto text-white pb-6'>
          <h1 className='text-5xl font-bold mb-5'>All Collections</h1>

          <CustomBreadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
            ]}
            separator={<ChevronsRight size={18} />}
          />
        </div>
      </div>
    </div>
  );
};

export default PageBanner;

