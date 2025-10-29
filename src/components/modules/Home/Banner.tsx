'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Banner placed below the Navbar by using a CSS variable --navbar-height
// If your navbar height is different update the CSS variable in your global styles or a parent layout.

const HomeBanner = () => {
  return (
    <section className='relative w-full'>
      {/* Image area: use object-contain so the actual image is fully visible (no cropping) */}
      <div className='w-full'>
        <Image
          src='/banner.png'
          alt='home banner'
          width={1906}
          height={675}
          priority
          className='w-full h-auto object-contain'
        />
      </div>

      <div className='absolute inset-0 pointer-events-none'>
        <div className='relative md:max-w-4xl z-10 px-6 md:py-22 pointer-events-auto'>
          <div className='md:ml-40 my-auto flex flex-col items-start text-foreground space-y-4'>
            <h3 className='md:mb-6 bg-white/10 backdrop-blur-sm md:text-3xl text-lg font-medium md:py-1'>
              Faith in Every Fold
            </h3>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='md:text-4xl lg:text-6xl font-bold leading-tight md:mb-6'
            >
              Embrace the Beauty of Modesty Begin Your Faith Journey in
              Elegance.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className='text-xs md:text-lg text-foreground/80 md:mb-6 max-w-lg'
            >
              Discover the elegance of modest fashion — where every piece
              reflects faith, grace, and timeless beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.9 }}
            >
              <Link href='/category'>
                <Button
                  className='bg-primary rounded-full text-foreground font-medium hover:bg-secondary hover:text-white'
                >
                  Discover All Collection
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
