'use client';

import Container from '@/components/shared/Container';
import Loader from '@/components/shared/Loader';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import useProducts from '@/hooks/useProducts';
import { IProduct } from '@/types';
import ProductCard from '../ProductCard';
import CarouselIcon from '@/components/shared/CarouselIcon';

interface RelatedProductsProps {
  categoryId?: number;
}

export default function RelatedProducts({ categoryId }: RelatedProductsProps) {
  const { products, isProductLoading } = useProducts();

  const filteredProducts = categoryId
    ? products.filter((p: IProduct) => p.category_id === categoryId)
    : products;

  const displayProducts = Array.from(
    { length: 8 },
    (_, i) => filteredProducts[i % filteredProducts.length]
  );

  return (
    <section className='mt-12 md:mt-24 md:container mx-auto'>
        <h2 className='text-2xl md:text-5xl font-bold text-center mb-4 md:mb-8'>Related Products</h2>

      {isProductLoading ? (
        <Loader skeleton skeletonCount={8} />
      ) : (
        <Carousel className='w-full mx-auto'>
          <CarouselContent>
            {displayProducts.map((product: IProduct, index: number) => (
              <CarouselItem
                key={index}
                className='basis-1/2 sm:basis-1/2 lg:basis-1/5'
              >
                <ProductCard product={product} isRelated={true} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselIcon />
        </Carousel>
      )}
    </section>
  );
}
