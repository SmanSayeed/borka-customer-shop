'use client';

import ProductCard from './ProductCard';
import { IProduct } from '@/types';
import useProducts from '@/hooks/useProducts';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const TrendingSpecial = () => {
  const { products, isProductLoading } = useProducts();

  return (
    <div className='container mx-auto mt-24 px-6 lg:px-0'>
      <h2 className='text-5xl font-bold mb-10 text-center'>
        Trending Products
      </h2>

      {isProductLoading ? (
        <>Loading...</>
      ) : products.length === 0 ? (
        <p className='text-gray-500 text-center'>
          No festive special items available.
        </p>
      ) : (
        <Carousel className='w-full'>
          <CarouselContent className='-ml-4'>
            {products.map((product: IProduct) => (
              <CarouselItem
                key={product.id}
                className='pl-8 md:basis-1/2 lg:basis-1/3'
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default TrendingSpecial;
