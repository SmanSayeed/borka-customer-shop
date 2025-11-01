'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types/product';

const TrendingSpecial = () => {
  const { products, productFetchLoading } = useProducts();

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      <h2 className='text-4xl font-semibold mb-10 text-center'>
        Trending Products
      </h2>

      {productFetchLoading ? (
        <>Loading</>
      ) : products.length === 0 ? (
        <p className='text-gray-500 text-center'>
          No festive special items available.
        </p>
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
        >
          {products.map((product: IProduct) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TrendingSpecial;
