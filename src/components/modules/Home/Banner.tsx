'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import DotGrid from '@/components/shared/DotGrid';

const HomeBanner = () => {
  return (
    <section
      className='
        relative w-full overflow-hidden
        py-12 sm:py-16 md:py-20 lg:py-24
        bg-primary/5
      '
    >
      {/* === DotGrid as Background === */}
      <div
        className='
          absolute inset-0 -z-10 flex items-center justify-center
          overflow-hidden
        '
      >
        {/* Centered dot grid for all screens */}
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

      {/* === Subtle overlay gradients === */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,116,144,0.15),transparent_60%)] pointer-events-none -z-10' />

      {/* === Main container === */}
      <div className='relative container mx-auto px-4 sm:px-6 md:px-0 z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16'>
          {/* ------- Left Side: Content ------- */}
          <div className='col-span-12 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4'>
            {/* Tagline */}
            <h3 className='bg-white/10 backdrop-blur-sm text-primary text-lg sm:text-xl md:text-2xl font-medium py-1 px-3 border-2 border-white/30 rounded'>
              Faith in Every Fold
            </h3>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='
                text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl
                font-bold leading-snug md:leading-tight text-foreground
              '
            >
              Embrace the Beauty
              {/* br only for mobile */}
              <br />
              {' '}of Modesty{' '}
              <span className='text-primary'>
                Begin Your <br className='block sm:hidden' />
                Faith Journey
              </span>{' '}
              in Elegance.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className='
                text-sm sm:text-base md:text-lg text-foreground/80 
                max-w-xl md:max-w-2xl py-4
              '
            >
              Discover the elegance of modest fashion — where every piece
              reflects faith, grace, and timeless beauty.
            </motion.p>

            {/* CTA Button */}
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
          </div>

          {/* ------- Right Side: Image ------- */}
          <div className='col-span-12 lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className='
                w-3/4 sm:w-2/3 md:w-3/4 lg:w-full 
                max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl
              '
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
