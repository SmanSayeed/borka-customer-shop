'use client';

import DotGrid from '@/components/shared/DotGrid';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HomeBanner = () => {
  return (
    <section className='relative w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 not-even:bg-primary/5'>
      <div className=' absolute inset-0 -z-10 flex items-center justify-center overflow-hidden '>
        <div className='w-[200%] sm:w-[150%] md:w-full h-full flex items-center justify-center'>
          <DotGrid
            dotSize={6}
            gap={10}
            baseColor='#fffdb8'
            activeColor='#f4cd2a'
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>

      {/* === Main container === */}
      <div className='relative container mx-auto px-4 sm:px-6 md:px-0 z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16'>
          <div className='flex flex-col items-center lg:items-start text-center lg:text-left space-y-4'>
            <h3 className='bg-white/10 backdrop-blur-sm text-primary text-lg sm:text-xl md:text-2xl font-medium py-1 px-3 border-2 border-white/30 rounded'>
              Faith in Every Fold
            </h3>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-snug md:leading-tight text-foreground'
            >
              Embrace the Beauty
              <br /> of Modesty{' '}
              <span className='text-primary'>
                Begin Your <br className='block sm:hidden' />
                Faith Journey
              </span>{' '}
              in Elegance.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className='text-sm sm:text-base md:text-lg text-foreground/80 max-w-xl md:max-w-2xl py-4'
            >
              Discover the elegance of modest fashion — where every piece
              reflects faith, grace, and timeless beauty.
            </motion.p>

            {/* CTA Button */}
            <div className='flex items-center justify-between gap-6'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.9 }}
              >
                <Link href='/products'>
                  <Button className='bg-primary rounded-full px-6 py-5 sm:px-8 text-white font-medium hover:bg-secondary hover:shadow-lg transition text-sm sm:text-base'>
                    Discover All Collection
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.9 }}
              >
                <Link href='/about'>
                  <Button className='bg-white rounded-full px-6 py-5 sm:px-8 text-primary font-medium hover:bg-secondary hover:shadow-lg transition text-sm sm:text-base border border-gray-100'>
                    About us
                  </Button>
                </Link>
              </motion.div>

              <button class='group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50'>
                <span class='z-10 pr-2'>Hover me</span>
                <div class='absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]'>
                  <div class='mr-3.5 flex items-center justify-center'>
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      class='h-5 w-5 text-neutral-50'
                    >
                      <path
                        d='M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z'
                        fill='currentColor'
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* ------- Right Side: Image ------- */}
          <div className='flex justify-center lg:justify-end mt-8 lg:mt-0'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className='w-3/4 sm:w-2/3 md:w-3/4 lg:w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl'
            >
              <Image
                src='/banner.png'
                alt='home banner'
                width={900}
                height={600}
                priority
                className='w-full h-auto object-contain drop-shadow-xl'
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
