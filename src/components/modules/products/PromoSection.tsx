'use client';

import CountdownTimer from '@/components/shared/CountDownTimer';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  image: string;
  alt: string;
}

const ProductCard = ({ image, alt }: ProductCardProps) => {
  return (
    <div className='group relative overflow-hidden rounded-2xl bg-secondary h-full'>
      <div className='aspect-[3/5]'>
        <img
          src={image}
          alt={alt}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)]'>
        <Button
          variant='secondary'
          className='w-full bg-white hover:bg-white/90 text-foreground shadow-lg rounded-full py-6 font-medium'
        >
          <ShoppingBag className='w-5 h-5 mr-2' />
          View Products
        </Button>
      </div>
    </div>
  );
};

const SaleBanner = () => {
  // Set target date to 3 days, 13 hours, 8 minutes from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 13);
  targetDate.setMinutes(targetDate.getMinutes() + 8);

  return (
    <div className='relative overflow-hidden rounded-2xl h-full'>
      {/* Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#957739] to-[#dfd8a9]' />

      {/* Content */}
      <div className='relative h-full flex flex-col items-center justify-center p-8 md:p-12 text-center'>
        <p className='text-white/90 text-sm md:text-base uppercase tracking-wider mb-4'>
          Don't miss out...
        </p>

        <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4'>
          Today's Big Deals
        </h2>

        <p className='text-white/95 text-base md:text-lg mb-8'>
          Sale up to 75% all items. Hurry Up!
        </p>

        <div className='mb-10 px-10'>
          <CountdownTimer targetDate={targetDate} />
        </div>

        <Button
          size='lg'
          className='bg-white hover:bg-white/90 text-foreground rounded-full px-12 py-6 text-base font-medium shadow-xl transition-all hover:scale-105'
        >
          Shop Sale
        </Button>
      </div>
    </div>
  );
};

const PromoSection = () => {
  return (
    <section className='w-full max-w-7xl mx-auto mt-24 flex items-center justify-center p-4 md:p-8 bg-background'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          {/* Left Product Card */}
          <div className='h-[500px] md:h-[600px]'>
            <ProductCard
              image={'/images/product-5.jpg'}
              alt='Navy blue athletic t-shirt with white trim'
            />
          </div>

          {/* Center Sale Banner */}
          <div className='h-[500px] md:h-[600px]'>
            <SaleBanner />
          </div>

          {/* Right Product Card */}
          <div className='h-[500px] md:h-[600px]'>
            <ProductCard
              image={'/images/product-7.jpg'}
              alt='Navy blue sleeveless athletic top'
            />
          </div>
        </div>
    </section>
  );
};

export default PromoSection;
