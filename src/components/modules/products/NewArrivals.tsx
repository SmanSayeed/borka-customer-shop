'use client';

import Loader from '@/components/shared/Loader';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';

const NewArrivals = () => {
  const { products, isProductLoading } = useProducts();

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      {/* Left section */}
      <div className='col-span-9 space-y-6'>
        <div className='text-center mb-10'>
          <h2 className='text-5xl font-bold mb-4'>New Arrivals</h2>
          <p className='text-foreground/80'>
            Discover the newest pieces in our collection and embrace timeless
            fashion.
          </p>
        </div>

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
    </div>
  );
};

export default NewArrivals;
