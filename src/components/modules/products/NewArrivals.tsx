'use client';

import Loader from '@/components/shared/Loader';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';

const NewArrivals = () => {
  const { products, isProductLoading } = useProducts();

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      <div className='grid grid-cols-1 lg:grid-cols-12 items-start gap-5'>
        {/* Left section */}
        <div className='col-span-9 space-y-6'>
          <h2 className='text-4xl font-semibold mb-4'>New Arrivals</h2>
          <p className='text-foreground/80'>
            Discover the newest pieces in our collection and embrace timeless
            fashion.
          </p>

          {isProductLoading ? (
            <Loader skeleton skeletonCount={6} />
          ) : products.length === 0 ? (
            <p className='text-gray-500'>No new arrivals available.</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className='py-2'
            >
              {products.map((product: IProduct) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <button className='underline font-semibold text-foreground hover:underline-offset-3 hover:text-primary transition-colors'>
            Discover New Arrival
          </button>
        </div>

        {/* Right image */}
        <div className='col-span-3 hidden lg:block'>
          <motion.div
            className='relative w-full h-full overflow-hidden group'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src='/images/arrival.png'
              alt='new arrival'
              width={500}
              height={900}
              className='object-cover transition-transform duration-800 ease-in-out group-hover:scale-110'
              priority
            />

            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
              <div className='w-84 h-146 border-6 border-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-0'></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
