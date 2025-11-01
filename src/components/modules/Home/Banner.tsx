'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HomeBanner = () => {
  return (
    <section
      className='
        w-full 
        relative 
        overflow-hidden 
        py-12 md:py-20 
        bg-gradient-to-br 
        from-primary/20 via-blue-50 to-primary/30
      '
    >
      {/* Animated subtle background pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,116,144,0.15),transparent_60%)] pointer-events-none' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none' />

      {/* Main container */}
      <div className='relative container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 z-10'>
        {/* ------- Left Side: Content ------- */}
        <div
          className='
            flex flex-col 
            items-center lg:items-start 
            text-center lg:text-left 
            w-full lg:w-1/2 
            space-y-4
          '
        >
          <h3 className='bg-white/10 backdrop-blur-sm text-primary text-2xl font-medium py-1 px-3 border-2 border-white/30 rounded'>
            Faith in Every Fold
          </h3>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-2xl md:text-4xl lg:text-6xl font-bold leading-snug md:leading-tight text-foreground'
          >
            Embrace the Beauty of Modesty
            <span className='text-primary'> Begin Your Faith Journey</span> in
            Elegance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className='text-sm md:text-lg text-foreground/80 max-w-lg'
          >
            Discover the elegance of modest fashion — where every piece reflects
            faith, grace, and timeless beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.9 }}
          >
            <Link href='/category'>
              <Button className='bg-primary rounded-full text-white font-medium hover:bg-secondary hover:shadow-lg transition'>
                Discover All Collection
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <div className='relative w-full lg:w-1/2 flex justify-center hidden md:flex'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className='w-full max-w-md sm:max-w-lg lg:max-w-xl'
          >
            <Image
              src='/banner.png'
              alt='home banner'
              width={900}
              height={600}
              priority
              className='w-full h-auto object-contain drop-shadow-2xl'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
